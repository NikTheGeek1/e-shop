import { NextApiResponse } from "next";
import nc from "next-connect";
import { NextApiRequestWithUser } from "../../../middleware/auth";
import Product, { SubProductType } from "../../../models/Product";
import { CartProductType } from "../../../types/product";
import db from "../../../utils/db/db";

const handler = nc();

handler.post(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    await db.connect();
    const promises = req.body.products.map(async (product: CartProductType) => {
      const dbProduct = await Product.findById(product._id).lean();
      if (!dbProduct) {
        return res.status(404).send({ message: "Product Not Found" });
      }
      const originalPrice = (dbProduct.subProducts[
        product.style
      ] as SubProductType).sizes.find((size) => size.size === product.size)
        ?.price;
      if (!originalPrice) {
        return res.status(404).send({ message: "Product Not Found" });
      }
      const qty = (dbProduct.subProducts[
        product.style
      ] as SubProductType).sizes.find((size) => size.size === product.size)
        ?.qty;
      if (!qty) {
        return res.status(404).send({ message: "Product Not Found" });
      }
      const discount = (dbProduct.subProducts[product.style] as SubProductType)
        .discount;
      const updatedCartProduct: CartProductType = {
        ...product,
        priceBefore: originalPrice,
        price:
          discount > 0
            ? originalPrice - originalPrice / discount
            : originalPrice,
        discount,
        stockQty: qty,
        shipping: dbProduct.shipping,
      };
      return updatedCartProduct;
    });
    const data = await Promise.all(promises);
    await db.disconnect();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: (error as any).message });
  }
});

export default handler;