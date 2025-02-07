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

    server.get("/times", (schema, request) => {
        const token = request.requestHeaders.Authorization;
        if (!token) {
            return new Response(401, {}, { error: "Não autorizado. Token ausente." });
        }

        return schema.db.teams;
    });

    server.get("/times/:id", (schema, request) => {
        const token = request.requestHeaders.Authorization;
        if (!token) {
            return new Response(401, {}, { error: "Não autorizado. Token ausente." });
        }

        let id = request.params.id;        
        let team = schema.db.teams.find(id);

        if (!team) {
            return new Response(404, {}, { error: "Time não encontrado." });
        }

        return team;
    });
}