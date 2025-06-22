import React, { useState, ChangeEvent, FormEvent } from 'react';

// Tipagem dos dados do formulário
type PerfilPJ = 'ONG' | 'Doador';
interface FormDataType {
  tipoUsuario: number;
  pjPerfil: PerfilPJ | '';
  nomeRazaoSocial: string;
  cpfCnpj: string;
  email: string;
  celular: string;
  cep: string;
  logradouro: string;
  numeroLogradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  senha: string;
  confirmacaoSenha: string;
}

// Resposta da API ViaCEP
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

const RegistroUsuario: React.FC = () => {
  // Classe base para inputs, selects e botões
  const baseFieldClass = `
    mt-1 block w-full rounded-md border-gray-300 shadow-sm
    focus:border-blue-500 focus:ring-blue-500 placeholder-gray-400
    text-sm py-2.5 px-3.5
  `;

  // Estado inicial
  const initialFormState: FormDataType = {
    tipoUsuario: 1,
    pjPerfil: '',
    nomeRazaoSocial: '',
    cpfCnpj: '',
    email: '',
    celular: '',
    cep: '',
    logradouro: '',
    numeroLogradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    senha: '',
    confirmacaoSenha: ''
  };

  const [formData, setFormData] = useState<FormDataType>(initialFormState);
  const [erro, setErro] = useState<string>('');
  const [sucesso, setSucesso] = useState<boolean>(false);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [cepInvalido, setCepInvalido] = useState<boolean>(false);

  // Handlers genéricos
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'cep' && cepInvalido) setCepInvalido(false);
    if (erro) setErro('');
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Formatação CPF/CNPJ
  const formatCpfCnpj = (value: string): string => {
    const numeric = value.replace(/\D/g, '');
    if (numeric.length <= 11) {
      return numeric
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return numeric
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
  };

  const handleCpfCnpjChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, '');
    if (onlyNums.length <= 14) {
      setFormData(prev => ({ ...prev, cpfCnpj: formatCpfCnpj(onlyNums) }));
    }
  };

  const handleCepChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/\D/g, '');
    if (onlyNums.length <= 8) {
      const formatted = onlyNums.replace(/^(\d{5})(\d)/, '$1-$2');
      setFormData(prev => ({ ...prev, cep: formatted }));
      if (cepInvalido) setCepInvalido(false);
    }
  };

  // Busca ViaCEP
  const buscarCep = async () => {
    const cepNum = formData.cep.replace(/\D/g, '');
    if (cepNum.length !== 8) {
      setErro('CEP deve conter 8 dígitos');
      setCepInvalido(true);
      return;
    }
    try {
      setCarregando(true);
      const res = await fetch(`https://viacep.com.br/ws/${cepNum}/json/`);
      if (!res.ok) throw new Error(`Erro ${res.status}`);
      const data: ViaCepResponse = await res.json();
      if (data.erro) {
        setErro('CEP não encontrado');
        setCepInvalido(true);
        return;
      }
      setFormData(prev => ({
        ...prev,
        logradouro: data.logradouro || prev.logradouro,
        bairro: data.bairro || prev.bairro,
        localidade: data.localidade || prev.localidade,
        uf: data.uf || prev.uf,
        complemento: data.complemento || prev.complemento
      }));
      setErro('');
    } catch {
      setErro('Erro ao buscar CEP. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  // Validações
  const validarFormulario = (): boolean => {
    if (formData.senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    if (formData.senha !== formData.confirmacaoSenha) {
      setErro('As senhas não coincidem');
      return false;
    }
    const obrigatorios = [
      'nomeRazaoSocial', 'cpfCnpj', 'email', 'celular',
      'cep', 'logradouro', 'numeroLogradouro', 'bairro',
      'localidade', 'uf', 'senha'
    ];
    for (const f of obrigatorios) {
      if (!formData[f as keyof FormDataType]) {
        setErro(`O campo ${f} é obrigatório`);
        return false;
      }
    }
    const cpfn = formData.cpfCnpj.replace(/\D/g, '');
    if (formData.tipoUsuario === 1 && cpfn.length !== 11) {
      setErro('CPF inválido'); return false;
    }
    if (formData.tipoUsuario === 2 && cpfn.length !== 14) {
      setErro('CNPJ inválido'); return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErro('Email inválido'); return false;
    }
    if (isNaN(Number(formData.numeroLogradouro))) {
      setErro('Número deve ser numérico'); return false;
    }
    return true;
  };

  // Submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setCarregando(true);
    try {
      const payload = {
        TipoUsuario: formData.tipoUsuario,
        PerfilPJ: formData.pjPerfil,
        NomeRazaoSocial: formData.nomeRazaoSocial,
        CPFCNPJ: formData.cpfCnpj.replace(/\D/g, ''),
        Email: formData.email,
        Celular: formData.celular,
        Cep: formData.cep.replace(/\D/g, ''),
        Logradouro: formData.logradouro,
        NumeroLogradouro: +formData.numeroLogradouro,
        Complemento: formData.complemento,
        Bairro: formData.bairro,
        Localidade: formData.localidade,
        UF: formData.uf,
        Senha: formData.senha
      };
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error((await res.json()).message || `Erro ${res.status}`);
      setSucesso(true);
      setFormData(initialFormState);
      setTimeout(() => window.location.href = '/', 500);
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  };

  // Estados
  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-blue-600 px-6 py-8 text-center">
          <h2 className="text-3xl font-extrabold text-white">Criar sua conta</h2>
          <p className="mt-2 text-sm text-blue-100">Insira seus dados para se registrar em nossa plataforma</p>
        </div>
        <div className="p-6 sm:p-8">
          {sucesso && (
            <div className="mb-6 rounded-md bg-green-50 p-4 animate-pulse"><p className="text-sm font-medium text-green-800">Registro realizado com sucesso! Redirecionando...</p></div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tipo de Usuário */}
            <div className="bg-gray-50 rounded-lg
            p-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Usuário*</label>
              <div className="flex space-x-4">
                <div className={`flex-1 flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.tipoUsuario === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setFormData(prev => ({ ...prev, tipoUsuario: 1, pjPerfil: '' }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="mt-2 block text-sm font-medium">Pessoa Física</span>
                </div>
                <div className={`flex-1 flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${formData.tipoUsuario === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`} onClick={() => setFormData(prev => ({ ...prev, tipoUsuario: 2 }))}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="mt-2 block text-sm font-medium">Pessoa Jurídica</span>
                </div>
              </div>
            </div>
            {/* Dados Pessoa/Empresa */}
            <fieldset className="border border-gray-200 rounded-md p-4">
              <legend className="text-sm font-medium text-gray-700 px-2">{formData.tipoUsuario === 1 ? 'Dados Pessoais' : 'Dados da Empresa'}</legend>
              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nomeRazaoSocial" className="block text-sm font-medium text-gray-700">{formData.tipoUsuario === 1 ? 'Nome Completo*' : 'Razão Social*'}</label>
                  <input type="text" name="nomeRazaoSocial" id="nomeRazaoSocial" value={formData.nomeRazaoSocial} onChange={handleChange} required className={baseFieldClass} placeholder={formData.tipoUsuario === 1 ? 'Ex: João da Silva' : 'Ex: Empresa LTDA'} />
                </div>
                <div>
                  <label htmlFor="cpfCnpj" className="block text-sm font-mediumtext-gray-700">{formData.tipoUsuario === 1 ? 'CPF*' : 'CNPJ*'}</label>
                  <input type="text" name="cpfCnpj" id="cpfCnpj" value={formData.cpfCnpj} onChange={handleCpfCnpjChange} required className={baseFieldClass} placeholder={formData.tipoUsuario === 1 ? '000.000.000-00' : '00.000.000/0000-00'} />
                </div>
                {formData.tipoUsuario === 2 && (
                  <div className="sm:col-start-2 sm:row-start-2 space-y-2">
                    <span className="block text-sm font-medium text-gray-700">Selecione a opção abaixo para definir o perfil da empresa:</span>
                    <div className="flex space-x-4">
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, pjPerfil: 'ONG' }))} className={`${baseFieldClass} ${formData.pjPerfil === 'ONG' ? 'border-blue-600 bg-blue-50' : 'border-gray-300hover:border-gray-400'}`}>ONG</button>
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, pjPerfil: 'Doador' }))} className={`${baseFieldClass} ${formData.pjPerfil === 'Doador' ? 'border-blue-600 bg-blue-50' : 'border-gray-300hover:border-gray-400'}`}>Doador</button>
                    </div>
                  </div>
                )}
                <div className="sm:col-start-1 sm:row-start-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email*
                    </label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className={baseFieldClass} placeholder="seu@email.com" />
                </div>
                <div className="sm:col-start-1 sm:row-start-3">
                  <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
                    Celular*
                  </label>
                  <input type="text" name="celular" id="celular" value={formData.celular} onChange={handleChange} required className={baseFieldClass} placeholder="(00) 00000-0000" />
                </div>
              </div>
            </fieldset>
            <fieldset className="border border-gray-200 rounded-md p-4">
              <legend className="text-sm font-medium text-gray-700 px-2">Endereço</legend>

              <div className="mb-4">
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700">CEP*</label>
                <div className="mt-1 flex space-x-2">
                  <input
                    type="text"
                    name="cep"
                    id="cep"
                    value={formData.cep}
                    onChange={handleCepChange}
                    placeholder="00000-000"
                    required
                    className={`${baseFieldClass} ${cepInvalido ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={buscarCep}
                    disabled={carregando || cepInvalido}
                    className={`${baseFieldClass} text-center ${carregando ? 'bg-gray-100 text-gray-500' : 'hover:bg-blue-50 text-blue-600'}`}
                  >
                    {carregando ? 'Buscando…' : 'Buscar'}
                  </button>
                </div>
                {cepInvalido && <p className="mt-1 text-sm text-red-600">CEP inválido ou não encontrado</p>}
              </div>

              <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="logradouro" className="block text-sm font-medium text-gray-700">Logradouro*</label>
                  <input
                    type="text"
                    name="logradouro"
                    id="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                    required
                    placeholder="Rua, Avenida, etc."
                    className={baseFieldClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="numeroLogradouro" className="block text-sm font-medium text-gray-700">Número*</label>
                  <input
                    type="text"
                    name="numeroLogradouro"
                    id="numeroLogradouro"
                    value={formData.numeroLogradouro}
                    onChange={handleChange}
                    required
                    placeholder="Nº"
                    className={baseFieldClass}
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="complemento" className="block text-sm font-medium text-gray-700">Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  id="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Apto, Bloco, etc."
                  className={baseFieldClass}
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="bairro" className="block text-sm font-medium text-gray-700">Bairro*</label>
                  <input
                    type="text"
                    name="bairro"
                    id="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                    required
                    placeholder="Seu bairro"
                    className={baseFieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="localidade" className="block text-sm font-medium text-gray-700">Cidade*</label>
                  <input
                    type="text"
                    name="localidade"
                    id="localidade"
                    value={formData.localidade}
                    onChange={handleChange}
                    required
                    placeholder="Sua cidade"
                    className={baseFieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="uf" className="block text-sm font-medium text-gray-700">Estado*</label>
                  <select
                    name="uf"
                    id="uf"
                    value={formData.uf}
                    onChange={handleChange}
                    required
                    className={baseFieldClass}
                  >
                    <option value="">Selecione o estado</option>
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Fieldset para agrupar senha */}
            <fieldset className="border border-gray-200 rounded-md p-4">
              <legend className="text-sm font-medium text-gray-700 px-2">Senha de acesso</legend>

              <div className="space-y-4">
                <div>
                  <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha*</label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      name="senha"
                      id="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      required
                      placeholder="Mínimo 6 caracteres"
                      className={`${baseFieldClass} pr-10`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmacaoSenha" className="block text-sm font-medium text-gray-700">Confirmar Senha*</label>
                  <div className="mt-1 relative">
                    <input
                      type="password"
                      name="confirmacaoSenha"
                      id="confirmacaoSenha"
                      value={formData.confirmacaoSenha}
                      onChange={handleChange}
                      required
                      placeholder="Confirme sua senha"
                      className={`${baseFieldClass} pr-10`}
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Exibição de erro */}
            {erro && (
              <div className="rounded-md bg-red-50 p-4 animate-bounce">
                <p className="text-sm text-red-700">{erro}</p>
              </div>
            )}

            {/* Termos e condições */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-3 text-sm font-medium text-gray-700">
                Li e aceito os{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">termos e condições</a>{' '}
                e a{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">política de privacidade</a>*
              </label>
            </div>

            {/* Botão de envio */}
            <button
              type="submit"
              disabled={carregando}
              className={`w-full py-3 text-white font-medium rounded-md shadow-sm transition ${carregando ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {carregando ? 'Processando...' : 'Criar conta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
