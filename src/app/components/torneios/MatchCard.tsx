import Image from "next/image";

interface MatchProps {
  match: {
    data: string;
    status: string;
    team1: {
      imgTeam: string;
      teamName: string;
      score: number | null;
      yellowCards: number;
      redCards: number;
    };
    team2: {
      imgTeam: string;
      teamName: string;
      score: number | null;
      yellowCards: number;
      redCards: number;
    };
  };
}

export default function MatchCard({ match }: MatchProps) {
  return (
    <div data-testid="match-card" className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Data e Status */}
      <div className="flex items-center justify-between text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <Image width={16} height={16} src="/icons/torneios/calendar.svg" alt="Calendário" />
          <p className="font-medium">{match.data}</p>
        </div>
        <p className={`text-xs font-semibold px-2 py-1 rounded ${match.status === "Finalizado" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"}`}>
          {match.status}
        </p>
      </div>

      {/* Times e Placar */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Time 1 */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <img className="w-10 h-10 rounded-full border" src={match.team1.imgTeam} alt={match.team1.teamName} />
          <p className="text-gray-800 font-semibold">{match.team1.teamName}</p>
        </div>

        {/* Placar */}
        <div className="text-center">
          {match.status !== "Em breve" ? (
            <span className="text-xl font-bold text-gray-900">
              {match.team1.score} - {match.team2.score}
            </span>
          ) : (
            <span className="text-gray-500 text-sm">vs</span>
          )}
        </div>

        {/* Time 2 */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <p className="text-gray-800 font-semibold">{match.team2.teamName}</p>
          <img className="w-10 h-10 rounded-full border" src={match.team2.imgTeam} alt={match.team2.teamName} />
        </div>
      </div>

      {/* Estatísticas */}
      <div className="mt-4 grid place-content-center text-gray-600 m-auto">     
        <div className="justify-between mt-2">
          <p><strong>Cartões Amarelos:</strong> {match.team1.yellowCards} - {match.team2.yellowCards}</p>
          <p><strong>Cartões Vermelhos:</strong> {match.team1.redCards} - {match.team2.redCards}</p>
        </div>
      </div>
    </div>
  );
};
