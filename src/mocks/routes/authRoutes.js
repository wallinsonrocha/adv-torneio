import { Response } from "miragejs";

export function authRoutes(server) {
  server.post("/auth/login", (schema, request) => {
    const { email, password } = JSON.parse(request.requestBody);
    const user = schema.db.users.findBy({ email });

    if (!user) {
      return new Response(404, {}, {
        error: "Este e-mail ainda não está cadastrado. Que tal criar uma conta?"
      });
    }

    if (user.password !== password) {
      return new Response(401, {}, { error: "Senha incorreta. Tente novamente!" });
    }

    const fakeToken = `fake-token-${user.id}-${user.role}`;
    return { token: fakeToken, user: { id: user.id, role: user.role, email: user.email } };
  });

  server.post("/auth/register", (schema, request) => {
    const { email } = JSON.parse(request.requestBody);
    const user = schema.db.users.findBy({ email });

    if (user) {
      return new Response(404, {}, {
        error: "Este e-mail já possui uma conta. Faça o login para jogar conosco!"
      });
    }

    return new Response(200);
  });

  server.get("/user/role", (schema, request) => {
    const token = request.requestHeaders["Authorization"];
    if (!token) {
        return new Response(401, {}, { message: "Token não encontrado." });
    }


    // Recupera o token
    const tokenValue = token.split(" ")[1]; // 'Bearer <token>'
    const [ , , userId, role] = tokenValue.split("-");

    // Verifica se o usuário existe no banco de dados simulado
    const user = schema.db.users.find(userId);
    if (!user || !role) {
        return new Response(401, {}, { message: "Token inválido ou usuário não encontrado." });
    }

    // Retorna o papel do usuário
    return { role };
});


  server.get("/auth/profile", (schema, request) => {
    const user = requireAuth(schema, request);
    if (user instanceof Response) return user;

    return { id: user.id, role: user.role, email: user.email };
  });
}
