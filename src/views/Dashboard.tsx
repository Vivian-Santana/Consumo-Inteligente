// views/Dashboard.tsx
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Insights } from "../components/Insights";
import { ListaGastos } from "../components/ListaGastos";
import { FormGasto } from "../components/FormGasto";
import { FormRendimentos } from "../components/FormRendimentos";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-(--bg-color) text-(--text-primary)">
      <Navbar />

      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {/* CABEÇALHO */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Minha Saúde Financeira</h1>
          <p className="opacity-60 text-sm">
            Gerencie seus gastos e acompanhe seus limites em tempo real.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CADASTRAR RENDA */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
              <h2 className="text-lg font-semibold mb-2 text-pink-400">
                💰 Cadastrar Renda
              </h2>
              <FormRendimentos />
            </div>

            <div className="p-6 rounded-2xl border border-slate-700 bg-slate-800/20">
              <h2 className="text-lg font-semibold mb-2 text-blue-400">
                💸 Novo Gasto
              </h2>
              <FormGasto />
            </div>
          </div>

          {/* LISTAGEM DE GASTOS */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/40 min-h-100">
              <ListaGastos />
            </div>
          </div>

          {/* INSIGHTS */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-slate-700 bg-slate-900/40">
              <Insights />
            </div>

            <div className="h-64 rounded-2xl border border-slate-700 flex items-center justify-center italic opacity-40 bg-slate-800/10">
              Gráfico de Consumo (Chart.js)
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
