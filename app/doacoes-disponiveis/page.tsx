"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoacaoCard from "@/components/DoacaoCard";
import ContentFind from "@/components/ContentFind";
import Breadcrumb from '@/components/Breadcrumb';

interface Doacao {
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
      return "/produtos/eletrodomesticos.jpg";

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

export default function DoacoesDisponiveis() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const res = await fetch("/api/doacoes");
        const data = await res.json();
        setDoacoes(data || []);
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
        setDoacoes([]);
      }
    };

    fetchDoacoes();
  }, []);

  return (
    <>
      <Navbar />
      {/* <ContentFind /> */}

      <div className="bg-gray-100 py-6">
        <div className="wrapper">
          <Breadcrumb
            items={[
              { label: 'Início', href: '/' },
              { label: 'Doações Disponíveis' }
            ]}
          />
          <h1 className="text-2xl font-bold">Doações Disponíveis</h1>
        </div>
      </div>

      <main className="wrapper py-10 px-4">
        {doacoes.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma doação encontrada na base de dados!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doacoes.map((doacao) => (
              <Link
                key={doacao.id}
                href={`/doacoes-disponiveis/${doacao.id}`}
                className="block hover:shadow-lg transition-shadow"
              >
                <DoacaoCard
                  id={String(doacao.id)}
                  titulo={doacao.Descricao}
                  categoria={doacao.Categoria.toUpperCase()}
                  localizacao="SP" // Mockado para SP feat futura
                  descricao={doacao.Status.toUpperCase()}
                  imagem={getImagemPorCategoria(
                    doacao.Categoria.toLocaleLowerCase()
                  )}
                />
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
