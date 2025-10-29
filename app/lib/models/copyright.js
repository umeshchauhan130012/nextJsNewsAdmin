import mongoose from "mongoose";

const copyrightSchema = new mongoose.Schema({
  copyright: { type: String},
}, { timestamps: true });

const Copyright = mongoose.models.Copyright || mongoose.model("Copyright", copyrightSchema);
export default Copyright;