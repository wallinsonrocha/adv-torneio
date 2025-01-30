import Image from "next/image";
import Link from "next/link";

export default function CardTorneio() {
    return (
        // Container card
        <div className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
            {/* Imagem e status do torneio */}
            <div className="w-full min-h-60 relative">
                <p className="absolute font-bold text-xs p-1 px-2 rounded-md bg-green-300 top-3 right-3">Inscrições abertas até 28/04</p>
                <Image fill className="object-cover" src="next.svg" alt="Card" />
            </div>
            {/* Informações do torneio */}
            <div className="p-5 grid gap-2">
                {/* Título */}
                <h5 className="font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
                {/* Descrição */}
                <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                <hr className="mt-4" />
                {/* Informações */}
                <div className="flex w-full justify-between">
                    <p>Times: <span className="font-bold">0/12</span></p>
                    <p className="font-bold">01/05 - 20/05</p>
                </div>
                <Link href="#" className="flex w-fit items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <p>Saiba mais</p>
                    <Image width={16} height={16} src='icons/right-arrow.svg' alt="Icone seta direita" />
                </Link>
            </div>
        </div>
    )
}