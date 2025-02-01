import SearchBar from "@/app/components/search-bar/SearchBar";
import CardTorneio from "@/app/components/torneios/CardTorneio";

// Ainda falta configurar as props para receber as informações e o roteamento
export default function ListTournament() {
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
                            <CardTorneio />
                            <CardTorneio />
                            <CardTorneio />
                        </div>
                    </div>

                    {/* Divisor */}
                    <hr/>

                    {/* Torneios próximos */}
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Torneios Próximos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <CardTorneio />
                            <CardTorneio />
                            <CardTorneio />
                        </div>
                    </div>                    
                </div>
            </div>
        </section>
    );
}
