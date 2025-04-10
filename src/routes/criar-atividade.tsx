import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { supabase } from "../services/supabaseClient"; // Certifique-se de ter configurado o cliente Supabase

export const Route = createFileRoute("/criar-atividade")({
  component: RouteComponent,
});

function RouteComponent() {
  const [turma, setTurma] = useState("");
  const [materia, setMateria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [questoes, setQuestoes] = useState([
    { titulo: "", alternativas: ["", "", "", ""] },
  ]);
  const [turmas, setTurmas] = useState([]); // Estado para armazenar as turmas
  const [materias, setMaterias] = useState([]); // Estado para armazenar as matérias

  // Busca as turmas no Supabase ao carregar o componente
  useEffect(() => {
    const fetchTurmas = async () => {
      const { data, error } = await supabase.from("turmas").select("*");
      if (error) {
        console.error("Erro ao buscar turmas:", error);
      } else {
        setTurmas(data || []); // Armazena as turmas no estado
      }
    };

    const fetchMaterias = async () => {
      const { data, error } = await supabase.from("materias").select("*");
      if (error) {
        console.error("Erro ao buscar matérias:", error);
      } else {
        setMaterias(data || []); // Armazena as matérias no estado
      }
    };

    fetchTurmas();
    fetchMaterias();
  }, []);

  const handleAddQuestao = () => {
    setQuestoes([...questoes, { titulo: "", alternativas: ["", "", "", ""] }]);
  };

  const handleQuestaoChange = (index: number, field: string, value: string) => {
    const novasQuestoes = [...questoes];
    if (field === "titulo") {
      novasQuestoes[index].titulo = value;
    } else {
      const altIndex = parseInt(field);
      novasQuestoes[index].alternativas[altIndex] = value;
    }
    setQuestoes(novasQuestoes);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!turma || !materia || !titulo || questoes.length === 0) {
        console.error("Por favor, preencha todos os campos.");
        return;
      }

      // Inserir a atividade na tabela 'atividades'
      const { data: atividadeData, error: atividadeError } = await supabase
        .from("atividades")
        .insert([
          {
            titulo: titulo,
            turma_id: turma,
            materia_id: materia,
          },
        ])
        .select("*");

      // Verificar o retorno da inserção
      console.log("Resposta da inserção da atividade:", atividadeData);
      console.log("Erro na inserção da atividade:", atividadeError);

      if (atividadeError) {
        console.error(
          "Erro ao salvar a atividade:",
          atividadeError.message || atividadeError.details || atividadeError
        );
        return;
      }

      if (!atividadeData || atividadeData.length === 0) {
        console.error("A atividade foi salva, mas sem dados retornados.");
        return;
      }

      console.log("Atividade salva com sucesso:", atividadeData);

      for (const questao of questoes) {
        const { data: questaoData, error: questaoError } = await supabase
          .from("questoes")
          .insert([
            {
              atividade_id: atividadeData[0].id,
              titulo_questao: questao.titulo,
            },
          ])
          .select("*");

        if (questaoError) {
          console.error(
            "Erro ao salvar a questão:",
            questaoError.message || questaoError.details || questaoError
          );
          continue;
        }

        console.log("Questão salva:", questaoData);

        // Agora salvar as alternativas para a questão
        for (let i = 0; i < questao.alternativas.length; i++) {
          const { data: alternativaData, error: alternativaError } =
            await supabase.from("alternativas").insert([
              {
                questao_id: questaoData.id,
                texto_alternativa: questao.alternativas[i],
                is_correta: i === 0,
              },
            ]);

          if (alternativaError) {
            console.error(
              "Erro ao salvar a alternativa:",
              alternativaError.message ||
                alternativaError.details ||
                alternativaError
            );
          } else {
            console.log("Alternativa salva:", alternativaData);
          }
        }
      }

      alert("Atividade cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar no banco:", err);
    }
  };

  const handleRemoveQuestao = (index: number) => {
    const novasQuestoes = [...questoes];
    novasQuestoes.splice(index, 1);
    setQuestoes(novasQuestoes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-2xl my-5 mx-auto bg-gray-100 p-6 rounded-3xl space-y-6">
        <h3 className="text-3 font-bold">Nova atividade</h3>

        {/* Select de turmas preenchido dinamicamente */}
        <select
          className="w-full p-3 rounded-md bg-white"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          required
        >
          <option value="">Selecione a turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.descricao}{" "}
            </option>
          ))}
        </select>

        {/* Select de matérias preenchido dinamicamente */}
        <select
          className="w-full p-3 rounded-md bg-white"
          value={materia}
          onChange={(e) => setMateria(e.target.value)}
          required
        >
          <option value="">Selecione a matéria</option>
          {materias.map((materia) => (
            <option key={materia.id} value={materia.id}>
              {materia.descricao}{" "}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Digite o nome da Atividade"
          className="w-full p-3 rounded-md bg-white"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        {questoes.map((questao, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-lg space-y-3">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">Questão {index + 1}</p>
              <button
                type="button"
                onClick={() => handleRemoveQuestao(index)}
                className="hover:text-purpleOne font-bold cursor-pointer"
              >
                Remover
              </button>
            </div>
            <input
              type="text"
              placeholder="Título da questão"
              className="w-full p-3 rounded-md bg-white"
              value={questao.titulo}
              onChange={(e) =>
                handleQuestaoChange(index, "titulo", e.target.value)
              }
              required
            />
            {questao.alternativas.map((alt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Alternativa ${i + 1}`}
                className="w-full p-3 rounded-md bg-white"
                value={alt}
                onChange={(e) =>
                  handleQuestaoChange(index, i.toString(), e.target.value)
                }
                required
              />
            ))}
          </div>
        ))}

        <Button type="button" onClick={handleAddQuestao} variant="purple">
          ADICIONAR NOVA QUESTÃO
        </Button>
      </div>

      <div className="max-w-2xl my-5 mx-auto ">
        <Button type="submit" variant="green">
          CADASTRAR ATIVIDADE
        </Button>
      </div>
    </form>
  );
}
