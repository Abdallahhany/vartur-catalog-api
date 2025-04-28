import fp from "fastify-plugin";
import { FastifyRequest, FastifyReply } from "fastify";

export default fp(async (fastify) => {
  fastify.decorate(
    "checkAdmin",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const user = request.user as { role: string };

      if (!user || user.role !== "admin") {
        return reply
          .status(403)
          .send({ success: false, message: "Forbidden: Admins only" });
      }
    }
  );
});
