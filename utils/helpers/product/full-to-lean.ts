import { CategoryType } from "../../../models/Category";
import { ProductType as FullProductType } from "../../../models/Product";
import { SubCategoryType } from "../../../models/SubCategory";
import { LeanProductType } from "../../../types/product";

export default function fullToLean(
  product: FullProductType,
  style: number,
  size: number
): LeanProductType {
  const subProduct = product.subProducts[style];
  const prices = subProduct.sizes.map((s) => s.price).sort((a, b) => a - b);
  const discount = subProduct.discount;
  let priceRange;
  if (discount) {
    priceRange = [
      calcDiscount(prices[0], discount),
      calcDiscount(prices[prices.length - 1], discount),
    ];
  } else {
    priceRange = [prices[0], prices[prices.length - 1]];
  }
  let price;
  if (subProduct.discount) {
    price = +(
      subProduct.sizes[size].price -
      subProduct.sizes[size].price / subProduct.discount
    ).toFixed(2);
  } else {
    price = subProduct.sizes[size].price;
  }
  const leanProduct: LeanProductType = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => p.color),
    priceRange: priceRange,
    price: price,
    priceBefore: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
    category: product.category as CategoryType,
    subCategories: product.subCategories as SubCategoryType[],
  };
  return leanProduct;
}

const calcDiscount = (price: number, discount: number) => {
  return +(price - price / discount).toFixed(2);
};
