import { createServer, Model, Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export function makeServer({ environment = "development" } = {}) {
  let server = createServer({
    environment,

    models: {
      tournament: Model,
    },

    factories: {
      tournament: Factory.extend({
        id(i) {
          return i + 1;
        },
        nome(i) {
          return `Torneio ${i + 1} - ${faker.lorem.words(3)}`;
        },
        dataInicio() {
          return faker.date.past().toISOString().split("T")[0];
        },
        dataTermino() {
          return faker.date.future().toISOString().split("T")[0];
        },
        status() {
          const statuses = ["Em andamento", "Inscrições abertas", "Finalizada"];
          const randomIndex = Math.floor(Math.random() * statuses.length);
          return statuses[randomIndex];
        },
        regras() {
          return faker.lorem.sentence();
        },
        playersLimit() {
          return 12
        },
        timesParticipantes() {
          return [...Array(12)].map(() => ({
            id: faker.string.uuid(),
            imgTeam: faker.image.avatar(),
            teamName: faker.company.name(),
            capName: faker.person.fullName(),
            players: 11
          }));
        },
        partidas() {
          const teams = this.timesParticipantes;
          return teams.map((_, i) => ({
            id: faker.string.uuid(),
            team1: {
              teamName: teams[i]?.teamName,
              imgTeam: teams[i]?.imgTeam
            },
            team2: {
              teamName: teams[(i + 1) % teams.length]?.teamName,
              imgTeam: teams[(i + 1) % teams.length]?.imgTeam,
            },
            data: faker.date.soon().toISOString(),
          }));
        },
      }),
    },

    seeds(server) {
      server.createList("tournament", 20);
    },

    routes() {
      this.namespace = "api";

      this.get("/torneios", (schema) => {
        console.log("Isso que tem no Schema: ", schema.tournaments.all())
        return schema.tournaments.all();
      });

      this.get("/torneios/:id", (schema, request) => {
        let id = Number(request.params.id);
        let tournament = schema.tournaments.find(id);

        if (!tournament) {
          return new Response(404, {}, { error: "Torneio não encontrado." });
        }

        return tournament.attrs;
      });
    },
  });
  return server;
}
