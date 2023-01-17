import mongoose from "mongoose";

export interface SessionUser {
  id: mongoose.Schema.Types.ObjectId | string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export interface IUser extends mongoose.Document {
  _id: mongoose.Schema.Types.ObjectId | string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  emailVerified: boolean;
  defaultPaymentMethod: string;
  address: AddressType[];
}

export type AddressType = {
  _id?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  active?: boolean;
};

const userSchema = new mongoose.Schema<IUser>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    address: [
      {
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
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields to our documents
);

const User = mongoose.models.User as mongoose.Model<IUser> || mongoose.model<IUser>("User", userSchema);
export default User;