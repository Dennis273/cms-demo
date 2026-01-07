-- Migration SQL for Cloudflare D1 Console
-- Run these statements in order

-- Plans
CREATE TABLE `plans` (
  `id` integer PRIMARY KEY NOT NULL,
  `slug` text NOT NULL,
  `pricing_usd_monthly` numeric NOT NULL,
  `pricing_usd_yearly` numeric NOT NULL,
  `pricing_cny_monthly` numeric NOT NULL,
  `pricing_cny_yearly` numeric NOT NULL,
  `pricing_jpy_monthly` numeric NOT NULL,
  `pricing_jpy_yearly` numeric NOT NULL,
  `limits_users` numeric NOT NULL,
  `limits_storage` numeric NOT NULL,
  `is_recommended` integer DEFAULT false,
  `order` numeric DEFAULT 0,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE UNIQUE INDEX `plans_slug_idx` ON `plans` (`slug`);
CREATE INDEX `plans_updated_at_idx` ON `plans` (`updated_at`);
CREATE INDEX `plans_created_at_idx` ON `plans` (`created_at`);

CREATE TABLE `plans_locales` (
  `name` text NOT NULL,
  `description` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `plans_locales_locale_parent_id_unique` ON `plans_locales` (`_locale`,`_parent_id`);

CREATE TABLE `plans_features` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `included` integer DEFAULT true,
  FOREIGN KEY (`_parent_id`) REFERENCES `plans`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `plans_features_order_idx` ON `plans_features` (`_order`);
CREATE INDEX `plans_features_parent_id_idx` ON `plans_features` (`_parent_id`);

CREATE TABLE `plans_features_locales` (
  `name` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `plans_features`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `plans_features_locales_locale_parent_id_unique` ON `plans_features_locales` (`_locale`,`_parent_id`);

-- Doc Categories
CREATE TABLE `doc_categories` (
  `id` integer PRIMARY KEY NOT NULL,
  `slug` text NOT NULL,
  `icon` text,
  `order` numeric DEFAULT 0,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE UNIQUE INDEX `doc_categories_slug_idx` ON `doc_categories` (`slug`);
CREATE INDEX `doc_categories_updated_at_idx` ON `doc_categories` (`updated_at`);
CREATE INDEX `doc_categories_created_at_idx` ON `doc_categories` (`created_at`);

CREATE TABLE `doc_categories_locales` (
  `name` text NOT NULL,
  `description` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `doc_categories`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `doc_categories_locales_locale_parent_id_unique` ON `doc_categories_locales` (`_locale`,`_parent_id`);

-- Docs
CREATE TABLE `docs` (
  `id` integer PRIMARY KEY NOT NULL,
  `slug` text NOT NULL,
  `category_id` integer NOT NULL,
  `order` numeric DEFAULT 0,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  FOREIGN KEY (`category_id`) REFERENCES `doc_categories`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE UNIQUE INDEX `docs_slug_idx` ON `docs` (`slug`);
CREATE INDEX `docs_category_idx` ON `docs` (`category_id`);
CREATE INDEX `docs_updated_at_idx` ON `docs` (`updated_at`);
CREATE INDEX `docs_created_at_idx` ON `docs` (`created_at`);

CREATE TABLE `docs_locales` (
  `title` text NOT NULL,
  `excerpt` text,
  `content` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `docs`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `docs_locales_locale_parent_id_unique` ON `docs_locales` (`_locale`,`_parent_id`);

-- Showcases
CREATE TABLE `showcases` (
  `id` integer PRIMARY KEY NOT NULL,
  `logo_id` integer,
  `company_size` text,
  `website` text,
  `order` numeric DEFAULT 0,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  FOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX `showcases_logo_idx` ON `showcases` (`logo_id`);
CREATE INDEX `showcases_updated_at_idx` ON `showcases` (`updated_at`);
CREATE INDEX `showcases_created_at_idx` ON `showcases` (`created_at`);

CREATE TABLE `showcases_locales` (
  `company_name` text NOT NULL,
  `industry` text NOT NULL,
  `description` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `showcases`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `showcases_locales_locale_parent_id_unique` ON `showcases_locales` (`_locale`,`_parent_id`);

-- Testimonials
CREATE TABLE `testimonials` (
  `id` integer PRIMARY KEY NOT NULL,
  `avatar_id` integer,
  `rating` numeric DEFAULT 5 NOT NULL,
  `order` numeric DEFAULT 0,
  `updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  `created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  FOREIGN KEY (`avatar_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX `testimonials_avatar_idx` ON `testimonials` (`avatar_id`);
CREATE INDEX `testimonials_updated_at_idx` ON `testimonials` (`updated_at`);
CREATE INDEX `testimonials_created_at_idx` ON `testimonials` (`created_at`);

CREATE TABLE `testimonials_locales` (
  `user_name` text NOT NULL,
  `position` text NOT NULL,
  `company` text NOT NULL,
  `content` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `testimonials`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `testimonials_locales_locale_parent_id_unique` ON `testimonials_locales` (`_locale`,`_parent_id`);

-- Payload KV
CREATE TABLE `payload_kv` (
  `id` integer PRIMARY KEY NOT NULL,
  `key` text NOT NULL,
  `data` text NOT NULL
);

CREATE UNIQUE INDEX `payload_kv_key_idx` ON `payload_kv` (`key`);

-- Home Page
CREATE TABLE `home_page` (
  `id` integer PRIMARY KEY NOT NULL,
  `hero_background_image_id` integer,
  `hero_primary_c_t_a_link` text,
  `hero_secondary_c_t_a_link` text,
  `updated_at` text,
  `created_at` text,
  FOREIGN KEY (`hero_background_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX `home_page_hero_hero_background_image_idx` ON `home_page` (`hero_background_image_id`);

CREATE TABLE `home_page_locales` (
  `hero_title` text NOT NULL,
  `hero_subtitle` text,
  `hero_primary_c_t_a_text` text,
  `hero_secondary_c_t_a_text` text,
  `seo_meta_title` text,
  `seo_meta_description` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `home_page`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `home_page_locales_locale_parent_id_unique` ON `home_page_locales` (`_locale`,`_parent_id`);

CREATE TABLE `home_page_features` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `icon` text,
  FOREIGN KEY (`_parent_id`) REFERENCES `home_page`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `home_page_features_order_idx` ON `home_page_features` (`_order`);
CREATE INDEX `home_page_features_parent_id_idx` ON `home_page_features` (`_parent_id`);

CREATE TABLE `home_page_features_locales` (
  `title` text NOT NULL,
  `description` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `home_page_features`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `home_page_features_locales_locale_parent_id_unique` ON `home_page_features_locales` (`_locale`,`_parent_id`);

CREATE TABLE `home_page_stats` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `value` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `home_page`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `home_page_stats_order_idx` ON `home_page_stats` (`_order`);
CREATE INDEX `home_page_stats_parent_id_idx` ON `home_page_stats` (`_parent_id`);

CREATE TABLE `home_page_stats_locales` (
  `label` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `home_page_stats`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `home_page_stats_locales_locale_parent_id_unique` ON `home_page_stats_locales` (`_locale`,`_parent_id`);

CREATE TABLE `home_page_client_logos` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `logo_id` integer NOT NULL,
  FOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`_parent_id`) REFERENCES `home_page`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `home_page_client_logos_order_idx` ON `home_page_client_logos` (`_order`);
CREATE INDEX `home_page_client_logos_parent_id_idx` ON `home_page_client_logos` (`_parent_id`);
CREATE INDEX `home_page_client_logos_logo_idx` ON `home_page_client_logos` (`logo_id`);

-- Navigation
CREATE TABLE `navigation` (
  `id` integer PRIMARY KEY NOT NULL,
  `logo_id` integer,
  `updated_at` text,
  `created_at` text,
  FOREIGN KEY (`logo_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX `navigation_logo_idx` ON `navigation` (`logo_id`);

CREATE TABLE `navigation_locales` (
  `logo_text` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `navigation`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `navigation_locales_locale_parent_id_unique` ON `navigation_locales` (`_locale`,`_parent_id`);

CREATE TABLE `navigation_items` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `link` text NOT NULL,
  `open_in_new_tab` integer DEFAULT false,
  `highlight` integer DEFAULT false,
  FOREIGN KEY (`_parent_id`) REFERENCES `navigation`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `navigation_items_order_idx` ON `navigation_items` (`_order`);
CREATE INDEX `navigation_items_parent_id_idx` ON `navigation_items` (`_parent_id`);

CREATE TABLE `navigation_items_locales` (
  `label` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `navigation_items`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `navigation_items_locales_locale_parent_id_unique` ON `navigation_items_locales` (`_locale`,`_parent_id`);

-- Footer
CREATE TABLE `footer` (
  `id` integer PRIMARY KEY NOT NULL,
  `updated_at` text,
  `created_at` text
);

CREATE TABLE `footer_locales` (
  `copyright` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `footer_locales_locale_parent_id_unique` ON `footer_locales` (`_locale`,`_parent_id`);

CREATE TABLE `footer_columns` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `footer_columns_order_idx` ON `footer_columns` (`_order`);
CREATE INDEX `footer_columns_parent_id_idx` ON `footer_columns` (`_parent_id`);

CREATE TABLE `footer_columns_locales` (
  `title` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer_columns`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `footer_columns_locales_locale_parent_id_unique` ON `footer_columns_locales` (`_locale`,`_parent_id`);

CREATE TABLE `footer_columns_links` (
  `_order` integer NOT NULL,
  `_parent_id` text NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `link` text NOT NULL,
  `open_in_new_tab` integer DEFAULT false,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer_columns`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `footer_columns_links_order_idx` ON `footer_columns_links` (`_order`);
CREATE INDEX `footer_columns_links_parent_id_idx` ON `footer_columns_links` (`_parent_id`);

CREATE TABLE `footer_columns_links_locales` (
  `label` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer_columns_links`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `footer_columns_links_locales_locale_parent_id_unique` ON `footer_columns_links_locales` (`_locale`,`_parent_id`);

CREATE TABLE `footer_social_links` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `platform` text NOT NULL,
  `url` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `footer_social_links_order_idx` ON `footer_social_links` (`_order`);
CREATE INDEX `footer_social_links_parent_id_idx` ON `footer_social_links` (`_parent_id`);

CREATE TABLE `footer_bottom_links` (
  `_order` integer NOT NULL,
  `_parent_id` integer NOT NULL,
  `id` text PRIMARY KEY NOT NULL,
  `link` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX `footer_bottom_links_order_idx` ON `footer_bottom_links` (`_order`);
CREATE INDEX `footer_bottom_links_parent_id_idx` ON `footer_bottom_links` (`_parent_id`);

CREATE TABLE `footer_bottom_links_locales` (
  `label` text NOT NULL,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` text NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `footer_bottom_links`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `footer_bottom_links_locales_locale_parent_id_unique` ON `footer_bottom_links_locales` (`_locale`,`_parent_id`);

-- Site Settings
CREATE TABLE `site_settings` (
  `id` integer PRIMARY KEY NOT NULL,
  `favicon_id` integer,
  `og_image_id` integer,
  `default_currency` text DEFAULT 'USD',
  `contact_email` text,
  `support_email` text,
  `analytics_google_analytics_id` text,
  `updated_at` text,
  `created_at` text,
  FOREIGN KEY (`favicon_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
  FOREIGN KEY (`og_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX `site_settings_favicon_idx` ON `site_settings` (`favicon_id`);
CREATE INDEX `site_settings_og_image_idx` ON `site_settings` (`og_image_id`);

CREATE TABLE `site_settings_locales` (
  `site_name` text NOT NULL,
  `site_description` text,
  `id` integer PRIMARY KEY NOT NULL,
  `_locale` text NOT NULL,
  `_parent_id` integer NOT NULL,
  FOREIGN KEY (`_parent_id`) REFERENCES `site_settings`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `site_settings_locales_locale_parent_id_unique` ON `site_settings_locales` (`_locale`,`_parent_id`);

-- Add columns to payload_locked_documents_rels
ALTER TABLE `payload_locked_documents_rels` ADD `plans_id` integer REFERENCES plans(id);
ALTER TABLE `payload_locked_documents_rels` ADD `doc_categories_id` integer REFERENCES doc_categories(id);
ALTER TABLE `payload_locked_documents_rels` ADD `docs_id` integer REFERENCES docs(id);
ALTER TABLE `payload_locked_documents_rels` ADD `showcases_id` integer REFERENCES showcases(id);
ALTER TABLE `payload_locked_documents_rels` ADD `testimonials_id` integer REFERENCES testimonials(id);

CREATE INDEX `payload_locked_documents_rels_plans_id_idx` ON `payload_locked_documents_rels` (`plans_id`);
CREATE INDEX `payload_locked_documents_rels_doc_categories_id_idx` ON `payload_locked_documents_rels` (`doc_categories_id`);
CREATE INDEX `payload_locked_documents_rels_docs_id_idx` ON `payload_locked_documents_rels` (`docs_id`);
CREATE INDEX `payload_locked_documents_rels_showcases_id_idx` ON `payload_locked_documents_rels` (`showcases_id`);
CREATE INDEX `payload_locked_documents_rels_testimonials_id_idx` ON `payload_locked_documents_rels` (`testimonials_id`);

-- Record this migration
INSERT INTO payload_migrations (name, batch) VALUES ('20260107_115650', (SELECT COALESCE(MAX(batch), 0) + 1 FROM payload_migrations));
