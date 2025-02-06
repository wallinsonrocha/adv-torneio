// TournamentFactory
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
    // Gerando times participantes
    timesParticipantes() {
      return [...Array(12)].map(() => ({
        id: faker.string.uuid(),
        imgTeam: faker.image.avatar(),
        teamName: faker.company.name(),
        capName: faker.person.fullName(),
        players: 11,
        partidas: [],
      }));
    },
    // Gerando partidas e resultado
    partidas() {
      const teams = this.timesParticipantes;
      const partidas = [...Array(15)].map(() => {
        const team1 = teams[Math.floor(Math.random() * teams.length)];
        const team2 = teams[Math.floor(Math.random() * teams.length)];
        const score1 = Math.floor(Math.random() * 11);
        const score2 = Math.floor(Math.random() * 11);

        // Atualizando a partida no time com gols e vitória
        const isVictoryTeam1 = score1 > score2;
        const isVictoryTeam2 = score2 > score1;

        // Adicionando dados de vitória e gols
        team1.partidas.push({
          vitoria: isVictoryTeam1,
          gols: score1,
          adversario: team2.teamName,
        });
        team2.partidas.push({
          vitoria: isVictoryTeam2,
          gols: score2,
          adversario: team1.teamName,
        });

        return {
          id: faker.string.uuid(),
          team1: {
            teamName: team1.teamName,
            imgTeam: team1.imgTeam,
            score: score1,
          },
          team2: {
            teamName: team2.teamName,
            imgTeam: team2.imgTeam,
            score: score2,
          },
          data: faker.date.soon().toISOString().split("T")[0].replace(/-/g, "/"),
        };
      });

      return partidas;
    },
  }),
};
