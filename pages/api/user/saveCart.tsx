import nc from "next-connect";
import Product, { ProductType } from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import db from "../../../utils/db/db";
import auth, { NextApiRequestWithUser } from "../../../middleware/auth";
import { NextApiResponse } from "next";
import { ProductInCart } from "../../../types/cart";
import { CartProductType } from "../../../types/product";
const handler = nc().use(auth);

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    db.connect();
    const { cart }: {cart: CartProductType[]} = req.body;
    const products = [];
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });
    const existing_cart = await Cart.findOne({ user: user._id });
    if (existing_cart) {
      await existing_cart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      const dbProduct: ProductType | null = await Product.findById(cart[i]._id).lean();
      if (!dbProduct) return res.status(404).json({ message: "Product not found" });
      const subProduct = dbProduct.subProducts[cart[i].style];
      const tempProduct: ProductInCart = {
        name: dbProduct.name,
        product: dbProduct._id,
        color: {
          color: cart[i].color.color,
          image: cart[i].color.image,
        },
        image: subProduct.images[0].url,
        qty: Number(cart[i].cartQty),
        size: cart[i].size,
        price: 0,
      };

      const price = Number(
        subProduct.sizes.find((p) => p.size == cart[i].size)!.price
      );
      tempProduct.price =
        subProduct.discount > 0
          ? +(price - price / Number(subProduct.discount)).toFixed(2)
          : +price.toFixed(2);

      products.push(tempProduct);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].qty;
    }
    await new Cart({
      products,
      cartTotal: cartTotal.toFixed(2),
      user: user._id,
    }).save();
    db.disconnect();
    return res.status(201).json({ message: "Cart saved successfully" });
  } catch (error) {
    return res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
