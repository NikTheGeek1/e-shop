import mongoose from "mongoose";
import { ProductInCart } from "../types/cart";
import { AddressType, IUser } from "./User";
const ObjectId = mongoose.Schema.Types.ObjectId;

export type OrderStatusType = "Not Processed" | "Processing" | "Dispatched" | "Cancelled" | "Completed";

export interface OrderSchemaType extends mongoose.Document {
  _id?: string;
  user: typeof ObjectId | IUser;
  products: ProductInCart[];
  shippingAddress: AddressType;
  paymentMethod: string;
  paymentResult: {
    id: string;
    status: string;
    email: string;
  };
  total: number;
  totalBeforeDiscount: number;
  couponApplied: {
    coupon: string;
    discount: number;
  };
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  status: OrderStatusType;
}

const orderSchema = new mongoose.Schema<OrderSchemaType>(
  {
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
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
        qty: {
          type: Number,
        },
        color: {
          color: String,
          image: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    shippingAddress: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      address1: {
        type: String,
      },
      address2: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
    },
    paymentResult: {
      id: String,
      status: String,
      email: String,
    },
    total: {
      type: Number,
      required: true,
    },
    totalBeforeDiscount: {
      type: Number,
    },
    couponApplied: {
      type: String,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    taxPrice: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    paidAt: {
      type: Date,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order as mongoose.Model<OrderSchemaType> || mongoose.model<OrderSchemaType>("Order", orderSchema);

export default Order;
