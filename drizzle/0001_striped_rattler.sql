CREATE TABLE `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `products` ADD `category_id` integer REFERENCES categories(id);