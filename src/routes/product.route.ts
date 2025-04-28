import { FastifyInstance } from "fastify";
import {
  createProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/product.controller";

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.register(async (authFastify) => {
    authFastify.addHook("preHandler", authFastify.authenticate);

    authFastify.post(
      "/",
      {
        preHandler: [authFastify.checkAdmin],
        schema: {
          description: "Create a new product",
          tags: ["Product"],
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              price: { type: "number" },
              categoryId: { type: "number" },
            },
            required: ["name", "price", "categoryId"],
          },
          headers: {
            type: "object",
            properties: {
              authorization: { type: "string" },
            },
            required: ["authorization"],
          },
          response: {
            201: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                price: { type: "number" },
                categoryId: { type: "number" },
              },
            },
            400: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      createProductHandler
    );
    authFastify.put(
      "/:id",
      {
        preHandler: [authFastify.checkAdmin],
        schema: {
          description: "Update a product",
          tags: ["Product"],
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              price: { type: "number" },
              categoryId: { type: "number" },
            },
            required: [],
          },
          headers: {
            type: "object",
            properties: {
              authorization: { type: "string" },
            },
            required: ["authorization"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                price: { type: "number" },
                categoryId: { type: "number" },
              },
            },
            400: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      updateProductHandler
    );
    authFastify.delete(
      "/:id",
      {
        preHandler: [authFastify.checkAdmin],
        schema: {
          description: "Delete a product",
          tags: ["Product"],
          params: {
            type: "object",
            properties: {
              id: { type: "number" },
            },
            required: ["id"],
          },
          headers: {
            type: "object",
            properties: {
              authorization: { type: "string" },
            },
            required: ["authorization"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            404: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      deleteProductHandler
    );

    authFastify.get(
      "/",
      {
        schema: {
          description: "Get all products",
          tags: ["Product"],
          headers: {
            type: "object",
            properties: {
              authorization: { type: "string" },
            },
            required: ["authorization"],
          },
          response: {
            200: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "number" },
                  name: { type: "string" },
                  price: { type: "number" },
                  categoryId: { type: "number" },
                },
              },
            },
          },
        },
      },
      getAllProductsHandler
    );
    authFastify.get(
      "/:id",
      {
        schema: {
          description: "Get a product by ID",
          tags: ["Product"],
          params: {
            type: "object",
            properties: {
              id: { type: "number" },
            },
            required: ["id"],
          },
          headers: {
            type: "object",
            properties: {
              authorization: { type: "string" },
            },
            required: ["authorization"],
          },
          response: {
            200: {
              type: "object",
              properties: {
                id: { type: "number" },
                name: { type: "string" },
                price: { type: "number" },
                categoryId: { type: "number" },
              },
            },
            404: {
              type: "object",
              properties: {
                success: { type: "boolean" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      getProductByIdHandler
    );
  });
}
