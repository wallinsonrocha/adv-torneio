import { useState, useEffect } from "react";

interface Team {
    imgTeam: string | undefined;
    teamName: string;
    vitorias: number;
    gols: number;
    partidas: Array<any>;
}

interface RankingProps {
    tournamentData: any;
}

export default function Ranking({ tournamentData }: RankingProps) {
    const [ranking, setRanking] = useState<Team[]>([]);

    // Função para calcular o ranking
    const calculateRanking = (tournamentData: any) => {
        const teams = tournamentData || [];

        const rankedTeams = teams.map((team: any) => {
            const vitorias = team.partidas.filter((match: any) => match.vitoria).length;
            const gols = team.partidas.reduce((acc: number, match: any) => acc + match.gols, 0);

            return { ...team, vitorias, gols };
        });

        // Ordena os times por vitórias e gols
        const sortedTeams = rankedTeams.sort((a: any, b: any) => {
            if (b.vitorias === a.vitorias) {
                return b.gols - a.gols; // Se vitórias forem iguais, ordena por gols
            }
            return b.vitorias - a.vitorias;
        });

        setRanking(sortedTeams);
    };

    // Calcular ranking quando os dados do torneio mudam
    useEffect(() => {
        if (tournamentData) {
            calculateRanking(tournamentData);
        }
    }, [tournamentData]);

    return (
        <div className="space-y-8">
            {/* Top 3 */}
            <h2 className="text-3xl font-semibold text-gray-800 text-center">Top 3</h2>
            {ranking.slice(0, 3).map((team, index) => (
                <div
                    data-testid="ranking-card"
                    key={index}
                    className={`flex justify-between items-center py-4 px-6 rounded-lg shadow-xl transition-all duration-300 transform ${index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                            : index === 1
                                ? "bg-gradient-to-r from-gray-300 to-gray-400"
                                : "bg-gradient-to-r from-blue-400 to-blue-500"
                        } hover:scale-105 hover:shadow-2xl hover:opacity-90`}
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src={team.imgTeam}
                            alt={team.teamName}
                            className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                        />
                        <span className="font-bold text-xl text-white">{team.teamName}</span>
                    </div>
                    <span className="font-medium text-white text-lg">
                        {team.vitorias} vitórias | {team.gols} gols
                    </span>
                </div>
            ))}

            {/* Restante */}
            <h2 className="text-3xl font-semibold text-gray-800 text-center mt-10">Restante</h2>
            {ranking.slice(3).map((team, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center py-4 px-6 rounded-lg shadow-md bg-white hover:bg-gray-50 transition-colors duration-200 ease-in-out transform hover:scale-105"
                >
                    <div className="flex items-center space-x-4">
                        <img
                            src={team.imgTeam}
                            alt={team.teamName}
                            className="w-12 h-12 rounded-full border-4 border-gray-300 shadow-md"
                        />
                        <span className="font-medium text-xl text-gray-900">{team.teamName}</span>
                    </div>
                    <span className="font-medium text-gray-700 text-lg">
                        {team.vitorias} vitórias | {team.gols} gols
                    </span>
                </div>
            ))}
        </div>
    );

}
