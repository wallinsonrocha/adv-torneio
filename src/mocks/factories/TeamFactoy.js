import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";

export const TeamFactory = {
  team: Factory.extend({    
    imgTeam() {
      return faker.image.avatar();
    },
    teamName() {
      return faker.company.name();
    },
    capName() {
      return faker.person.fullName();
    },
    players() {
      return [...Array(11)].map(() => ({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
      }));
    },
    partidas() {
      return [...Array(faker.number.int({ min: 5, max: 15 }))].map(() => {
        const score = faker.number.int({ min: 0, max: 5 });
        const adversario = faker.company.name();
        return {
          vitoria: Math.random() > 0.5,
          gols: score,
          adversario,
        };
      });
    },
  }),
};
