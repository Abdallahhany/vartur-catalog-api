import { FastifyInstance } from "fastify";
import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";

export async function createProductService(
  fastify: FastifyInstance,
  input: CreateProductInput
) {
  // check if category exists before creating

  const existingCategory = await fastify.prisma.category.findUnique({
    where: { id: input.categoryId },
  });

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  return fastify.prisma.product.create({
    data: {
      name: input.name,
      price: input.price,
      categoryId: input.categoryId,
    },
  });
}

export async function getAllProductsService(fastify: FastifyInstance) {
  return fastify.prisma.product.findMany({
    include: {
      category: true,
    },
  });
}

export async function getProductByIdService(
  fastify: FastifyInstance,
  id: number
) {
  return fastify.prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

export async function updateProductService(
  fastify: FastifyInstance,
  id: number,
  data: UpdateProductInput
) {
  try {
    return await fastify.prisma.product.update({
      where: { id },
      data,
    });
  } catch (error) {
    return null;
  }
}

export async function deleteProductService(
  fastify: FastifyInstance,
  id: number
) {
  try {
    await fastify.prisma.product.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    return false;
  }
}
