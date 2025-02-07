// TournamentFactory
import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export const TournamentFactory = {
  tournament: Factory.extend({
    nome(i) {
      return `Torneio ${i + 1} - ${faker.lorem.words(3)}`;
    },
    imgTourn(){
      return faker.image.urlLoremFlickr()
    },
    dataInicio() {
      return faker.date.past().toISOString().split("T")[0].replace(/-/g, "/");
    },
    dataTermino() {
      return faker.date.future().toISOString().split("T")[0].replace(/-/g, "/");
    },
    descricao(){
      return faker.lorem.paragraph()
    },
    status() {
      const statuses = ["Em andamento", "Inscrições abertas", "Finalizado"];
      return faker.helpers.arrayElement(statuses);
    },
    regras() {
      return faker.lorem.sentence();
    },
    playersLimit() {
      return 12;
    },
    // Gerando times participantes
    timesParticipantes() {
      return [...Array(12)].map((_, i) => ({
        id: i+1,
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
        const score1 = faker.number.int({ min: 0, max: 5 });
        const score2 = faker.number.int({ min: 0, max: 5 });        
        const yellowCards1 = faker.number.int({ min: 0, max: 3 }); // Cartões amarelos para o time 1
        const yellowCards2 = faker.number.int({ min: 0, max: 3 }); // Cartões amarelos para o time 2
        const redCards1 = faker.number.int({ min: 0, max: 1 }); // Cartões vermelhos para o time 1
        const redCards2 = faker.number.int({ min: 0, max: 1 }); // Cartões vermelhos para o time 2
    
        // Atualizando a partida no time com gols, vitórias e estatísticas
        const isVictoryTeam1 = score1 > score2;
        const isVictoryTeam2 = score2 > score1;
    
        // Adicionando dados de vitória, gols e estatísticas para os times
        team1.partidas.push({
          vitoria: isVictoryTeam1,
          gols: score1,
          yellowCards: yellowCards1,
          redCards: redCards1,
          adversario: team2.teamName,
        });
        team2.partidas.push({
          vitoria: isVictoryTeam2,
          gols: score2,
          yellowCards: yellowCards2,
          redCards: redCards2,
          adversario: team1.teamName,
        });
    
        return {
          team1: {
            teamName: team1.teamName,
            imgTeam: team1.imgTeam,
            score: score1,
            yellowCards: yellowCards1,
            redCards: redCards1,
          },
          team2: {
            teamName: team2.teamName,
            imgTeam: team2.imgTeam,
            score: score2,
            yellowCards: yellowCards2,
            redCards: redCards2,
          },
          data: faker.date.soon().toISOString().split("T")[0].replace(/-/g, "/"),
          status: score1 !== null && score2 !== null ? "Finalizado" : "Em breve", // Exemplo de status
        };
      });
    
      return partidas;
    }    
  }),
};
