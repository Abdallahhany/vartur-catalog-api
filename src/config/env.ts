import dotenv from "dotenv";

// load env variables
dotenv.config();

export const env = {
    DATABASE_URL: process.env.DATABASE_URL as string,
    REDIS_URL: process.env.REDIS_URL as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000

};