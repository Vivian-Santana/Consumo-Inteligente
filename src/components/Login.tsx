import { useState } from "react";
import type { FormEvent } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Dados de Login:", { username, password });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0A1628] via-[#1a2942] to-[#00C49A] p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border-2 border-white/20 rounded-xl p-10 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-white mb-8">
            Acesse o sistema
          </h1>

          {/* Campo E-mail */}
          <div className="relative">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full px-6 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-[#00C49A] transition-colors"
            />
            <FaUser className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          {/* Campo Senha */}
          <div className="relative">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-transparent border-2 border-white/20 rounded-full px-6 pr-12 text-white placeholder-white/70 focus:outline-none focus:border-[#00C49A] transition-colors"
            />
            <FaLock className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70" />
          </div>

          {/* Lembrar + Esqueceu senha */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#00C49A] cursor-pointer"
              />
              <span>Lembre de mim</span>
            </label>

            <a
              href="#"
              className="text-white hover:text-[#00C49A] hover:underline transition-colors"
            >
              Esqueceu sua senha?
            </a>
          </div>

          {/* Botão Login */}
          <button
            type="submit"
            className="w-full h-12 bg-linear-to-r from-[#00C49A] to-[#00d4a8] text-[#0A1628] font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Login
          </button>

          {/* Link Registrar */}
          <div className="text-center text-sm text-white">
            <p>
              Não tem uma conta?{" "}
              <a
                href="#"
                className="font-semibold text-[#00C49A] hover:underline transition-colors"
              >
                Registrar
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
