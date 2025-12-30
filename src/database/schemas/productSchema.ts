import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const product = sqliteTable("products", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    categoryId: integer("category_id").references(() =>category.id)
})

export const category = sqliteTable("categories", {
    id: integer("id").primaryKey(),
    name: text("name").notNull(),
    color: text("color").notNull(),
})