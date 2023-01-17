import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { CategoryType } from "../../../models/Category";
import { SubCategoryType } from "../../../models/SubCategory";
import styles from "./styles.module.scss";

type ListItemProps = {
  subCategory: SubCategoryType;
  setSubCategories: React.Dispatch<React.SetStateAction<SubCategoryType[]>>;
  categories: CategoryType[];
};

export default function ListItem({
  categories,
  subCategory,
  setSubCategories,
}: ListItemProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const input = useRef<HTMLInputElement>(null);

  const handleRemove = async (id: string) => {
    try {
      const { data } = await axios.delete("/api/admin/subCategory", {
        data: { id },
      });
      setSubCategories(data.subCategories);
      toast.success(data.message);
    } catch (error) {
      toast.error((error as any).response.data.message);
    }
  };
  const handleUpdate = async (id: string) => {
    try {
      const { data } = await axios.put("/api/admin/subCategory", {
        id,
        name: name || subCategory.name,
        parent: parent || (subCategory.parent as CategoryType)._id,
      });
      setSubCategories(data.subCategories);
      setOpen(false);
      toast.success(data.message);
    } catch (error) {
      toast.error((error as any).response.data.message);
    }
  };
  return (
    <li className={styles.list__item}>
      <input
        className={open ? styles.open : ""}
        type="text"
        value={name ? name : subCategory.name}
        onChange={(e) => setName(e.target.value)}
        disabled={!open}
        ref={input}
      />
      {open && (
        <div className={styles.list__item_expand}>
          <select
            name="parent"
            value={parent || (subCategory.parent as CategoryType)._id}
            onChange={(e) => setParent(e.target.value)}
            disabled={!open}
            className={styles.select}
          >
            {categories.map((c) => (
              <option value={c._id} key={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            className={styles.btn}
            onClick={() => handleUpdate(subCategory._id!)}
          >
            Save
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setOpen(false);
              setName("");
              setParent("");
            }}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={styles.list__item_actions}>
        {!open && (
          <AiTwotoneEdit
            onClick={() => {
              setOpen((prev) => !prev);
              input.current?.focus();
            }}
          />
        )}
        <AiFillDelete onClick={() => handleRemove(subCategory._id!)} />
      </div>
    </li>
  );
}
