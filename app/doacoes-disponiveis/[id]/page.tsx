'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Props {
  params: { id: string };
}

// Mock de dados simulando doações
const mockDoacoes = [
  {
    id: '1',
    titulo: 'Projeto Família Solidária',
    localizacao: 'São Paulo',
    descricao:
      'Nosso projeto solidário tem a missão de apoiar famílias em situação de vulnerabilidade, proporcionando acesso a alimentos, roupas e materiais essenciais para um recomeço digno. [...]',
    imagem: '/familia-doar.jpg',
    necessidades: [
      { item: 'Roupas Masculinas', qtd: '800 Peças', status: '🟡' },
      { item: 'Roupas Femininas', qtd: '950 Peças', status: '🟡' },
      { item: 'Alimento não Perecível', qtd: '1.000 KG', status: '🟢' },
      { item: 'Produto de Higiene', qtd: '750 Peças', status: '🟢' },
      { item: 'Brinquedos para Bebê', qtd: '170 Peças', status: '🟠' },
    ],
  },
  // você pode adicionar outros objetos aqui com id '2', '3', etc.
];

export default function DoacaoPage({ params }: Props) {
  const doacao = mockDoacoes.find((d) => d.id === params.id);

  if (!doacao) return notFound();
  
  return (
    <div>
      <Navbar />
    <main className="p-6 max-w-6xl mx-auto">
      <div className="text-sm text-gray-500 mb-2">
        Projetos Sociais • {doacao.localizacao}
      </div>
    

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Imagem + Descrição */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <Image
            src={doacao.imagem}
            alt={doacao.titulo}
            width={600}
            height={400}
            className="rounded-md object-cover w-full h-[240px]"
          />
          <h2 className="mt-4 font-bold text-lg">Descrição</h2>
          <p className="text-gray-700 mt-2 text-sm leading-relaxed">{doacao.descricao}</p>
        </div>

        {/* Tabela + Status */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h2 className="font-bold text-lg">Necessidade?</h2>
          <table className="w-full mt-3 text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-center">Qtde.</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {doacao.necessidades.map((item, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{item.item}</td>
                  <td className="text-center">{item.qtd}</td>
                  <td className="text-center">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

         <div className="flex justify-center pt-2">            
            <button               
              className="mt-4 p-4 bg-gray-100 rounded-md text-center bg-green-600 shadow-md hover:bg-green-800 text-white cursor-pointer">Contribuir</button>
          </div>
        </div>
      </div>
    </main>
      <Footer />
    </div>
  );
}
