import Image from "next/image";


interface TeamCardTournProps {
    team: {
        id: string;
        teamName: string;
        capName: string;
        players: number;
        imgTeam: string;
    };
    setSelectedTeam: (id: string) => void;
}

export default function TeamCardTourn({ team, setSelectedTeam }: TeamCardTournProps) {

    return (
        <>
            <div data-testid="team-card"
                onClick={()=>setSelectedTeam(`${team.id}`)}
                className="cursor-pointer flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
                <img className="max-w-12" src={team.imgTeam} alt="Time" />
                {/* Time */}
                <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">{team.teamName}</h3>
                    {/* Capitão */}
                    <div className="flex gap-2">
                        <Image width={16} height={16} src="/icons/torneios/capitao.svg" alt="Capitão" />
                        <p className="text-sm text-gray-600">Cap: {team.capName}</p>
                    </div>
                    {/* Jogadores do time */}
                    <div className="flex gap-2">
                        <Image width={16} height={16} src="/icons/torneios/teams.svg" alt="Jogadores" />
                        <p className="text-sm text-gray-600">Jogadores: {team.players}</p>
                    </div>
                </div>
            </div>
        </>
    )
}