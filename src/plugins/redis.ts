import fp from 'fastify-plugin'
import { redis } from '../config/redis'

export default fp(async (fastify) => {
    fastify.decorate('redis', redis)
  });