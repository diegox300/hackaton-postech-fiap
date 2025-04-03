import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";

import logo from "../assets/nota10-logo.svg";
import { Button } from "../components/Button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  function handleValidate() {
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="bg-blackOne min-h-screen flex items-center justify-center">
      <div className="w-[400px] text-white">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Logo" className="w-[300px] mb-4" />
        </div>
        <form className="px-4">
          <input
            type="text"
            className="w-full p-4 mb-4 rounded bg-white text-gray-500"
            placeholder="Usuário"
          />
          <input
            type="password"
            className="w-full p-4 mb-4 rounded bg-white text-gray-500"
            placeholder="Senha"
          />
          <Button variant="green" onClick={handleValidate}>
            ENTRAR
          </Button>
        </form>
      </div>
    </div>
  );
}
