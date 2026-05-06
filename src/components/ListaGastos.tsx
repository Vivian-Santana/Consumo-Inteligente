import { useEffect, useState, useCallback } from "react";
import { getGastos, deletarGasto, atualizarGasto } from "../service/consumo";
import type { Gasto } from "../tipos/tipos";
import { Trash2, Edit } from "lucide-react";

export function ListaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([]);

  // função.

  const carregarDados = useCallback(async () => {
    try {
      const dados = await getGastos();
      setGastos(dados);
    } catch (err) {
      console.error("Erro ao buscar gastos:", err);
    }
  }, []); // Sem dependências para ser criada apenas uma vez

  // 2. Para evitar o erro usa assíncrona limpa
  useEffect(() => {
    let montado = true;

    if (montado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      carregarDados();
    }

    return () => {
      montado = false;
    };
  }, [carregarDados]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Deseja apagar este gasto?")) {
      try {
        await deletarGasto(id);
        await carregarDados();
      } catch (err) {
        console.error("Erro ao deletar:", err);
      }
    }
  };

  const handleEdit = async (id: string) => {
    const novoValor = window.prompt("Digite o novo valor:");
    if (novoValor && !isNaN(Number(novoValor))) {
      try {
        await atualizarGasto(id, { valor: Number(novoValor) });
        await carregarDados();
      } catch (err) {
        console.error("Erro ao editar:", err);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="font-bold border-b border-slate-700 pb-2 text-white">
        Seus Gastos
      </h3>

      {gastos.length === 0 ? (
        <p className="text-sm opacity-40 italic text-gray-400">
          Nenhum gasto encontrado.
        </p>
      ) : (
        gastos.map((g) => (
          <div
            key={g.id}
            className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg border border-slate-700"
          >
            <div>
              <p className="font-medium text-gray-200">{g.descricao}</p>
              <p className="text-xs text-blue-400 font-mono">
                R$ {g.valor.toFixed(2)}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(g.id)}
                className="text-yellow-500 hover:scale-110 transition p-1"
                aria-label="Editar"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => handleDelete(g.id)}
                className="text-red-500 hover:scale-110 transition p-1"
                aria-label="Excluir"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
