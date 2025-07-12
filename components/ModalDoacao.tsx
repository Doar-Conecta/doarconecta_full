'use client';

import React from 'react';

interface ModalDoacaoProps {
  doacao: {
    id: number;
    Descricao: string;
    Status: string;
    Categoria: string;
  };
  imagem: string;
  onClose: () => void;
}

export default function ModalDoacao({ doacao, imagem, onClose }: ModalDoacaoProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full relative">
        <button className="absolute top-2 right-3 text-gray-600" onClick={onClose}>X</button>
        <h2 className="text-xl font-bold mb-2">{doacao.Descricao}</h2>
        <img src={imagem} alt="Imagem doação" className="w-full h-48 object-cover rounded mb-4" />
        <p><strong>Status:</strong> {doacao.Status}</p>
        <p><strong>Categoria:</strong> {doacao.Categoria}</p>
        <div className="mt-4">
          <p className="mb-2">O item já foi doado?</p>
          <div className="flex gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded">Sim</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded">Não</button>
          </div>
        </div>
      </div>
    </div>
  );
}
