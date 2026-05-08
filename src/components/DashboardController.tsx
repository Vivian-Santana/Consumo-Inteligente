//componente pai/orquestrador (lifting state up) - controla estados principais, carrega dados, distribui props

import {useCallback, useEffect, useState } from "react";
import type { Gasto } from "../tipos/tipos";
import { getGastos } from "../service/consumo";
import { FormGasto } from "./FormGasto";
import { ListaGastos } from "./ListaGastos";


export default function DashboardController() {
    const [gastos, setGastos] = useState<Gasto[]>([]);

    //função para atualizar estado
  const carregarDados = useCallback(async () => {
    try {
      const dados = await getGastos();
      setGastos(dados);
    } catch (err) {
      console.error("Erro ao buscar gastos:", err);
      alert("Erro ao buscar gastos:");
    }
  }, []); //Memoriza a função para evitar recriações desnecessárias

  //2. Para evitar o erro usa assíncrona limpa
  useEffect(() => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      carregarDados();
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

