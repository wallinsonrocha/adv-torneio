"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  role: "user" | "captain" | "admin";
}

interface Notification {
  id: number;
  message: string;
  read: boolean;
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Você recebeu uma nova mensagem no chat.", read: false },
    { id: 2, message: "Seu time foi atualizado com sucesso.", read: false },
    { id: 3, message: "Novo torneio disponível para inscrição.", read: false },
  ]);
  const router = useRouter();
  const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Busca os dados do usuário logado
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await fetch(`${urlEnv}/api/user/role`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    fetchUser();
  }, []);

  // Função para logout
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`${urlEnv}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/enter");
      } else {
        console.error("Erro ao fazer logout");
      }
    } catch (error) {
      console.error("Erro na requisição de logout:", error);
    }
  };

  // Função para marcar uma notificação como lida
  const markNotificationAsRead = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (!user) return null;

  return (
    <header className="bg-gray-900 text-white p-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou nome */}
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">LawyerTorneios</span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link href="/times">Times</Link>
          <Link href="/torneios">Torneios</Link>
          {user.role === "captain" && <Link href="/meu-time">Meu Time</Link>}
          {user.role === "admin" && <Link href="/admin">Área Administrativa</Link>}
          {user.role !== "admin" && (
            <>
              <Link href="#">Área do Usuário</Link>
              <button onClick={() => setIsNotificationsOpen(true)} className="text-white">
                <img src="/icons/layout/notification.svg" alt="Notificações" className="w-5 h-5" />
              </button>
            </>
          )}
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </nav>

        {/* Botão de menu mobile (apenas em telas pequenas) */}
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <nav className="flex flex-col space-y-6 text-xl">
            <Link href="/times" onClick={() => setIsMobileMenuOpen(false)}>Times</Link>
            <Link href="/torneios" onClick={() => setIsMobileMenuOpen(false)}>Torneios</Link>
            {user.role === "captain" && (
              <Link href="/meu-time" onClick={() => setIsMobileMenuOpen(false)}>Meu Time</Link>
            )}
            {user.role === "admin" && (
              <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>Área Administrativa</Link>
            )}
            {user.role !== "admin" && (
              <>
                <Link href="#" onClick={() => setIsMobileMenuOpen(false)}>Área do Usuário</Link>
                <button
                  onClick={() => {
                    setIsNotificationsOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white"
                >
                  Notificações
                </button>
              </>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Modal de Notificações */}
      {isNotificationsOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-96 max-w-full transform transition-all duration-300 p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">Notificações</h2>
            <ul className="space-y-3">
              {notifications.map((notification) => (
                <li
                  key={notification.id}
                  className={`flex items-center justify-between border-b pb-2 px-2 ${
                    notification.read ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <span className={`text-gray-700 ${notification.read ? "line-through" : ""}`}>
                    {notification.message}
                  </span>
                  {!notification.read && (
                    <button
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                    >
                      Marcar como lida
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow transition-colors duration-300"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
