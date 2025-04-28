// fix TypeScript error for fastify-jwt
import fp from 'fastify-plugin'
import fjwt, { FastifyJWT } from '@fastify/jwt'
import { env } from '../config/env'

import { FastifyRequest, FastifyReply } from 'fastify'

export default fp(async (fastify) => {
  fastify.register(fjwt, {
    secret: env.JWT_SECRET
  })

  fastify.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })
})
