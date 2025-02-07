"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import TeamCardTourn from "@/app/components/torneios/TeamCardTourn";
import MatchCard from "@/app/components/torneios/MatchCard";
import { useParams } from "next/navigation";
import Ranking from "@/app/components/torneios/Raking";
import ActionButtonRole from "@/app/components/torneios/ActionButtonRole";
import TeamDetailModal from "@/app/components/torneios/TeamDetailModal";

const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function InfoTournament() {
    const [tab, setTab] = useState("teams"); // Controle de abas (times / partidas / ranking)
    const [tournament, setTournament] = useState<any>(null); // Estado para armazenar o torneio    
    const [loading, setLoading] = useState(true);
    const [selectedIdTeam, setSelectedIdTeam] = useState<string | null>(null); // Estado para armazenar o time selecionado
    const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
    const params = useParams();

    // UseEffect para a requisução
    useEffect(() => {
        // Conexão com Backend
        const fetchTournament = async () => {
            try {
                const url = `${urlEnv}/api/torneios/${params.id}`;
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Erro ao carregar o torneio.");
                }

                const data = await response.json();
                setTournament(data);
            } catch (error) {
                console.error("Erro ao buscar torneio.", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTournament();
    }, [params]);

    // UseEffect para o modal
    useEffect(() => {
        if (selectedIdTeam == null) {
            return setIsModalOpen(false)
        }

        setIsModalOpen(true);        
    }, [selectedIdTeam])

    if (loading) {
        return <p className="text-center text-gray-600">Carregando torneio...</p>;
    }

    if (!tournament) {
        return <p className="text-center text-red-600">Erro ao carregar torneio.</p>;
    }

    return (
        <section className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {/* Informações do torneio */}
            <div className="bg-blue-50 p-5 rounded-lg shadow-md">
                <div className="flex gap-2">
                    <Image src="/icons/torneios/trophy.svg" width={50} height={50} alt="Ícone do troféu" />
                    <h1 className="font-bold text-gray-900">{tournament.nome}</h1>
                </div>
                <div className="my-2 grid md:grid-cols-2 gap-4 text-gray-700">
                    <div className="flex gap-2 h-fit">
                        <Image src="/icons/torneios/teams.svg" width={16} height={16} alt="Ícone de time" />
                        <p>Times: <strong>{tournament.timesParticipantes?.length || 0}/{tournament.playersLimit}</strong></p>
                    </div>
                    <div className="flex gap-2 h-fit">
                        <Image src="/icons/torneios/calendar.svg" width={16} height={16} alt="Ícone de calendário" />
                        <p>Duração: <strong>{tournament.dataInicio} - {tournament.dataTermino}</strong></p>
                    </div>
                    <div className="flex gap-2 h-fit">
                        <Image src="/icons/torneios/status.svg" width={16} height={16} alt="Ícone de status" />
                        <p>Status: <strong>{tournament.status}</strong></p>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="font-bold">Regras</p>
                    <p>{tournament.regras || "Sem regras definidas"}</p>
                </div>
            </div>

            {/* Navegação entre abas */}
            <div className="mt-6 flex space-x-4 border-b">
                <button
                    className={`pb-2 text-lg font-medium ${tab === "teams" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                    onClick={() => setTab("teams")}
                >
                    Times Inscritos
                </button>
                <button
                    className={`pb-2 text-lg font-medium ${tab === "matches" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                    onClick={() => setTab("matches")}
                >
                    Partidas
                </button>
                <button
                    className={`pb-2 text-lg font-medium ${tab === "ranking" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
                    onClick={() => setTab("ranking")}
                >
                    Ranking
                </button>
            </div>

            {/* Conteúdo das abas */}
            <div className="mt-6">
                {tab === "teams" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tournament.timesParticipantes?.length > 0 ? (
                            tournament.timesParticipantes.map((team: any, index: number) => (
                                <TeamCardTourn team={{ ...team }} setSelectedTeam={setSelectedIdTeam} key={index} />
                            ))
                        ) : (
                            <p className="text-gray-600">Nenhum time inscrito.</p>
                        )}
                    </div>
                ) : tab === "matches" ? (
                    <div className="space-y-4">
                        {tournament.partidas.length > 0 ? (
                            tournament.partidas.map((match: any, index: any) => (
                                <MatchCard key={index} match={{ ...match }} />
                            ))
                        ) : (
                            <p className="text-gray-600">Nenhuma partida agendada.</p>
                        )}
                    </div>
                ) : (
                    <Ranking tournamentData={tournament.timesParticipantes} />
                )}
            </div>

            {/* Botão de inscrição */}
            <ActionButtonRole />

            {/* Modal de detalhes do time */}
            {selectedIdTeam !== null && selectedIdTeam !== "" && (
                <TeamDetailModal
                    isOpen={isModalOpen}
                    onClose={() => setSelectedIdTeam(null)}
                    selectedTeamId={selectedIdTeam}
                />
            )}

        </section>
    );
}
