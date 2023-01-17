import mongoose from "mongoose";

export interface CartType extends mongoose.Document {
  products: ProductInCart[];
  cartTotal: number;
  totalAfterDiscount: number;
  user: string;
};

export type ProductInCart = {
  _id?: string;
  product: string;
  name: string;
  image: string;
  size: string;
  qty: number;
  color: {
    color: string;
    image: string;
  };
  price: number;
}