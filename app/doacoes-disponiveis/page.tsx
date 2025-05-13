'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DoacaoCard from '@/components/DoacaoCard';
import ContentFind from '@/components/ContentFind';
import Image from 'next/image';

export default function DoacoesDisponiveis() {
  return (
    <>
      <Navbar />
      <ContentFind />
      <main className="wrapper py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <DoacaoCard
                key={index}
                id={`1`}
                titulo="Projeto Família Solidária"
                categoria="Projetos Sociais"
                localizacao="São Paulo"
                descricao="Apoie famílias em situação de vulnerabilidade, fornecendo alimentos, roupas e materiais escolares. Através de doações e parcerias, buscamos mais dignidade e melhores condições de vida para quem mais precisa."
                imagem="/familia-doar.jpg"
            />
            ))}

        </div>
      </main>
      <Footer />
    </>
  );
}
