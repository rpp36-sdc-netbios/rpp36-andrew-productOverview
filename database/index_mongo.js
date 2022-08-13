const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
  _id: Number,  //product id
  name: String, //name of product
  slogan: String,
  description: String,
  category: String,
  default_price: Number
  features: [
    feature: String,
    value: String
  ],
  results: [
    {
      style_id: Number,
      name: String,
      original_price: Number,
      sale_price: Number,
      default: Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String
        }
      ],
      skus: {
        sku_id: {
          quantity: Number,
          size: String
        }
      }
    }
  ]
});

let product = mongoose.model('Products', productSchema);