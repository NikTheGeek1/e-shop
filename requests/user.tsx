import axios from "axios";
import { AddressType } from "../models/User";
import { CartProductType } from "../types/product";

export const saveCart = async (cart: CartProductType[]) => {
  try {
    const res = await axios.post("/api/user/saveCart", {
      cart,
    });
    console.log(res, 'user.tsx', 'line: ', '10');
    return res;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const saveAddress = async (address: AddressType) => {
  try {
    const res = await axios.post("/api/user/saveAddress", {
      address,
    });
    return res;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const changeActiveAddress = async (id: string) => {
  try {
    const { data } = await axios.put("/api/user/manageAddress", {
      id,
    });
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const deleteAddress = async (id: string) => {
  try {
    const { data } = await axios.delete("/api/user/manageAddress", {
      data: { id },
    });
    return data;
  } catch (error) {
    return (error as any).response.data.message;
  }
};
export const applyCoupon = async (coupon: string) => {
  const { data } = await axios.post("/api/user/applyCoupon", {
    coupon,
  });
  return data;
};
