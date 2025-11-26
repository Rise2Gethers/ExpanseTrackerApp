import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/database/*',
	out: './drizzle',
    dialect: 'sqlite',
	driver: 'expo',
});
