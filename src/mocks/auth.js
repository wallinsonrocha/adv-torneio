import { Response } from "miragejs";

export const requireAuth = (schema, request) => {
  const authHeader = request.requestHeaders.Authorization;

  if (!authHeader) {
    return new Response(401, {}, { error: "Token não encontrado!" });
  }

  const tokenParts = authHeader.split("-");
  if (tokenParts.length !== 4 || tokenParts[0] !== "fake" || tokenParts[1] !== "token") {
    return new Response(403, {}, { error: "Token inválido!" });
  }

  const userId = tokenParts[2];
  const user = schema.db.users.find(userId);

  if (!user) {
    return new Response(403, {}, { error: "Usuário não autorizado!" });
  }

  return user;
};
