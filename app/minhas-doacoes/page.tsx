'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import DoacaoCard from "@/components/DoacaoCard";
import nookies from 'nookies';
import styles from '@/components/ContentFind.module.css'

interface MinhasDoacoes {
  id: number;
  Descricao: string;
  Status: string;
  Doador: number;
  Categoria: string;
  Data_Cadastro: string;
}

export default function MinhasDoacoes() {

  const [isChecked, setIsChecked] = useState(false);

  const mudouCheckagem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const [doacao, setDoacao] = useState<MinhasDoacoes[]>([])

  const cookies = document.cookie.split("; ");
  const doadorCookie = cookies.find(c => c.startsWith("doador="));
  let doadorId = doadorCookie?.split("=")[1];

  if (!doadorId) {
    console.warn("ID do doador não encontrado no cookie.");
    doadorId = "2";
  }

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const res = await fetch(`api/doacoes-doador/${doadorId}`)
        setDoacao(await res.json())
      } catch (error) {
        console.error("Erro ao obter valores", error)
        setDoacao([])
      }
    }
    fetchDoacoes()
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.contentFind}>
        <label className="absolute pl-110">
          <input className="cursor-pointer"
            type="checkbox"
            checked={isChecked}
            onChange={mudouCheckagem}
          /> Apenas em Análise</label>
      </div>
      <main className="wrapper py-10 px-4">
        {doacao.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma doação encontrada na base de dados!
          </div>) :
          (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {doacao
                .filter(d => !isChecked || d.Status === "Em Analise")
                .map((doacao) => (                  
                  <DoacaoCard
                    key={doacao.id}
                    id={String(doacao.id)}
                    titulo={doacao.Descricao}
                    categoria={doacao.Categoria.toUpperCase()}
                    localizacao="SP"
                    descricao={doacao.Status.toUpperCase()}
                    imagem=""
                  />
                ))}
            </div>
          )}
      </main>
      <Footer />
    </>
  )
}