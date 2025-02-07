import { createServer, Model, Factory } from "miragejs";
import {TournamentFactory} from './factories/TournamentFactory'
import {TeamFactory} from './factories/TeamFactoy'
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";

export function makeServer({environment="development"}={}) {
  let server = createServer({
    environment,

    models: {
      teams: Model,
      tournaments: Model,
    },

    factories: {
      ...TeamFactory,
      ...TournamentFactory,
    },

    seeds(server) {
      server.createList("tournament", 20);
      server.createList("team", 40);
      server.db.loadData({
        users: [
          { id: "1", role: "user", email: "user@email.com", password: "@Senha123" },
          { id: "2", role: "captain", email: "captain@email.com", password: "@Senha123" },
          { id: "3", role: "admin", email: "admin@email.com", password: "@Senha123" },
        ],        
      })
    },

    routes() {
      this.namespace = "api";    
      // É muito importante para executar testes
      this.urlPrefix = process.env.NEXT_PUBLIC_BACKEND_URL || ""; 

      authRoutes(this);
      userRoutes(this);
    },
  });
  return server;
}
