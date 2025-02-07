"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import JoinTeamButton from "@/app/components/team/JoinTeamButton";

export default function TeamCardInfo() {
    const [team, setTeam] = useState<any | null>(null);
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        async function fetchTeamDetails() {
            if (!id) return;

            const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const response = await fetch(`${urlEnv}/api/times/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setTeam(data);
            } catch (error) {
                console.error("Erro ao buscar informações do time:", error);
            }
        }

        fetchTeamDetails();
    }, [id]);

    if (!team) return (
        <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
            <span className="text-xl text-gray-600">Carregando...</span>
        </div>
    );

    return (
        <section className="p-6 bg-gray-100 min-h-screen">
            <div className="container max-w-screen-xl bg-white shadow-lg rounded-xl p-8">
                {/* Informações iniciais */}
                <div className="flex items-center mb-8">
                    <img
                        src={team.imgTeam}
                        alt={team.teamName}
                        className="w-40 h-40 rounded-full mr-8 border-4 border-blue-500"
                    />
                    <div>
                        <h2 className="text-4xl font-semibold text-gray-800">{team.teamName}</h2>
                        <p className="text-xl text-gray-600 mt-2">Capitão: {team.capName}</p>
                    </div>
                </div>

                <JoinTeamButton teamId={team.id}/>

                <div className="mb-8">
                    <h3 className="text-3xl font-semibold text-gray-800 mb-6">Jogadores</h3>
                    {/* Jogadores e lista de nomes */}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.players.map((player: any) => (
                            <li key={player.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
                                <p className="text-lg font-medium text-gray-700">{player.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    {/* Partidas */}
                    <h3 className="text-3xl font-semibold text-gray-800 mb-6">Partidas</h3>
                    <ul className="space-y-6">
                        {/* Lista de partidas */}
                        {team.partidas.map((match: any, index: number) => (
                            // Informações das partidas
                            <li key={index} className="p-6 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                                <div className="flex justify-between items-center mb-2">
                                    <p className="font-bold text-xl text-gray-800">Adversário: {match.adversario}</p>
                                    <span className={`px-3 py-1 rounded-full ${match.vitoria ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                        {match.vitoria ? "Vitória" : "Derrota"}
                                    </span>
                                </div>
                                <p className="text-gray-700">Gols: {match.gols}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
