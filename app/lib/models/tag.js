import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  tagname: { type: String, required: true, minLength: 2 },
  taghindiname: { type: String},
  tagurl: { type: String, required: true },
  tagstatus: { type: String, required: true },
  tagsathome: { type: Boolean, required: true },
  metatitle: { type: String},
  metakeywords: { type: String},
  metadescription: { type: String},
}, { timestamps: true });

const Tag = mongoose.models.Tag || mongoose.model("Tag", tagSchema);
export default Tag;