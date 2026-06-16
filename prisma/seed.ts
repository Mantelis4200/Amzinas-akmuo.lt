import bcrypt from "bcryptjs";
import { db } from "../lib/db";

async function main() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const plainPassword = process.env.ADMIN_PASSWORD;

  if (!name || !email || !plainPassword) {
    throw new Error(
      "Missing required env vars: ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD"
    );
  }

  const password = await bcrypt.hash(plainPassword, 10);

  await db.user.upsert({
    where: { email },
    update: { password, name },
    create: { email, name, password },
  });

  console.log(`Admin user upserted: ${name} <${email}>`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
