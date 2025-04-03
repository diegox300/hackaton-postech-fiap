import { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logo from "../../assets/nota10-logo.svg";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 768;

    if (contentRef.current) {
      if (isDesktop) {
        contentRef.current.style.maxHeight = "";
      } else {
        if (isMenuOpen) {
          contentRef.current.style.maxHeight =
            contentRef.current.scrollHeight + "px";
        } else {
          contentRef.current.style.maxHeight = "0px";
        }
      }
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && contentRef.current) {
        contentRef.current.style.maxHeight = "";
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-blackOne text-white">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-5 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="w-25" />
        </Link>

        {/* Botão Mobile */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-14 h-14 justify-center text-sm text-greyOne rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          {!isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>

        <div
          ref={contentRef}
          className="w-full md:w-auto overflow-hidden transition-all duration-500 ease-in-out md:block"
        >
          <ul className="flex flex-col pt-4 md:flex-row md:pt-0 md:gap-8">
            <li>
              <Link
                to="/dashboard"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/criar-atividade"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Criar atividade
              </Link>
            </li>
            <li>
              <Link
                to="/turmas"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Turmas e Alunos
              </Link>
            </li>
            <li>
              <Link
                to="/atividades-do-aluno"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Atividades do aluno
              </Link>
            </li>
            <li>
              <Link
                to="/minhas-atividades"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Minhas atividades
              </Link>
            </li>
            <li>
              <Link
                to="/notificacoes"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Notificações
              </Link>
            </li>
            <li>
              <Link
                to="/logout"
                className="block py-2 hover:text-greenOne md:py-0"
              >
                Sair
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
