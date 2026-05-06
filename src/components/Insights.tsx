import { useEffect, useState } from "react";
import { getGastos, getRendimentos } from "../service/consumo";
import { categorias } from "../constantes/categorias";
import type { Gasto, Rendimento } from "../tipos/tipos";

export function Insights() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [rendimentos, setRendimentos] = useState<Rendimento[]>([]);

  // Qdo a tela abrir os dados da API sao carregados - eu espero os gastos, depois espero os rendimentos
  useEffect(() => {
    async function carregarDados() {
      const g = await getGastos();
      const r = await getRendimentos();
      setGastos(g);
      setRendimentos(r);
    }
    carregarDados();
  }, []);

  // 1. Soma o total de dinheiro que entrou
  const totalRecebido = rendimentos.reduce(
    (soma, item) => soma + item.valor,
    0,
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1a1a1a",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>
        💡 Insights de Gastos
      </h2>

      {totalRecebido === 0 ? (
        <p style={{ color: "#888" }}>Cadastre sua renda para ver os limites.</p>
      ) : (
        categorias.map((cat) => {
          // 2. Soma quanto gastou
          const totalGastoNaCategoria = gastos
            .filter((g) => g.categoria === cat.id)
            .reduce((soma, g) => soma + g.valor, 0);

          // 3. Calcula o limite em Reais (Ex: 5000 * 0.5 (50%)
          const limiteEmReais = totalRecebido * cat.limite;

          // 4. Verifica se passou do limite
          const estourou = totalGastoNaCategoria > limiteEmReais;

          return (
            <div
              key={cat.id}
              style={{
                marginBottom: "15px",
                padding: "10px",
                borderLeft: `5px solid ${estourou ? "red" : "green"}`,
                backgroundColor: "#2a2a2a",
              }}
            >
              <h4 style={{ color: "#ddd", margin: 0 }}>{cat.descricao}</h4>

              <p
                style={{
                  color: estourou ? "#ff4d4d" : "#4dff4d",
                  fontSize: "14px",
                }}
              >
                {totalGastoNaCategoria.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
                <span style={{ color: "#888" }}> de um limite de </span>
                {limiteEmReais.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              {estourou && (
                <small style={{ color: "#ff4d4d", fontWeight: "bold" }}>
                  ⚠️ Atenção: Você passou do limite sugerido!
                </small>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
