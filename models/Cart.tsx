import mongoose from "mongoose";
import { CartType } from "../types/cart";

const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        name: {
          type: String,
        },
        image: {
          type: String,
        },
        size: {
          type: String,
        },
        /*
        style: {
          style: String,
          color: String,
          image: String,
        },
        */
        qty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.models.Cart as mongoose.Model<CartType & mongoose.Document> || mongoose.model<CartType & mongoose.Document>("Cart", cartSchema);

export default Cart;
