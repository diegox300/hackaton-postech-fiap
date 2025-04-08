import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "../services/supabaseClient"; // Certifique-se de ter configurado o cliente Supabase

import logo from "../assets/nota10-logo.svg";
import { Button } from "../components/Button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleValidate(event: React.FormEvent) {
    event.preventDefault();

    // Verifica na tabela "aluno"
    const { data: aluno, error: alunoError } = await supabase
      .from("alunos")
      .select("*")
      .eq("ra", username)
      .eq("senha", password)
      .single();

    if (aluno) {
      navigate({ to: "/dashboard" });
      return;
    }

    if (alunoError) {
      console.error("Erro ao buscar aluno:", alunoError);
    }

    // Verifica na tabela "professor"
    const { data: professor, error: professorError } = await supabase
      .from("professores")
      .select("*")
      .eq("ra", username)
      .eq("senha", password)
      .single();

    if (professor) {
      navigate({ to: "/dashboard" });
      return;
    }
    if (professorError) {
      console.error("Erro ao buscar professor:", professorError);
    }

    // Caso nenhum seja encontrado
    setError("Usuário ou senha inválidos.");
  }

  return (
    <div className="bg-blackOne min-h-screen flex items-center justify-center">
      <div className="w-[400px] text-white">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="w-[300px] mb-4" />
        </div>
        <form className="px-4" onSubmit={handleValidate}>
          <input
            type="text"
            className="w-full p-4 mb-4 rounded bg-white text-gray-500"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="w-full p-4 mb-4 rounded bg-white text-gray-500"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Button variant="green" type="submit">
            ENTRAR
          </Button>
        </form>
      </div>
    </div>
  );
}
