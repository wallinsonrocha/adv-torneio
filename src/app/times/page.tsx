"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/app/components/search-bar/SearchBar";
import TeamCard from "../components/team/TeamCard";

export default function ListTeams() {
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]);

    useEffect(() => {
        async function fetchTeams() {
            const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch(`${urlEnv}/api/times/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const data = await response.json();
                setTeams(data);
                setFilteredTeams(data); // Inicialmente, todos os times são exibidos
            } catch (error) {
                console.error("Erro ao buscar times:", error);
            }
        }

        fetchTeams();
    }, []);

    const handleSearch = (query: string) => {
        const filtered = teams.filter((team: any) =>
            team.teamName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTeams(filtered);
    };

    return (
        <section className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="container max-w-screen-xl bg-white shadow-md rounded-2xl p-6">
                {/* Barra de busca */}
                <SearchBar onSearch={handleSearch} placeholder="Buscar times..." />

                {/* Lista de Times */}
                <div className="mt-6 space-y-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Times</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTeams.length > 0 ? (
                            filteredTeams.map((team: any) => <TeamCard key={team.id} {...team} />)
                        ) : (
                            <p className="text-gray-600">Nenhum time encontrado.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
