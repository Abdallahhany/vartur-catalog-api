import { FastifyRequest, FastifyReply } from "fastify";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { comparePassword, hashPassword } from "../utils/hash";
import { generateToken } from "../utils/token";
import { AppError } from "../utils/app-error";

export async function loginHandler(
  request: FastifyRequest,
  replay: FastifyReply
) {
  // Validate the request body
  const parsedBody = loginSchema.safeParse(request.body);
  if (!parsedBody.success) {
    throw new AppError("Invalid request body", 400);
  }

  const { username, password } = parsedBody.data;

  // Check if the user exists
  const user = await request.server.prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new AppError("Invalid username or password", 401);
  }

  // Compare the password
  const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        throw new AppError("Invalid username or password", 401);
    }

    // Generate a JWT token
    const token = generateToken(request.server, { 
        userId: user.id,
        username: user.username,
        role: user.role,
     });

    // save the token in redis
    await request.server.redis.set(`token:${user.id}`, token, 'EX', 60 * 60 * 1) // 1 hour

    // Return the token
    return replay.status(200).send({
        token,
    });
}

export async function registerHandler(
  request: FastifyRequest,
  replay: FastifyReply
) {
  // Validate the request body
  const parsedBody = registerSchema.safeParse(request.body);
  if (!parsedBody.success) {
    throw new AppError("Invalid request body", 400);
  }

  const { username, password, confirmPassword } = parsedBody.data;

  // Check if the password and confirm password match
  if (password !== confirmPassword) {
    throw new AppError("Passwords do not match", 400);
  }

  // Check if the user already exists
  const existingUser = await request.server.prisma.user.findUnique({
    where: { username },
  });

  if (existingUser) {
    throw new AppError("User already exists", 400);
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create the user
  const user = await request.server.prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      role: "user", 
    },
  });

  // Generate a JWT token
  const token = generateToken(request.server, { 
      userId: user.id,
      username: user.username,
      role: user.role,
   });

   // save the token in redis
   await request.server.redis.set(`token:${user.id}`, token, 'EX', 60 * 60 * 1) // 1 hour

   // Return the token
   return replay.status(201).send({
       token,
   });
}
