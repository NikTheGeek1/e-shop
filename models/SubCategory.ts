import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;
export type SubCategoryType = {
  name: string;
  slug: string;
  parent: string;
};
const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "SubCategory name must be at least 3 characters long"],
    maxlength: [32, "SubCategory name must be at most 32 characters long"],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
