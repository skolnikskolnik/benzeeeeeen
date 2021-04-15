const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baseSchema = new Schema({
  name: {type: String, required:true},
  pKb: {type: String, required:true},
  Kb: {type: String, required:true}
});

const Base = mongoose.model("Base", baseSchema);

module.exports = Base;