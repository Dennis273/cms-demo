import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Create plans_page main table first
  await db.run(sql`CREATE TABLE \`plans_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_og_image_id\` integer,
  	\`seo_canonical_u_r_l\` text,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`plans_page_seo_seo_og_image_idx\` ON \`plans_page\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`plans_page_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plans_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`plans_page_locales_locale_parent_id_unique\` ON \`plans_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  // Create plans_page_seo_faq after plans_page exists
  await db.run(sql`CREATE TABLE \`plans_page_seo_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plans_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`plans_page_seo_faq_order_idx\` ON \`plans_page_seo_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`plans_page_seo_faq_parent_id_idx\` ON \`plans_page_seo_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`plans_page_seo_faq_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`plans_page_seo_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`plans_page_seo_faq_locales_locale_parent_id_unique\` ON \`plans_page_seo_faq_locales\` (\`_locale\`,\`_parent_id\`);`)

  // Create docs_page main table first
  await db.run(sql`CREATE TABLE \`docs_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_og_image_id\` integer,
  	\`seo_canonical_u_r_l\` text,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`docs_page_seo_seo_og_image_idx\` ON \`docs_page\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`docs_page_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`docs_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`docs_page_locales_locale_parent_id_unique\` ON \`docs_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  // Create docs_page_seo_faq after docs_page exists
  await db.run(sql`CREATE TABLE \`docs_page_seo_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`docs_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`docs_page_seo_faq_order_idx\` ON \`docs_page_seo_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`docs_page_seo_faq_parent_id_idx\` ON \`docs_page_seo_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`docs_page_seo_faq_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`docs_page_seo_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`docs_page_seo_faq_locales_locale_parent_id_unique\` ON \`docs_page_seo_faq_locales\` (\`_locale\`,\`_parent_id\`);`)

  // Create showcase_page main table first
  await db.run(sql`CREATE TABLE \`showcase_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`seo_og_image_id\` integer,
  	\`seo_canonical_u_r_l\` text,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_og_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`showcase_page_seo_seo_og_image_idx\` ON \`showcase_page\` (\`seo_og_image_id\`);`)
  await db.run(sql`CREATE TABLE \`showcase_page_locales\` (
  	\`title\` text NOT NULL,
  	\`subtitle\` text,
  	\`seo_meta_title\` text,
  	\`seo_meta_description\` text,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`showcase_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`showcase_page_locales_locale_parent_id_unique\` ON \`showcase_page_locales\` (\`_locale\`,\`_parent_id\`);`)
  // Create showcase_page_seo_faq after showcase_page exists
  await db.run(sql`CREATE TABLE \`showcase_page_seo_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`showcase_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`showcase_page_seo_faq_order_idx\` ON \`showcase_page_seo_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`showcase_page_seo_faq_parent_id_idx\` ON \`showcase_page_seo_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`showcase_page_seo_faq_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`showcase_page_seo_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`showcase_page_seo_faq_locales_locale_parent_id_unique\` ON \`showcase_page_seo_faq_locales\` (\`_locale\`,\`_parent_id\`);`)

  // Alter existing tables
  await db.run(sql`ALTER TABLE \`docs_locales\` ADD \`seo_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`docs_locales\` ADD \`seo_meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`showcases_locales\` ADD \`seo_meta_title\` text;`)
  await db.run(sql`ALTER TABLE \`showcases_locales\` ADD \`seo_meta_description\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`seo_og_image_id\` integer REFERENCES media(id);`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`seo_canonical_u_r_l\` text;`)
  await db.run(sql`ALTER TABLE \`home_page\` ADD \`seo_no_index\` integer DEFAULT false;`)
  await db.run(sql`CREATE INDEX \`home_page_seo_seo_og_image_idx\` ON \`home_page\` (\`seo_og_image_id\`);`)

  // Create home_page_seo_faq tables (home_page already exists)
  await db.run(sql`CREATE TABLE \`home_page_seo_faq\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page_seo_faq_order_idx\` ON \`home_page_seo_faq\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`home_page_seo_faq_parent_id_idx\` ON \`home_page_seo_faq\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`home_page_seo_faq_locales\` (
  	\`question\` text NOT NULL,
  	\`answer\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`_locale\` text NOT NULL,
  	\`_parent_id\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`home_page_seo_faq\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`home_page_seo_faq_locales_locale_parent_id_unique\` ON \`home_page_seo_faq_locales\` (\`_locale\`,\`_parent_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_page_seo_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`home_page_seo_faq\`;`)
  await db.run(sql`DROP TABLE \`plans_page_seo_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`plans_page_seo_faq\`;`)
  await db.run(sql`DROP TABLE \`plans_page_locales\`;`)
  await db.run(sql`DROP TABLE \`plans_page\`;`)
  await db.run(sql`DROP TABLE \`docs_page_seo_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`docs_page_seo_faq\`;`)
  await db.run(sql`DROP TABLE \`docs_page_locales\`;`)
  await db.run(sql`DROP TABLE \`docs_page\`;`)
  await db.run(sql`DROP TABLE \`showcase_page_seo_faq_locales\`;`)
  await db.run(sql`DROP TABLE \`showcase_page_seo_faq\`;`)
  await db.run(sql`DROP TABLE \`showcase_page_locales\`;`)
  await db.run(sql`DROP TABLE \`showcase_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_background_image_id\` integer,
  	\`hero_primary_c_t_a_link\` text,
  	\`hero_secondary_c_t_a_link\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_background_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`INSERT INTO \`__new_home_page\`("id", "hero_background_image_id", "hero_primary_c_t_a_link", "hero_secondary_c_t_a_link", "updated_at", "created_at") SELECT "id", "hero_background_image_id", "hero_primary_c_t_a_link", "hero_secondary_c_t_a_link", "updated_at", "created_at" FROM \`home_page\`;`)
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`ALTER TABLE \`__new_home_page\` RENAME TO \`home_page\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`home_page_hero_hero_background_image_idx\` ON \`home_page\` (\`hero_background_image_id\`);`)
  await db.run(sql`ALTER TABLE \`docs_locales\` DROP COLUMN \`seo_meta_title\`;`)
  await db.run(sql`ALTER TABLE \`docs_locales\` DROP COLUMN \`seo_meta_description\`;`)
  await db.run(sql`ALTER TABLE \`showcases_locales\` DROP COLUMN \`seo_meta_title\`;`)
  await db.run(sql`ALTER TABLE \`showcases_locales\` DROP COLUMN \`seo_meta_description\`;`)
}
