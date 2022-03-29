const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  id: [String],
  articulo: [String],
  precioDolar: [Number],
  cantidad: [Number],
});

module.exports = model("articles", articleSchema);
