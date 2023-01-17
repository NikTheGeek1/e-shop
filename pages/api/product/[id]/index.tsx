import nc from "next-connect";
import Product, { ProductType } from "../../../../models/Product";
import db from "../../../../utils/db/db";
import { NextApiRequestWithUser } from "../../../../middleware/auth";
import { NextApiResponse } from "next";
import { CartProductType } from "../../../../types/product";
import { SubCategoryType } from "../../../../models/SubCategory";
import { CategoryType } from "../../../../models/Category";

const handler = nc();

handler.get(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    db.connect();
    const id = req.query.id;
    const style = req.query.style ? +req.query.style : 0;
    const size = req.query.size ? +req.query.size : 0;
    const product: ProductType | null = await Product.findById(id).lean();
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const discount = product.subProducts[style].discount;
    const priceBefore = product.subProducts[style].sizes[size].price;
    const price = discount ? priceBefore - priceBefore / discount : priceBefore;
    db.disconnect();
    
    const prod: CartProductType = {
      _id: product._id,
      style: Number(style),
      name: product.name,
      description: product.description,
      slug: product.slug,
      sku: product.subProducts[style].sku,
      brand: product.brand,
      category: product.category as CategoryType,
      subCategories: product.subCategories as SubCategoryType[],
      shipping: product.shipping,
      images: product.subProducts[style].images,
      color: product.subProducts[style].color,
      size: product.subProducts[style].sizes[size].size,
      price,
      priceBefore,
      stockQty: product.subProducts[style].sizes[size].qty,
      discount: product.subProducts[style].discount,
    };
    return res.json(prod);
  } catch (error) {
    return res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
