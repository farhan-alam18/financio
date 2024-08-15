import { config } from "dotenv";
import { subDays } from "date-fns";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { categories, accounts, transactions } from "@/db/schema";

config({ path: ".env" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const SEED_USER_ID = "";
const SEED_CATEGORIES = [
  { id: "category_1", name: "Food", userId: SEED_USER_ID },
  { id: "category_2", name: "Groceries", userId: SEED_USER_ID },
  { id: "category_3", name: "Entertainment", userId: SEED_USER_ID },
  { id: "category_4", name: "Healthcare", userId: SEED_USER_ID },
  { id: "category_5", name: "Clothing", userId: SEED_USER_ID },
  { id: "category_6", name: "Rent", userId: SEED_USER_ID },
];
const SEED_ACCOUNTS = [
  { id: "account_1", name: "Current", userId: SEED_USER_ID },
  { id: "account_2", name: "Savings", userId: SEED_USER_ID },
  { id: "account_3", name: "Credit Card", userId: SEED_USER_ID },
];

const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, 90);

const SEED_TRANSACTIONS: (typeof transactions.$inferSelect)[] = [];

import { eachDayOfInterval, format } from "date-fns";
import { convertAmountToMiliunits } from "./utils";
import { error } from "console";

const generateRandomAmount = (category: typeof categories.$inferInsert) => {
  switch (category.name) {
    case "Food":
      return Math.random() * 2000 + 1000;

    case "Groceries":
      return Math.random() * 5000 + 2000;

    case "Entertainment":
      return Math.random() * 3000 + 1000;

    case "Healthcare":
      return Math.random() * 8000 + 2000;

    case "Clothing":
      return Math.random() * 3000 + 1000;

    case "Rent":
      return Math.random() * 30000 + 10000;

    default:
      return Math.random() * 500 + 100;
  }
};

const generateTransactionsForDay = (day: Date) => {
  const numTransactions = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numTransactions; i++) {
    const category =
      SEED_CATEGORIES[Math.floor(Math.random() * SEED_CATEGORIES.length)];
    const isExpense = Math.random() > 0.6;
    const amount = generateRandomAmount(category);
    const formattedAmount = convertAmountToMiliunits(
      isExpense ? -amount : amount
    );

    SEED_TRANSACTIONS.push({
      id: `transactions_${format(day, "yyyy-MM-dd")}_${i}`,
      accountId: SEED_ACCOUNTS[0].id,
      categoryId: category.id,
      date: day,
      amount: formattedAmount,
      payee: "Vendor",
      notes: "Random Transactions",
    });
  }
};

const generateTransactions = () => {
  const days = eachDayOfInterval({ start: defaultFrom, end: defaultTo });
  days.forEach((day) => generateTransactionsForDay(day));
};

generateTransactions();

const main = async () => {
  try {
    await db.delete(transactions).execute();
    await db.delete(accounts).execute();
    await db.delete(categories).execute();

    await db.insert(categories).values(SEED_CATEGORIES).execute();
    await db.insert(accounts).values(SEED_ACCOUNTS).execute();
    await db.insert(transactions).values(SEED_TRANSACTIONS).execute();
  } catch (eror) {
    console.error("Error during seeding : ", error);
    process.exit(1);
  }
};

main();
