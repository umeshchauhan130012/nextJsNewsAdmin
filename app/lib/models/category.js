import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  categoryname: { type: String, required: true, minLength: 2 },
  categoryhindiname: { type: String},
  categoryurl: { type: String, required: true },
  categorystatus: { type: String, required: true },
  categoryathome: { type: Boolean, required: true },
  parentcategory: { type: String},
  metatitle: { type: String},
  metakeywords: { type: String},
  metadescription: { type: String},
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;