import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js";
import { env } from "../env/index.js";

const connectionString = process.env.DATABASE_URL!;
const schema = new URL(connectionString).searchParams.get("schema") ?? "public";

const pool = new Pool({
  connectionString,
  options: `-c search_path="${schema}"`,
});

const adapter = new PrismaPg(pool, { schema });

export const prisma = new PrismaClient({
  adapter,
  log: env.NODE_ENV === "dev" ? ["query"] : [],
});