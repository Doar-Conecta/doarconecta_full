"use client";

import React, { useState } from "react";
import Image from "next/image";
import Navbar from '@/components/Navbar';

interface LoginFormProps {
  onSubmit: (email: string, senha: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    onSubmit(email, senha);
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-row items-center space-y-2">
          <Image
            src="/doarconecta-logo.png"
            alt="Doar Conecta Logo"
            width={64}
            height={64}
          />
          <h1 className="text-xl font-semibold text-gray-800">DOAR CONECTA</h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="email@email.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm outline-none placeholder-gray-600"
            />
          </div>

          <div>
            <label htmlFor="senha" className="sr-only">
              Senha
            </label>
            <input
              id="senha"
              name="senha"
              type="password"
              required
              placeholder="********************"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full rounded-md bg-gray-200 px-4 py-2 text-sm outline-none placeholder-gray-600"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              <span>Lembrar-me</span>
            </label>

            <a href="#" className="text-gray-700 hover:underline">
              Esqueceu sua senha?
            </a>
          </div>

          {erro && (
            <div className="rounded-md bg-red-100 p-3 text-sm text-red-700">
              {erro}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-green-600 py-2 text-white hover:bg-green-700"
          >
            Entrar
          </button>

          <p className="text-center text-sm">
            Não tem uma conta?{" "}
            <a href="/registrar" className="text-sky-600 hover:underline">
              Registre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
