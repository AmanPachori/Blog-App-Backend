const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema({
  q1: { type: String },
  q2: { type: String },
  q3: { type: String },
  q4: { type: String },
  q5: { type: String },
  q6: { type: String },
  q7: { type: String },
  q8: { type: String },
  q9: { type: String },
  q10: { type: String },
  q11: { type: String },
  q12: { type: String },
  q13: { type: String },
  q14: { type: String },
  q15: { type: String },
  q16: { type: String },
  q17: { type: String },
  q18: { type: String },
  q19: { type: String },
  q20: { type: String },
  q21: { type: String },
  q22: { type: String },
});
const Data = mongoose.model("Data", dataSchema);

module.exports = Data;
