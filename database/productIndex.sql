CREATE INDEX idx_products_id ON products(id);
CREATE INDEX idx_features_product_id ON features(product_id);
CREATE INDEX idx_styles_productId ON styles(productId);
CREATE INDEX idx_photos_style_id ON photos(style_id);
CREATE INDEX idx_related_current_product_id ON related(current_product_id);
CREATE INDEX idx_skus_styleId ON skus(styleId);


/*  Execute this file from the psql postgres cli
\i /Users/andrewsmacbook/Documents/GitHub/SDC/rpp36-andrew-productOverview/database/productIndex.sql
 *  to create the database and the tables.*/