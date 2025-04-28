import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
    // Check if admin user already exists
    const existingAdmin = await prisma.user.findUnique({
        where: { username: "admin" },
    });
    if (existingAdmin) {
        console.log("Admin user already exists. Skipping creation.");
        return;
    }
  const hashedPassword = await bcrypt.hash("admin", 10);

  await prisma.user.create({
    data: {
      username: "admin",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
