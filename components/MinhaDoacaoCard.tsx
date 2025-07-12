"use client";

import Image from "next/image";
import Link from "next/link";

interface DoacaoCardProps {
  id: string;
  titulo: string;
  categoria: string;
  localizacao: string;
  descricao: string;
  imagem: string;
}

export default function DoacaoCard({
  id,
  titulo,
  categoria,
  localizacao,
  descricao,
  imagem,
}: DoacaoCardProps) {
  return (
      <div className="rounded-xl shadow-md overflow-hidden max-w-xs bg-white hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="relative w-full h-48">
          <Image src={imagem} alt={titulo} fill className="object-cover" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-md">{titulo}</h3>
          <p className="text-sm text-gray-600">
            {categoria} • {localizacao}
          </p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-4">{descricao}</p>
          <div className="flex justify-end mt-3"></div>
        </div>
      </div>
  );
}
