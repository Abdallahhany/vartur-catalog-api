import { FastifyRequest, FastifyReply } from 'fastify';
import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdParamSchema,
} from '../schemas/category.schema';
import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
} from '../services/category.service';
import { AppError } from '../utils/app-error';

export async function createCategoryHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = createCategorySchema.safeParse(request.body)

  if (!parsed.success) {
    throw new AppError('Invalid request body', 400);
  }

  const category = await createCategoryService(request.server, parsed.data)
  return reply.status(201).send(category)
}

export async function getAllCategoriesHandler(request: FastifyRequest, reply: FastifyReply) {
  const categories = await getAllCategoriesService(request.server)
  return reply.send(categories)
}

export async function getCategoryByIdHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = categoryIdParamSchema.safeParse(request.params)

  if (!parsed.success) {
    throw new AppError('Invalid request parameters', 400);
  }

  const category = await getCategoryByIdService(request.server, parseInt(parsed.data.id))

  if (!category) {
    throw new AppError('Category not found', 404);
  }

  return reply.send(category)
}

export async function updateCategoryHandler(request: FastifyRequest, reply: FastifyReply) {
  const idParsed = categoryIdParamSchema.safeParse(request.params)
  const bodyParsed = updateCategorySchema.safeParse(request.body)

  if (!idParsed.success || !bodyParsed.success) {
    throw new AppError('Invalid request parameters or body', 400);
  }

  const updatedCategory = await updateCategoryService(
    request.server,
    parseInt(idParsed.data.id),
    bodyParsed.data
  )
  
  return reply.send(updatedCategory)
}

export async function deleteCategoryHandler(request: FastifyRequest, reply: FastifyReply) {
  const parsed = categoryIdParamSchema.safeParse(request.params)

  if (!parsed.success) {
    throw new AppError("Invalid request parameters", 400);
  }

  const deleted = await deleteCategoryService(request.server, parseInt(parsed.data.id))

  if (!deleted) {
    throw new AppError("Category not found", 404);
  }

  return reply.send({ message: 'Category deleted successfully' })
}
