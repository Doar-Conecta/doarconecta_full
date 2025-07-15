"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import ImagemCategoria from "@/lib/catalogoImagemCategoria";


interface Doacao {
  id: number;
  Descricao: string;
  Status: string;
  Doador: number;
  Categoria: string;
  Data_Cadastro: string;
}

async function enviarPendencia(id: number) {
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
    console.error("Erro ao enviar pendência:", error);
  }
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
        setDoacao(Array.isArray(data) ? data[0] : data ?? undefined);
      } catch (error) {
        console.error("Erro ao carregar doações:", error);
      }
    };

    if (id) fetchDoacoes();
  }, [id]);

  if (!doacao)
    return (
      <p className="text-center mt-10">Carregando ou doação não encontrada.</p>
    );

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Detalhes da Doação
        </h1>
        <div className="text-sm text-gray-500 mb-2 flex justify-center">
          DoarConecta • SP
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <Image
            src={ImagemCategoria(doacao.Categoria.toLowerCase())}
            alt={`Imagem da categoria ${doacao.Categoria}`}
            width={800}
            height={400}
            className="rounded-md object-cover w-full mb-4"
          />

          <div className="text-lg text-gray-800 mb-4">
            <div className="flex items-center gap-2">
              <strong className="bg-green-600 text-white px-2 rounded-md font-bold">
                Categoria:
              </strong>
              <strong className="pl-2 border border-yellow-400 text-yellow-900 px-2 rounded-md bg-yellow-100 font-medium shadow-sm">
                {doacao.Categoria.toUpperCase()}
              </strong>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <strong className="bg-green-600 text-white px-2 rounded-md font-bold">
                Descrição:
              </strong>
              <strong className="pl-2 border border-yellow-400 text-yellow-900 px-2 rounded-md bg-yellow-100 font-medium shadow-sm">
                {doacao.Descricao}
              </strong>
            </div>

            <div className="flex items-center pt-2 gap-2">
              <strong className="bg-green-600 text-white px-2 rounded-md font-bold">
                Status:
              </strong>
              <strong
                className={`pl-2 border px-2 rounded-md font-medium shadow-sm 
                ${doacao.Status === "disponivel" || doacao.Status === "Concluido"
                    ? "border-green-400 text-green-900 bg-green-100"
                    : "border-red-400 text-red-900 bg-red-100"}`}
              >
                {doacao.Status.toLocaleUpperCase()}
              </strong>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <strong className="bg-green-600 text-white px-2 rounded-md font-bold">
                Data de Cadastro:
              </strong>
              <strong className="pl-2 border border-yellow-400 text-yellow-900 px-2 rounded-md bg-yellow-100 font-medium shadow-sm">
                {new Date(doacao.Data_Cadastro).toLocaleDateString()}
              </strong>
            </div>
          </div>
          <div className="flex justify-center">
            {doacao.Status === 'disponivel' && (
              <button
                className="cursor-pointer px-6 py-3 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-md shadow-md transition duration-200"
                onClick={() => enviarPendencia(doacao.id)}
              >
                Aceitar Doação
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
