export default function InfoTournament() {
    return (
        <section>
            {/* Infos básicas */}
            <div>
                <p>Nome</p>
                <p>Quantidade de Times</p>
                <p>Duração</p>
                <p>Status</p>
                <p>Regras</p>
            </div>

            {/* Times inscritos */}
            <div>                
                {/* Time */}
                <div>
                    <p>Imagem</p>
                    <p>nome</p>
                    <p>Capitão</p>
                    <p>Quantidade</p>
                </div>
            </div>

            {/* Partidas */}
            <div>
                {/* É interessante usar react route aqui para navegar entre elas */}
                {/* Partida N° */}
                <div>
                    {/* Partidas */}
                    <div>
                        {/* Partida */}
                        <div>
                            <p>Data</p>
                            <div>
                                {/* Time 1 */}
                                <div>
                                    {/* Time */}
                                </div>
                                {/* Time 2 */}
                                <div>
                                    {/* Time */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}