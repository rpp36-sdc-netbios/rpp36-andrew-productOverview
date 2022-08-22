var db = require('../database/db.js');

exports.productList = (options) => {
  const productListQuery = db.query(`
    SELECT *
    FROM products
    LIMIT 5
    ;
  `)

  return Promise.all([productListQuery])
    .then((data) => {
      const result = data[0].rows;
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

exports.productInfo = (productId) => {
  const productJoinFeatures = db.query(`
    SELECT p.id, p.name, p.slogan, p.description, p.category, p.default_price,
      json_agg(json_build_object('feature', f.feature, 'values', f.value)) AS features
    FROM products AS p
    JOIN features AS f
    ON f.product_id = ${productId} AND p.id = ${productId}
    GROUP BY p.id;
  `);

  return Promise.all([productJoinFeatures])
    .then((data) => {
      const result = data[0].rows[0];
      return result;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
}

exports.productStyles = (productId) => {
  const productStylesQuery = db.query(`
  SELECT s.id AS style_id, s.name, s.original_price, s.sale_price, s.default_style AS "default?",
  (SELECT json_agg(photos_url)
  FROM (
    SELECT thumbnail_url, url
    FROM photos
    WHERE photos.style_id=s.id
    ) AS photos_url
  ) AS photos,
  json_object_agg(skus.id, json_build_object('quantity', skus.quantity, 'size', skus.size)) AS skus
  FROM styles AS s
  JOIN skus
  ON s.id=skus.styleId and s.productId=${productId}
  GROUP BY s.id
  ;
  `);

  return Promise.all([productStylesQuery])
  .then((data) => {
    const result = {"product_id": productId, "results": data[0].rows};
    return result;
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
}

exports.relatedProducts = (productId) => {
  const productsRelated = db.query(`
  SELECT json_agg(related_product_id) AS related
  FROM related
  WHERE current_product_id = ${productId}
  ;
`);

return Promise.all([productsRelated])
  .then((data) => {
    const result = data[0].rows[0].related;
    return result;
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
}