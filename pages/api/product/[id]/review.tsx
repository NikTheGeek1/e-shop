import nc from "next-connect";
import db from "../../../../utils/db/db";
import Product, { ProductType, ReviewType } from "../../../../models/Product";
import auth, { NextApiRequestWithUser } from "../../../../middleware/auth";
import { NextApiResponse } from "next";

const handler = nc().use(auth);

handler.put(async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    await db.connect();
    const product: ProductType | null = await Product.findById(req.query.id);
    if (product) {
      const exist = product.reviews.find(
        (x) => x.reviewBy.toString() == req.user
      );
      if (exist) {
        await Product.updateOne(
          {
            _id: req.query.id,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": req.body.review,
              "reviews.$.rating": req.body.rating,
              "reviews.$.size": req.body.size,
              "reviews.$.fit": req.body.fit,
              "reviews.$.images": req.body.images,
              "reviews.$.style": req.body.style,
            },
          },
          {
            new: true,
          }
        );
        const updatedProduct: ProductType | null = await Product.findById(
          req.query.id
        );
        if (!updatedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
        await updatedProduct.populate("reviews.reviewBy");
        await db.disconnect();
        return res
          .status(200)
          .json({ reviews: updatedProduct.reviews.reverse() });
      } else {
        const review: ReviewType = {
          reviewBy: req.user as string,
          rating: req.body.rating,
          review: req.body.review,
          size: req.body.size,
          fit: req.body.fit,
          style: req.body.style,
          images: req.body.images,
          likes: { likes: 0 },
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, r) => r.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await product.populate("reviews.reviewBy");
        await db.disconnect();
        return res.status(200).json({ reviews: product.reviews.reverse() });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: (error as any).message });
  }
});

export default handler;
