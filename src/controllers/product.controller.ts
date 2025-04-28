import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createProductSchema,
  updateProductSchema,
  productIdParamSchema,
} from '../schemas/product.schema';
import {
  createProductService,
  getAllProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from '../services/product.service';
import { AppError } from '../utils/app-error';

export async function createProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = createProductSchema.safeParse(request.body)

  if (!parsed.success) {
    throw new AppError('Invalid request body', 400)
  }

  const product = await createProductService(request.server, parsed.data)
  return reply.status(201).send(product)
}

export async function getAllProductsHandler(request: FastifyRequest, reply: FastifyReply) {
  const products = await getAllProductsService(request.server)
  return reply.send(products)
}

export async function getProductByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = productIdParamSchema.safeParse(request.params)

  if (!parsed.success) {
    throw new AppError('Invalid request parameters', 400);
  }

  const product = await getProductByIdService(request.server, parseInt(parsed.data.id))

  if (!product) {
    return reply.status(404).send({ error: 'Product not found' });
  }

  return reply.send(product)
}

export async function updateProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const idParsed = productIdParamSchema.safeParse(request.params)
  const bodyParsed = updateProductSchema.safeParse(request.body)

  if (!idParsed.success || !bodyParsed.success) {
    throw new AppError('Invalid request parameters or body', 400)
  }

  const product = await updateProductService(
    request.server,
    parseInt(idParsed.data.id),
    bodyParsed.data
  )

  if (!product) {
    throw new AppError('Product not found', 404)
  }

  return reply.send(product)
}

export async function deleteProductHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = productIdParamSchema.safeParse(request.params)

  if (!parsed.success) {
    throw new AppError('Invalid request parameters', 400)
  }

  const deleted = await deleteProductService(request.server, parseInt(parsed.data.id))

  if (!deleted) {
    throw new AppError('Product not found', 404)
  }

  return reply.send({ message: 'Product deleted successfully' })
}
