import { FastifyInstance } from "fastify";
import { loginHandler, registerHandler } from "../controllers/auth.controller";

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/login",
    {
      schema: {
        description: "Login a user and get JWT token",
        tags: ["Auth"],
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
          },
          required: ["username", "password"],
        },
        response: {
          200: {
            type: "object",
            properties: {
              token: { type: "string" },
            },
          },
          400: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
          401: {
            type: "object",
            properties: {
              success: { type: "boolean" },
              message: { type: "string" },
            },
          },
        },
      },
    },
    loginHandler
  );
  fastify.post(
    "/register",
    {
      schema: {
        description: "Register a new user",
        tags: ["Auth"],
        body: {
          type: "object",
          properties: {
            username: { type: "string" },
            password: { type: "string" },
            confirmPassword: { type: "string" },
          },
          required: ["username", "password", "confirmPassword"],
        },
        response: {
          201: {
            type: "object",
            properties: {
              token: { type: "string" },
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
    registerHandler
  );
}
