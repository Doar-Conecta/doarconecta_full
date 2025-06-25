import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Doacao {
  id: number;
  Descricao: string;
  Categoria: string;
  Status: string;
  imagem?: string;
}

interface Props {
  params: { id: string };
}

async function fetchDoacao(id: string): Promise<Doacao | null> {
  const res = await fetch(`http://localhost:3000/api/doacoes-param/${id}`, {    
    cache: 'no-store',
  });

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();
  return data;
}

export default async function DoacaoPage({ params }: Props) {
  const id = params.id;

  const doacao = await fetchDoacao(id);

  if (!doacao) {
    return notFound();
  }

  return (
    <div>
      <Navbar />
      <main className="p-6 max-w-6xl mx-auto">
        <div className="text-sm text-gray-500 mb-2">
           • SP
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Imagem + Descrição */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <Image
              src={doacao.imagem ?? "/produtos/doarConecta.png"}
              alt={doacao.Descricao}
              width={600}
              height={400}
              className="rounded-md object-cover w-full h-[240px]"
              priority
            />
            <h2 className="mt-4 font-bold text-lg">Descrição</h2>
            <p className="text-gray-700 mt-2 text-sm leading-relaxed">
              {doacao.Descricao}
            </p>
          </div>

          {/* Tabela + Status */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex justify-center pt-2">
              <button className="mt-4 p-4 bg-green-600 hover:bg-green-800 text-white rounded-md shadow-md">
                Contribuir
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
