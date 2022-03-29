const { Schema, model } = require("mongoose");

const TasadolarSchema = new Schema({
  tasadolar: Number,
});

module.exports = model("tasadolar", TasadolarSchema);
