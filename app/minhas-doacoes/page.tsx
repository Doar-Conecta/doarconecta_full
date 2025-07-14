'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import MinhaDoacaoCard from "@/components/MinhaDoacaoCard";
import styles from '@/components/ContentFind.module.css';
import Breadcrumb from '@/components/Breadcrumb';
import { useParams } from "next/navigation";

interface MinhasDoacoes {
  id: number;
  Descricao: string;
  Status: string;
  Doador: number;
  Categoria: string;
  Data_Cadastro: string;
}

function getImagemPorCategoria(categoria: string): string {
  switch (categoria.toLowerCase()) {
    case "eletronicos":
      return "/produtos/eletrodomesticos.jpg";
    case "moveis":
      return "/produtos/moveis.jpg";
    case "roupas":
      return "/produtos/cama-mesa-banho.jpg";
    case "alimentos":
      return "/produtos/banner.jpg";
    case "brinquedos":
      return "/produtos/brinquedos.jpg";
    case "livros":
      return "/produtos/livros.jpg";
    case "produtos de limpeza":
      return "/produtos/produtoLimpeza.png";
    default:
      return "/produtos/doarConecta.png";
  }
}

export default function MinhasDoacoes() {
  const [filtro, setFiltro] = useState<'todos' | 'disponiveis' | 'em_analise'>('todos');
  const [modalAberto, setModalAberto] = useState(false);
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [doacaoSelecionada, setDoacaoSelecionada] = useState<MinhasDoacoes | undefined>();
  const [imagemSelecionada, setImagemSelecionada] = useState<string>("");
  const [doacoes, setDoacoes] = useState<MinhasDoacoes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  let doadorId = 8;
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split("; ");
    const doadorCookie = cookies.find(c => c.startsWith("doador="));
    let doadorId = doadorCookie?.split("=")[1];
  }

  useEffect(() => {
    async function fetchDoacoes() {
      if (!doadorId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/doacoes-doador/${doadorId}`);
        if (!res.ok) throw new Error("Erro ao buscar doações");
        const data = await res.json();
        setDoacoes(data);
      } catch (error) {
        console.error("Erro ao obter doações:", error);
        setDoacoes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDoacoes();
  }, [doadorId]);

  const abrirModal = (doacao: MinhasDoacoes) => {
    setDoacaoSelecionada(doacao);
    setImagemSelecionada(getImagemPorCategoria(doacao.Categoria));
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setDoacaoSelecionada(undefined);
  };

  async function handleConfirmacaoSim(id: number) {
    if (doacaoSelecionada) {
      // Você pode adicionar chamada PATCH aqui para atualizar o backend, depois atualizar localmente
      atualizarStatus(id);

      const atualizadas = doacoes.map(d =>
        d.id === doacaoSelecionada.id
          ? { ...d, Status: "Concluido" }
          : d
      );
      setDoacoes(atualizadas);
    }
    fecharModal();
  };

  async function atualizarStatus(id: number) {
    try {
      const res = await fetch(`/api/doacoes-param/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      alert(data.message || "Status alterado!");
    } catch (error) {
      console.error("Erro ao atualizar o status da doação:", error);
    }
  }

  const doacoesFiltradas = doacoes.filter((d) => {
    if (filtro === 'todos') return true;
    if (filtro === 'disponiveis') return d.Status.toLowerCase() === 'disponivel';
    if (filtro === 'em_analise') return d.Status.toLowerCase() === 'em analise' || d.Status.toLowerCase() === 'em análise';
    return true;
  });

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 py-6">
        <div className="wrapper">
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Minhas Doações' }
            ]}
          />
          <h1 className="text-2xl font-bold">Minhas Doações</h1>
        </div>
      </div>

      <div className="wrapper py-4 flex gap-4">
        <button
          onClick={() => setFiltro('todos')}
          className={`px-4 py-2 rounded ${filtro === 'todos' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          Todos ({doacoes.length})
        </button>
        <button
          onClick={() => setFiltro('disponiveis')}
          className={`px-4 py-2 rounded ${filtro === 'disponiveis' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          Disponíveis ({doacoes.filter(d => d.Status.toLowerCase() === 'disponivel').length})
        </button>
        <button
          onClick={() => setFiltro('em_analise')}
          className={`px-4 py-2 rounded ${filtro === 'em_analise' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
        >
          Em Análise ({doacoes.filter(d => d.Status.toLowerCase() === 'em analise' || d.Status.toLowerCase() === 'em análise').length})
        </button>
      </div>

      <main className="wrapper py-10 px-4">
        {loading ? (
          <div className="text-center text-gray-500 text-lg">Carregando doações...</div>
        ) : doacoesFiltradas.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma doação encontrada para o filtro selecionado!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doacoesFiltradas.map((doacao) => (
              <div key={doacao.id} onClick={() => abrirModal(doacao)} className="cursor-pointer">
                <MinhaDoacaoCard
                  id={String(doacao.id)}
                  titulo={doacao.Descricao}
                  categoria={doacao.Categoria.toUpperCase()}
                  localizacao="SP"
                  descricao={doacao.Status.toUpperCase()}
                  imagem={getImagemPorCategoria(doacao.Categoria)}
                />
              </div>
            ))}
          </div>
        )}
      </main>

      {modalAberto && doacaoSelecionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg">
            <button
              onClick={fecharModal}
              className="absolute top-2 right-3 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-2">{doacaoSelecionada.Descricao}</h2>
            <img
              src={imagemSelecionada}
              alt="Imagem da doação"
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p><strong>Status:</strong> {doacaoSelecionada.Status}</p>
            <p><strong>Categoria:</strong> {doacaoSelecionada.Categoria}</p>
            <div className="mt-4 flex justify-center items-center flex-col">
              {doacaoSelecionada.Status === "Concluido" ? (
                <p className="text-green-600 font-semibold border border-green-300 bg-green-50 px-4 py-2 rounded">
                  A doação foi concluída!
                </p>
              ) : (
                <>
                  <p className="mb-2 font-medium">O item já foi doado?</p>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleConfirmacaoSim(doacaoSelecionada.id)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Sim
                    </button>
                    <button
                      onClick={fecharModal}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Não
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
