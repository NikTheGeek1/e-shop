import { CategoryType } from "../../../models/Category";
import { SubCategoryType } from "../../../models/SubCategory";
import ListItem from "./ListItem";
import styles from "./styles.module.scss";

type ListProps = {
  categories: CategoryType[];
  subCategories: SubCategoryType[];
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategoryType[]>>;
};

export default function List({ categories, subCategories, setSubCategories }: ListProps) {
  return (
    <ul className={styles.list}>
      {subCategories.map((sub) => (
        <ListItem
          subCategory={sub}
          key={sub._id}
          setSubCategories={setSubCategories}
          categories={categories}
        />
      ))}
    </ul>
  );
}
