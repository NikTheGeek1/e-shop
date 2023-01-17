import { CategoryType } from "../../../models/Category";
import { ProductType as FullProductType } from "../../../models/Product";
import { SubCategoryType } from "../../../models/SubCategory";
import { LeanProductType } from "../../../types/product";
import { RatingType } from "../../../types/product";

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
    style,
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
    ratings: calculateRatingPercentages(product),
    allSizes: calculateAllSizes(product),
  };
  return leanProduct;
}

const calcDiscount = (price: number, discount: number) => {
  return +(price - price / discount).toFixed(2);
};

// a function that calculates the percentage of each rating
// and returns an array of objects with the rating and percentage
const calculateRatingPercentages = (product: FullProductType): RatingType[] => {
  const ratings = [5, 4, 3, 2, 1];
  const ratingsHash: { [key: number]: { count: number } } = {
    5: { count: 0 },
    4: { count: 0 },
    3: { count: 0 },
    2: { count: 0 },
    1: { count: 0 },
  };
  let totalCount = 0;
  product.reviews.forEach((review) => {
    totalCount++;
    ratings.forEach((rating) => {
      if (review.rating === rating || review.rating - 0.5 === rating) {
        ratingsHash[rating].count++;
      }
    });
  });
  const percentages = ratings.map((rating) => {
    const percentage =
      ratingsHash[rating].count === 0
        ? 0
        : Math.round((ratingsHash[rating].count / totalCount) * 100);
    return { ratingCount: ratingsHash[rating].count, rating, percentage };
  });
  return percentages;
};

const calculateAllSizes = (product: FullProductType) => {
  return product.subProducts
    .map((p) => {
      return p.sizes;
    })
    .flat()
    .sort((a, b) => {
      const sizes = ["S", "M", "L", "XL", "XXL"];
      return sizes.indexOf(a.size) - sizes.indexOf(b.size);
    })
    .filter(
      (element, index, array) =>
        array.findIndex((el2) => el2.size === element.size) === index
    );
};
