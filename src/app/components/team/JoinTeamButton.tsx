"use client";

import { useEffect, useState } from "react";

interface JoinTeamButtonProps {
    teamId: string;
}

export default function JoinTeamButton({ teamId }: JoinTeamButtonProps) {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserRole() {
            const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`${urlEnv}/api/user/role`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setRole(data.role);
            } catch (error) {
                console.error("Erro ao buscar papel do usuário:", error);
            }
        }

        fetchUserRole();
    }, []);

    // Se o usuário não for "user", não exibe o botão
    if (role !== "user") return null;

    return (
        <div className="mt-6 flex flex-col items-center">
            <button
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Solicitar entrada
            </button>
        </div>
    );
}
