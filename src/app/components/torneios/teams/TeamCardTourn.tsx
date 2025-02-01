import Image from "next/image";

interface TeamCardProp {
    props: {
        teamName: string,
        capName: string,
        players: number,
        imgTeam: string
    }
}

export default function TeamCardTourn({ props }: TeamCardProp) {
    return (
        <div className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md">
            <img className="max-w-12" src={props.imgTeam} alt="Time" />
            {/* Time */}
            <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{props.teamName}</h3>
                {/* Capitão */}
                <div className="flex gap-2">
                    <Image width={16} height={16} src="/icons/torneios/capitao.svg" alt="Capitão" />
                    <p className="text-sm text-gray-600">Cap: {props.capName}</p>
                </div>
                {/* Jogadores do time */}
                <div className="flex gap-2">
                    <Image width={16} height={16} src="/icons/torneios/teams.svg" alt="Jogadores" />
                    <p className="text-sm text-gray-600">Jogadores: {props.players}</p>
                </div>
            </div>
        </div>
    )
}