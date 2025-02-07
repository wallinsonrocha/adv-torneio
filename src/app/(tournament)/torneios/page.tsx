"use client"

import { useEffect, useState } from "react";
import SearchBar from "@/app/components/search-bar/SearchBar";
import CardTorneio from "@/app/components/torneios/CardTorneio";

export default function ListTournament() {
    const [torneios, setTorneios] = useState([]);

    useEffect(() => {
        async function fetchTorneios() {
            const urlEnv = process.env.NEXT_PUBLIC_BACKEND_URL;
            try {
                const response = await fetch(`${urlEnv}/api/torneios`);
                const data = await response.json();
                setTorneios(data);
            } catch (error) {
                console.error("Erro ao buscar torneios:", error);
            }
        }

        fetchTorneios();
    }, []);

    return (
        <section className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="container max-w-screen-xl bg-white shadow-md rounded-2xl p-6">
                {/* Barra de busca */}
                <SearchBar />

                {/* Torneios */}
                <div className="mt-6 space-y-8">
                    {/* Torneios abertos */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Torneios Abertos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {torneios
                                .filter((torneio:any) => torneio.status === "Inscrições abertas")
                                .map((torneio:any) => (
                                    <CardTorneio key={torneio.id} torneio={torneio} />
                                ))}
                        </div>
                    </div>

                    {/* Divisor */}
                    <hr />

                    {/* Torneios em andamento */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Torneios em andamento</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {torneios
                                .filter((torneio:any) => torneio.status === "Em andamento")
                                .map((torneio:any) => (
                                    <CardTorneio key={torneio.id} torneio={torneio} />
                                ))}
                        </div>
                    </div>

                    {/* Torneios finalizados */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Torneios finalizados</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {torneios
                                .filter((torneio:any) => torneio.status === "Finalizado")
                                .map((torneio:any) => (
                                    <CardTorneio key={torneio.id} torneio={torneio} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
