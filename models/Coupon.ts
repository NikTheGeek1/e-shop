import mongoose from "mongoose";

export interface CouponSchemaType extends mongoose.Document {
  coupon: string;
  startDate: string;
  endDate: string;
  discount: number;
}

const couponSchema = new mongoose.Schema<CouponSchemaType>(
  {
    coupon: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: true,
      minLength: 4,
      maxLength: 10,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.models.Coupon as mongoose.Model<CouponSchemaType> || mongoose.model<CouponSchemaType>("Coupon", couponSchema);

export default Coupon;
