//componente pai/orquestrador (lifting state up) - controla estados principais, carrega dados, distribui props

import {useCallback, useEffect, useState } from "react";
import type { Gasto } from "../tipos/tipos";
import { getGastos } from "../service/consumo";
import { FormGasto } from "./FormGasto";
import { ListaGastos } from "./ListaGastos";


export default function Dashboard() {
    const [gastos, setGastos] = useState<Gasto[]>([]);

  const carregarDados = useCallback(async () => {
    try {
      const dados = await getGastos();
      setGastos(dados);
    } catch (err) {
      console.error("Erro ao buscar gastos:", err);
    }
  }, []); // Sem dependências para ser criada apenas uma vez

  //2. Para evitar o erro usa assíncrona limpa
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

  return (
    <>
      <FormGasto onGastoCriado={carregarDados} />

      <ListaGastos
        gastos={gastos}
        carregarDados={carregarDados}
      />
    </>
  );

}

