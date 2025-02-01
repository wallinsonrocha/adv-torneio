import Image from "next/image";

interface MatchProps {
  match: {
    data: string;
    status: string;
    team1: { imgTeam: string; teamName: string; score: number | null };
    team2: { imgTeam: string; teamName: string; score: number | null };
  };
}

const MatchCard: React.FC<MatchProps> = ({ match }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      {/* MatchDateStatus */}
      <div>
        <div className="flex gap-2">
          <Image width={16} height={16} src="/icons/torneios/calendar.svg" alt="Calendário" />
          <p className="text-gray-700 font-medium">{match.data}</p>
        </div>
        <p className={`text-sm ${match.status === "Finalizado" ? "text-green-600" : "text-yellow-600"}`}>
          {match.status}
        </p>
      </div>

      {/* MatchTeam and Score */}
      <div className="mt-3 flex justify-between items-center">
        {/* Team 1 */}
        <div className="flex items-center space-x-3">
          <img className="max-w-10 rounded-full" src={match.team1.imgTeam} alt={match.team1.teamName} />
          <p className="text-gray-800 font-semibold">{match.team1.teamName}</p>
        </div>

        {/* Score */}
        {match.status != "Em breve" ? (
          <span className="text-xl font-bold text-gray-900">{match.team1.score} - {match.team2.score}</span>
        ) : (
          <span className="text-gray-500">vs</span>
        )}

        {/* Team 2 */}
        <div className="flex items-center space-x-3">
          <img className="max-w-10 rounded-full" src={match.team2.imgTeam} alt={match.team2.teamName} />
          <p className="text-gray-800 font-semibold">{match.team2.teamName}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchCard;