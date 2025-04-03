import { Outlet, createRootRoute, useMatches } from "@tanstack/react-router";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const matches = useMatches();
  const currentPath = matches[matches.length - 1]?.pathname || "/";

  // Esconde o header apenas na rota de login (/)
  const shouldHideHeader = currentPath === "/";

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Outlet />
    </>
  );
}
