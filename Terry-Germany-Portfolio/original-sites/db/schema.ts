import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const portfolioDocuments = sqliteTable("portfolio_documents", {
  name: text("name").primaryKey(),
  content: text("content").notNull(),
  revision: integer("revision").notNull().default(0),
  updatedAt: text("updated_at").notNull(),
});
