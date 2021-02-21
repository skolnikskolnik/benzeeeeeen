const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const acidSchema = new Schema({
  name: {type: String, required:true},
  pKa: Number,
  Ka: Number
});

const Acid = mongoose.model("Acid", acidSchema);

module.exports = Acid;