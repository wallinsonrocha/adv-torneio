// import { Response } from "miragejs";
// import { requireAuth } from "../authMiddleware";

// export function adminRoutes(server) {
//     server.get("/admin/dashboard", (schema, request) => {
//         const user = requireAuth(schema, request);
//         if (user instanceof Response) return user;

//         if (user.role !== "admin") {
//             return new Response(403, {}, { error: "Acesso negado! Apenas administradores podem acessar." });
//         }

//         return { message: "Bem-vindo ao painel de admin!", user };
//     });
// }
