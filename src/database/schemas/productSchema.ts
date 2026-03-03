import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const entry = sqliteTable("entries", {
  id: integer("id").primaryKey(),
  description: text("description").notNull(),
  categoryId: integer("category_id").references(() => category.id),
  date: text("date").notNull(),
  value: real("value").notNull(),
});

export const category = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").notNull(),
});
