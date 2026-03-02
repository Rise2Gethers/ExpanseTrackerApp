import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const entry = sqliteTable("entries", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  categoryId: integer("category_id").references(() => category.id),
  date: text("date").notNull(),
});

export const category = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});
