import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { Role } from "../src/generated/prisma/enums";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  const admin = await prisma.user.upsert({
    where:  { email: "admin@todoapp.com" },
    update: {},
    create: {
      email:         "admin@todoapp.com",
      password:      hashedPassword,
      name:          "Super Admin",
      role:          Role.ADMIN,
      emailVerified: new Date(), // skip email verification for seeded admin
    },
  });

  console.log("✓ Admin seeded:", admin.email);
  console.log("  Password: Admin@123");
}

main()
  .catch((e) => { console.error("✗ Seed failed:", e); process.exit(1); })
  .finally(() => prisma.$disconnect());
