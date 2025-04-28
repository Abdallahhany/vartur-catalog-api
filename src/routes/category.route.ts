import { FastifyInstance } from "fastify";
import {
  createCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
  deleteCategoryHandler,
} from "../controllers/category.controller";

export default async function categoryRoutes(fastify: FastifyInstance) {
  // Protected by authentication
  fastify.register(async (authFastify) => {
    authFastify.addHook("preHandler", authFastify.authenticate);

    authFastify.post(
      "/",
      { preHandler: authFastify.checkAdmin,
        schema: {
          description: "Create a new category",
          tags: ["Category"],
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              parentId: { type: "number" },
            },
            required: ["name"],
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
                parentId: { type: "number" },
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
        }
       },
      createCategoryHandler
    );
    authFastify.get("/",
      {
        schema: {
          description: "Get all categories",
          tags: ["Category"],
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
                  parentId: { type: "number" },
                },
              },
            },
          },
        },
      },
       getAllCategoriesHandler);
    authFastify.get("/:id",
      {
        schema: {
          description: "Get a category by ID",
          tags: ["Category"],
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
                parentId: { type: "number" },
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
       getCategoryByIdHandler);
    authFastify.put(
      "/:id",
      { preHandler: authFastify.checkAdmin,
        schema: {
          description: "Update a category",
          tags: ["Category"],
          params: {
            type: "object",
            properties: {
              id: { type: "number" },
            },
            required: ["id"],
          },
          body: {
            type: "object",
            properties: {
              name: { type: "string" },
              parentId: { type: "number" },
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
                parentId: { type: "number" },
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
        }
       },
      updateCategoryHandler
    );
    authFastify.delete(
      "/:id",
      { preHandler: authFastify.checkAdmin,
        schema: {
          description: "Delete a category",
          tags: ["Category"],
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
        }
       },
      deleteCategoryHandler
    );
  });
}
