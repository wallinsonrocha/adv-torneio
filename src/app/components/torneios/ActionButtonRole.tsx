import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ActionButtonRole() {
    const [role, setRole] = useState<string | null>(null);
    const hasFetched = useRef(false); // Evita chamadas repetidas

    const fetchUserRole = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`${urlEnv}/api/user/role`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const data = await response.json();
                setRole(data.role);
            }
        } catch (error) {
            console.error("Erro ao verificar o papel do usuário:", error);
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            fetchUserRole();
            hasFetched.current = true;
        }
    }, []);

    if (role === "user") return null;

    return (
        <div className="mt-6 text-center">
            {role === "captain" ? (
                <Link
                    href="/inscricao"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Inscrever-se
                </Link>
            ) : role === "admin" ? (
                <Link
                    href="/editar-torneio"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                >
                    Editar
                </Link>
            ) : null}
        </div>
    );
}
