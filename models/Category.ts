import mongoose from "mongoose";
export type CategoryType = {
  _id?: string;
  name: string;
  slug: string;
};
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [32, "Category name must be at most 32 characters long"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
