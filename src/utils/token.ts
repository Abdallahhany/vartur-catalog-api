import { FastifyInstance } from "fastify";

export function generateToken(
  fastify: FastifyInstance,
  payload: object
): string {
  return fastify.jwt.sign(payload, {
    expiresIn: "1h", // Token expiration time
  });
}

export async function verifyToken(
  fastify: FastifyInstance,
  token: string
): Promise<any> {
  return fastify.jwt.verify(token);
}
