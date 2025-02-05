import { createServer, Model, Factory } from "miragejs";
import { TournamentFactory } from '@/mocks/factories';
import { authRoutes } from "./routes/authRoutes";
import { userRoutes } from "./routes/userRoutes";

export function makeServer({environment="development"}={}) {
  let server = createServer({
    environment,

    models: {
      tournament: Model,
    },

    factories: {
      ...TournamentFactory
    },

    seeds(server) {
      server.createList("tournament", 20);
      server.db.loadData({
        users: [
          { id: "1", role: "user", email: "user@email.com", password: "@Senha123" },
          { id: "2", role: "captain", email: "captain@email.com", password: "654321" },
          { id: "3", role: "admin", email: "admin@email.com", password: "admin123" },
        ],        
      })
    },

    routes() {
      this.namespace = "api";    
      this.urlPrefix = process.env.NEXT_PUBLIC_BACKEND_URL || ""; 

      authRoutes(this);
      userRoutes(this);
    },
  });
  return server;
}
