"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import DoacaoCard from "@/components/DoacaoCard";

type MinhasDoacoes = {
  id: number;
  Descricao: string;
  Status: string;
  Doador: number;
  Categoria: string;
  Data_Cadastro: string;
};

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
  const [doacao, setDoacao] = useState<MinhasDoacoes[]>([]);
  const [doadorId, setDoadorId] = useState<string | null>(null);

  useEffect(() => {
    // Este código roda apenas no cliente
    const cookies = document.cookie.split("; ");
    const doadorCookie = cookies.find((c) => c.startsWith("doador="));
    const id = doadorCookie?.split("=")[1];

    if (!id) {
      console.warn("ID do doador não encontrado no cookie.");
      return;
    }

    setDoadorId(id);
  }, []);

  useEffect(() => {
    if (!doadorId) return;

    const fetchDoacoes = async () => {
      try {
        const res = await fetch(`/api/doacoes-doador/${doadorId}`);
        const data = await res.json();
        setDoacao(data);
      } catch (error) {
        console.error("Erro ao obter valores", error);
        setDoacao([]);
      }
    };

    fetchDoacoes();
  }, [doadorId]);

  return (
    <>
      <Navbar />

      <main className="wrapper py-10 px-4">
        {doacao.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma doação encontrada na base de dados!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doacao.map((doacao) => (
              <DoacaoCard
                key={doacao.id}
                id={String(doacao.id)}
                titulo={doacao.Descricao}
                categoria={doacao.Categoria.toUpperCase()}
                localizacao="SP"
                descricao={doacao.Status.toUpperCase()}
                imagem={getImagemPorCategoria(doacao.Categoria.toLowerCase())}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
