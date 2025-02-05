import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export const TournamentFactory = {
  tournament: Factory.extend({
    nome(i) {
      return `Torneio ${i + 1} - ${faker.lorem.words(3)}`;
    },
    dataInicio() {
      return faker.date.past().toISOString().split("T")[0].replace(/-/g, "/");
    },
    dataTermino() {
      return faker.date.future().toISOString().split("T")[0].replace(/-/g, "/");
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
      return 12;
    },
    timesParticipantes() {
      return [...Array(12)].map(() => ({
        id: faker.string.uuid(),
        imgTeam: faker.image.avatar(),
        teamName: faker.company.name(),
        capName: faker.person.fullName(),
        players: 11,
      }));
    },
    partidas() {
      const teams = this.timesParticipantes;
      return teams.map((_, i) => ({
        id: faker.string.uuid(),
        team1: {
          teamName: teams[i]?.teamName,
          imgTeam: teams[i]?.imgTeam,
          score: Math.floor(Math.random() * 11),
        },
        team2: {
          teamName: teams[(i + 1) % teams.length]?.teamName,
          imgTeam: teams[(i + 1) % teams.length]?.imgTeam,
          score: Math.floor(Math.random() * 11),
        },
        data: faker.date.soon().toISOString().split("T")[0].replace(/-/g, "/"),
      }));
    },
  }),
};
