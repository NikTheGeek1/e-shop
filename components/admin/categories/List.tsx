import { CategoryType } from "../../../models/Category";
import ListItem from "./ListItem";
import styles from "./styles.module.scss";

type ListProps = {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
};

export default function List({ categories, setCategories }: ListProps) {
  return (
    <ul className={styles.list}>
      {categories.map((category, idx) => (
        <ListItem
        key={category._id! + idx}
          category={category}
          setCategories={setCategories}
        />
      ))}
    </ul>
  );
}
