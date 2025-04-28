import { FastifyInstance } from "fastify";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../schemas/category.schema";
import { AppError } from "../utils/app-error";


export async function createCategoryService(
  fastify: FastifyInstance,
  input: CreateCategoryInput
) {
  // Check if category name already exists
  const existingCategory = await fastify.prisma.category.findFirst({
    where: { name: input.name },
  });

  if (existingCategory) {
    throw new AppError("Category name already exists", 400);
  }

  // Create the new category
  return fastify.prisma.category.create({
    data: {
      name: input.name,
      parentId: input.parentId ?? null,
    },
  });
}

export async function getAllCategoriesService(fastify: FastifyInstance) {
  return fastify.prisma.category.findMany({
    include: {
      products: true,
    },
  });
}

export async function getCategoryByIdService(
  fastify: FastifyInstance,
  id: number
) {
  return fastify.prisma.category.findUnique({
    where: { id },
    include: {
      products: true,
    },
  });
}

export async function updateCategoryService(
  fastify: FastifyInstance,
  id: number,
  data: UpdateCategoryInput
) {

  // Check if category exists
  const category = await fastify.prisma.category.findUnique({
    where: { id },
  });
  if (!category) {
    throw new AppError("Category not found", 404);
  }

  // Check if category name already exists
  const existingCategory = await fastify.prisma.category.findFirst({
    where: { name: data.name },
  });
  if (existingCategory && existingCategory.id !== id) {
    throw new AppError("Category name already exists", 400);
  }

  // Update the category
  return await fastify.prisma.category.update({
    where: { id },
    data,
  });
}

export async function deleteCategoryService(
  fastify: FastifyInstance,
  id: number
) {
    // Check if category exists
    const category = await fastify.prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new AppError("Category not found", 404);
    }
    // Check if category has products
    const products = await fastify.prisma.product.findMany({
      where: { categoryId: id },
    });
    if (products.length > 0) {
      throw new AppError("Category has products", 400);
    }

    // Delete the category
    return await fastify.prisma.category.delete({
      where: { id },
    });

}
