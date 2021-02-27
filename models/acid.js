const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const acidSchema = new Schema({
  name: {type: String, required:true},
  pKa: {type: String, required:true},
  Ka: {type: String, required:true}
});

const Acid = mongoose.model("Acid", acidSchema);

module.exports = Acid;