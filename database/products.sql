\c postgres;
DROP INDEX IF EXISTS idx_products_id;
DROP INDEX IF EXISTS idx_features_product_id;
DROP INDEX IF EXISTS idx_styles_productId;
DROP INDEX IF EXISTS idx_photos_style_id;
DROP INDEX IF EXISTS idx_related_current_product_id;
DROP INDEX IF EXISTS idx_skus_styleId;
DROP DATABASE IF EXISTS products;
CREATE DATABASE products;
\c products;

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slogan TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  default_price REAL NOT NULL
);
COPY products FROM '/Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/ETL/product.csv' csv header;

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  productId INTEGER NOT NULL,
  name TEXT NOT NULL,
  sale_price TEXT,
  original_price TEXT NOT NULL,
  default_style BOOLEAN,
  FOREIGN KEY (productId)
    REFERENCES products (id)
);
COPY styles FROM '/Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/ETL/styles.csv' csv header;

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  feature TEXT NOT NULL,
  value TEXT NOT NULL,
  FOREIGN KEY (product_id)
    REFERENCES products (id)
);
COPY features FROM '/Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/ETL/features.csv' csv header;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  style_id INTEGER NOT NULL,
  url TEXT,
  thumbnail_url TEXT,
  FOREIGN KEY (style_id)
    REFERENCES styles (id)
);
COPY photos FROM '/Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/ETL/photos.csv' csv header;

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INTEGER NOT NULL,
  related_product_id INTEGER NOT NULL
);
COPY related FROM '/Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/ETL/related.csv' csv header;

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  styleId INTEGER NOT NULL,
  size TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  FOREIGN KEY (styleId)
    REFERENCES styles (id)
);
COPY skus FROM '/Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/ETL/skus.csv' csv header;

/*  Execute this file from the psql postgres cli
\i /Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/database/products.sql
 *  to create the database and the tables.*/