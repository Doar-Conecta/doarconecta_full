"use client";

import React, { useEffect, useState } from "react";
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { useParams } from "next/navigation";

interface Doacao {
  id: number;
  Descricao: string;
  Status: string;
  Doador: number;
  Categoria: string;
  Data_Cadastro: string;
}

export default function DoacaoDetalhes() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [doacao, setDoacao] = useState<Doacao | undefined>();

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const res = await fetch(`/api/doacoes-param/${id}`);
        const data = await res.json();

        console.log("Resposta da API:", data);
        
        setDoacao(Array.isArray(data) ? data[0] : data ?? undefined);
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
      }
    };

    if (id) fetchDoacoes();
  }, [id]);

  if (!doacao) return <p className="text-center mt-10">Carregando ou doação não encontrada.</p>;

  return (
    <>
      <Navbar />

      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Detalhes da Doação</h1>
        <p className="text-xl">ID da doação: {id}</p>
        <p className="mt-6 text-gray-700">
          Categoria: <strong>{doacao.Categoria}</strong><br />
          Descrição: <strong>{doacao.Descricao}</strong>
        </p>
      </main>

      <Footer />
    </>
  );
}
