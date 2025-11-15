import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  valueNumber: {
    type: Number,
    default: 0,
    required: true,
  },
  icon: {
    type: String,
  }
}, { timestamps: true });

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
