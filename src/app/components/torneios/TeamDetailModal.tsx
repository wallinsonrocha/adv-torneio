import React, { useState, useEffect } from "react";

interface Partida {
  vitoria: boolean;
  gols: number;
  adversario: string;
}

interface Player {
  id: string;
  name: string;
}

interface Team {
  id: string;
  imgTeam: string;
  teamName: string;
  capName: string;
  players: number | Player[];
  partidas: Partida[];
}

interface TeamDetailProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTeamId: string;
}

export default function TeamDetailModal({ isOpen, onClose, selectedTeamId }: TeamDetailProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Requisição para pegar os dados do time  
  useEffect(() => {
    const fetchTeamData = async () => {
      if (!selectedTeamId) return;
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(`${urlEnv}/api/times/${selectedTeamId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error('Não foi possível carregar os dados do time');
        }

        const data = await response.json();
        setTeam(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [selectedTeamId, isOpen]);


  if (!isOpen) return null;
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!team) return null;

  // Para calcular estatísticas simples com base no array de partidas
  const wins = team.partidas.filter(match => match.vitoria).length;
  const losses = team.partidas.length - wins;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/3 p-6 relative max-h-[80vh] overflow-y-auto">
        {/* Botão para fechar */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          Fechar
        </button>

        {/* Informações iniciais */}
        <div className="flex items-center gap-4 border-b pb-4">
          <img
            src={team.imgTeam}
            alt={team.teamName}
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
          <h2 className="text-2xl font-bold text-gray-800">{team.teamName}</h2>
        </div>

        {/* Capitão do time */}
        <div className="mt-4">
          <p className="text-gray-600 text-lg">
            <strong>Capitão:</strong> <span className="text-gray-800">{team.capName}</span>
          </p>
        </div>

        {/* Jogadores */}
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-700">Jogadores:</p>
          {Array.isArray(team.players) ? (
            <ul className="grid grid-cols-2 gap-2 mt-2 text-gray-600">
              {team.players.map((player, index) => (
                <li className="flex items-center gap-2" key={index}>
                  <img className="w-4 h-4" src="/icons/torneios/teams.svg" alt="Icone de jogador" />
                  {player.name}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-gray-600">{team.players} jogadores</p>
          )}
        </div>

        {/* Partidas jogadas */}
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-700">Partidas:</p>
          <ul className="mt-2 text-gray-600">
            {team.partidas.map((match, index) => (
              <li key={index}>
                {match.adversario} - {match.vitoria ? "Vitória" : "Derrota"} - Gols: {match.gols}
              </li>
            ))}
          </ul>
        </div>

        {/* Estatistica */}
        <div className="mt-6 flex justify-between items-center text-center">
          <div className="w-1/2 p-2 border-r">
            <p className="text-green-500 text-2xl font-bold">{wins}</p>
            <p className="text-gray-700">Vitórias</p>
          </div>
          <div className="w-1/2 p-2">
            <p className="text-red-500 text-2xl font-bold">{losses}</p>
            <p className="text-gray-700">Derrotas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
