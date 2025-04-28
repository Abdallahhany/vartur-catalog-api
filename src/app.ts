import Fastify from 'fastify'
import prisma from './plugins/prisma'
import jwt from './plugins/jwt'
import redis from './plugins/redis'
import authorize from './plugins/authorize'
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.route'
import productRoutes from './routes/product.route'
import 'fastify'
import { PrismaClient } from '@prisma/client'
import { Redis } from 'ioredis'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
    redis: Redis
    authenticate: any,
    checkAdmin: any 
  }  
}

const buildApp = () => {
  const fastify = Fastify({ logger: true })

  // Register plugins
  fastify.register(prisma);
  fastify.register(jwt);
  fastify.register(redis);
  fastify.register(authorize);

  fastify.register(swagger,{
    openapi:{
      info: {
        title: 'Vartur Catalog API',
        description: 'API documentation for the catalog project',
        version: '1.0.0',
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
        {
          url: 'https://api.example.com',
          description: 'Production server',
        }
      ],
    },
  });

  fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
  })

  // Register routes
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  });
  fastify.register(authRoutes, { prefix: '/api/auth' })
  fastify.register(categoryRoutes, { prefix: '/api/categories' })
  fastify.register(productRoutes, { prefix: '/api/products' })
  
  // Add a not found route
  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      success: false,
      message: 'Route not found',
    })
  })

  // Error handling
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.error(error) // Log full error for debugging

    const statusCode = (error as any).statusCode || 500
    const message = error.message || 'Internal Server Error'

    reply.status(statusCode).send({
      success: false,
      message,
    })
  })

  return fastify
}

export default buildApp
