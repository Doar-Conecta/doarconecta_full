'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function QuemSomos() {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-12 text-gray-800 wrapper">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Quem é a DOAR CONECTA?
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Texto da esquerda */}
          <div className="flex-1 space-y-6 text-justify text-sm md:text-base">
            <p>
              A Doar Conecta nasceu de um propósito simples, mas poderoso: conectar generosidade e necessidade. A ideia surgiu quando um grupo de desenvolvedores, envolvidos em projetos sociais e tecnologia, percebeu um grande desafio enfrentado por doadores e instituições de caridade: a dificuldade de encontrar quem realmente precisa de ajuda.
            </p>
            <p>
              Tudo começou quando um dos fundadores, ao tentar doar móveis e roupas em bom estado, percebeu que não havia uma plataforma eficiente que facilitasse esse processo. Muitas pessoas queriam doar, mas não sabiam como ou para quem, enquanto ONGs e famílias em situação de vulnerabilidade enfrentavam dificuldades para receber esses recursos.
            </p>
            <p>
              Motivados por essa lacuna, a equipe decidiu criar um ambiente digital acessível, intuitivo e seguro, onde qualquer pessoa ou instituição pudesse se cadastrar para doar ou receber doações. Após meses de planejamento e desenvolvimento, nasceu a Doar Conecta, um portal que vai além de uma simples plataforma de doações — um espaço onde a solidariedade se transforma em ação.
            </p>
          </div>

          {/* Imagem da direita */}
          <div className="flex-shrink-0 w-full md:w-[500px]">
            <Image
              src="/familia-doar.jpg" // Certifique-se de colocar essa imagem em /public
              alt="Família beneficiada"
              width={500}
              height={400}
              className="rounded-md shadow-md w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-8 space-y-6 text-justify text-sm md:text-base">
          <p>
            Desde seu lançamento, a Doar Conecta tem impactado inúmeras vidas, facilitando o repasse de bens materiais, como roupas, alimentos, móveis e eletrônicos, além de permitir campanhas de arrecadação para causas específicas. A tecnologia foi aplicada para garantir que doadores encontrem rapidamente quem precisa, utilizando filtros por localização, tipo de item e disponibilidade.
          </p>
          <p>
            O sucesso do projeto não demorou a crescer, e parcerias com ONGs, empresas e voluntários começaram a fortalecer ainda mais a iniciativa. Cada doação realizada pelo portal representa uma história de transformação, reforçando o compromisso da Doar Conecta em tornar o mundo um lugar mais solidário e conectado.
          </p>
          <p>
            Hoje, a plataforma continua evoluindo, sempre buscando novas formas de facilitar e incentivar o ato de doar. Com inovação e empatia, a Doar Conecta segue firme no seu propósito de aproximar quem pode ajudar de quem mais precisa, tornando a solidariedade um hábito acessível a todos.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
