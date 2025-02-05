export function userRoutes(server) {
    server.get("/torneios", (schema) => {
        return schema.db.tournaments;
    });

    server.get("/torneios/:id", (schema, request) => {
        let id = request.params.id;
        let tournament = schema.db.tournaments.find(id);

        if (!tournament) {
            return new Response(404, {}, { error: "Torneio não encontrado." });
        }

        return tournament;
    });
}
