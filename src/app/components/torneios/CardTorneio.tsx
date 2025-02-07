import Image from "next/image";
import Link from "next/link";

// Definindo as interfaces de tipos das props
interface Torneio {
    id: string;
    nome: string;
    imgTourn: string;
    status: string;
    descricao: string;
    dataInscricao: string;
    dataInicio: string;
    dataTermino: string;
    timesParticipantes: any;
    playersLimit: number;
}

interface CardTorneioProps {
    torneio: Torneio;
}

export default function CardTorneio({ torneio }: CardTorneioProps) {
    return (
        <div className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            {/* Imagem e status do torneio */}
            <div className="w-full min-h-60 relative">
                <p
                    className={`absolute z-10 font-bold text-xs p-1 px-2 rounded-md top-3 right-3 ${torneio.status === "Em andamento"
                            ? "bg-yellow-300 text-yellow-900"
                            : torneio.status === "Inscrições abertas"
                                ? "bg-green-300 text-green-900"
                                : "bg-red-300 text-red-900"
                        }`}
                >
                    {torneio.status}
                </p>
                <img className="object-cover w-full max-h-60" src={torneio.imgTourn} alt="Imagem do torneio" />
            </div>

            {/* Informações do torneio */}
            <div className="p-5 grid gap-2">
                {/* Título */}
                <h5 className="font-bold tracking-tight text-gray-900">{torneio.nome}</h5>

                {/* Descrição */}
                <p className="font-normal text-gray-700">{torneio.descricao}</p>

                <hr className="mt-4" />

                {/* Informações */}
                <div className="flex w-full justify-between">
                    {/* Times */}
                    <div className="flex gap-2">
                        <Image src='/icons/torneios/teams.svg' width={16} height={16} alt="Ícone de time" />
                        <p>Times: <span className="font-bold">{torneio.timesParticipantes.length}/{torneio.playersLimit}</span></p>
                    </div>
                    {/* Duração */}
                    <div className="flex gap-2">
                        <Image src='/icons/torneios/calendar.svg' width={16} height={16} alt="Ícone de calendário" />
                        <p className="font-bold">{torneio.dataInicio} - {torneio.dataTermino}</p>
                    </div>
                </div>

                <Link href={`/torneios/${torneio.id}`} className="flex w-fit items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <p>Saiba mais</p>
                    <Image width={16} height={16} src='/icons/right-arrow.svg' alt="Ícone seta direita" />
                </Link>
            </div>
        </div>
    );
}
