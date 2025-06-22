// app/doacoes-disponiveis/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoacaoCard from "@/components/DoacaoCard";
import ContentFind from "@/components/ContentFind";

interface Produto {
  id: string;
  titulo: string;
  categoria: string;
  localizacao: string;
  descricao: string;
  imagem: string;
}

const produtos: Produto[] = [
  {
    id: "cama-mesa-banho-pa",
    titulo: "Cama, Mesa e Banho",
    categoria: "Têxteis",
    localizacao: "PA",
    descricao: "Conjuntos de lençóis, toalhas e cobertores.",
    imagem: "/produtos/cama-mesa-banho.jpg",
  },
  {
    id: "familia-doar-sp",
    titulo: "Jogo de Cama, Mesa e Banho",
    categoria: "Higiene",
    localizacao: "SP",
    descricao: "Jogo de cama,mesa e banho disponível para doação.",
    imagem: "/produtos/cama-mesa-banho.jpg",
  },
  {
    id: "cama-simples-rj",
    titulo: "Cama Simples",
    categoria: "Têxteis",
    localizacao: "RJ",
    descricao: "Lençóis e fronhas de solteiro.",
    imagem: "/produtos/cama.jpg",
  },
  {
    id: "eletro-cozinha-ba",
    titulo: "Kit Eletro Cozinha",
    categoria: "Eletrodomésticos",
    localizacao: "BA",
    descricao: "Liquidificador, batedeira e mixer.",
    imagem: "/produtos/eletrodomesticos-cozinha.jpg",
  },
  {
    id: "eletro-geral-sc",
    titulo: "Eletrodomésticos Gerais",
    categoria: "Eletrodomésticos",
    localizacao: "SC",
    descricao: "Ventilador, ferro de passar e secador.",
    imagem: "/produtos/eletrodomesticos.jpg",
  },
  {
    id: "banner-image-mg",
    titulo: "Banner Promocional",
    categoria: "Marketing",
    localizacao: "MG",
    descricao: "Geladeira disponível para doação.",
    imagem: "/produtos/eletrodomesticos.jpg",
  },
  {
    id: "familia-doar-sp-2",
    titulo: "Jogo de Lençóis",
    categoria: "Higiene",
    localizacao: "SP",
    descricao: "Cama disponível para doação.",
    imagem: "/produtos/cama.jpg",
  },
  {
    id: "cama-simples-mg",
    titulo: "Cama Simples",
    categoria: "Têxteis",
    localizacao: "MG",
    descricao: "Lençóis e fronhas de casal.",
    imagem: "/produtos/cama.jpg",
  },
];

export default function DoacoesDisponiveis() {
  return (
    <>
      <Navbar />
      <ContentFind />

      <main className="wrapper py-10 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produtos.map((prod) => (
            <Link
              key={prod.id}
              href="/doacoes-disponiveis/1"
              className="block hover:shadow-lg transition-shadow"
            >
              <DoacaoCard
                id={prod.id}
                titulo={prod.titulo}
                categoria={prod.categoria}
                localizacao={prod.localizacao}
                descricao={prod.descricao}
                imagem={prod.imagem}
              />
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
