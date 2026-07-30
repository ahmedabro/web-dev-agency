import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 0,
    required: true,
  },
  sign: {
    type: String,
    default: ""
  },
  icon: {
    type: String,
  }
}, { timestamps: true });

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
