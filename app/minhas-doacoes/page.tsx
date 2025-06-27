'use client';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import DoacaoCard from "@/components/DoacaoCard";

interface MinhasDoacoes {
    id: number;
    Descricao: string;
    Status: string;
    Doador: number;
    Categoria: string;
    Data_Cadastro: string;
}

export default function MinhasDoacoes() {

    const [doacao, setDoacao] = useState<MinhasDoacoes[]>([])

    const cookies = document.cookie.split("; ");
    const doadorCookie = cookies.find(c => c.startsWith("doador="));
    const doadorId = doadorCookie?.split("=")[1];

    if (!doadorId) {
        console.warn("ID do doador não encontrado no cookie.");
        return;
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

        <main className="wrapper py-10 px-4">
        {doacao.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            Nenhuma doação encontrada na base de dados!
          </div>) : 
          (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {doacao.map((doacao) => (              
                <DoacaoCard
                  id={String(doacao.id)}
                  titulo={doacao.Descricao}
                  categoria={doacao.Categoria.toUpperCase()}
                  localizacao="SP" // Mockado para SP feat futura 
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