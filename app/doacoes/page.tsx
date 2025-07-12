'use client'

import FormularioItem from '../../components/doacoesCadastroForm';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from '@/components/Breadcrumb';

const FormularioItemPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 py-6">
              <div className="wrapper">
                <Breadcrumb
                  items={[
                    { label: 'Início', href: '/' },
                    { label: 'Nova Doação' }
                  ]}
                />
                <h1 className="text-2xl font-bold">Nova Doação</h1>
              </div>
            </div>
      <div>
      
      <FormularioItem />
    </div>
    <Footer />
    </>
  );
};

export default FormularioItemPage;