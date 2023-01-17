import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Images from "./Images";
import Select from "./Select";
import styles from "./styles.module.scss";
import { hideDialog, showDialog } from "../../../store/dialog-slice";
import DialogModal from "../../../components/dialog-modal";
import dataURItoBlob from "../../../utils/helpers/dataURItoBlob";
import { uploadImages } from "../../../requests/upload";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { ColorType, LeanProductType, SizeType } from "../../../types/product";

type AddReviewProps = {
  product: LeanProductType;
  setReviews: (reviews: any) => void;
};

export default function AddReview({ product, setReviews }: AddReviewProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog({}));
  }, []);
  const [size, setSize] = useState<string>();
  const [style, setStyle] = useState<ColorType>();
  const [fit, setFit] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [images, setImages] = useState([]);
  let uploaded_images: any = [];
  const handleSubmit = async () => {
    setLoading(true);
    let msgs = [];
    if (!size) {
      msgs.push({
        msg: "Please select a size !",
        type: "error",
      });
    }
    if (!style) {
      msgs.push({
        msg: "Please select a style !",
        type: "error",
      });
    }
    if (!fit) {
      msgs.push({
        msg: "Please select a fit !",
        type: "error",
      });
    }
    if (!review) {
      msgs.push({
        msg: "Please add a review !",
        type: "error",
      });
    }
    if (!rating) {
      msgs.push({
        msg: "Please select a rating !",
        type: "error",
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: "Adding review error !",
          msgs,
        })
      );
    } else {
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "reviews images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploaded_images = await uploadImages(formData);
      }
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        size,
        style,
        fit,
        rating,
        review,
        images: uploaded_images,
      });
      setReviews(data.reviews);
      setStyle(undefined);
      setSize(undefined);
      setFit("");
      setImages([]);
      setRating(0);
      setReview("");
    }
    setLoading(false);
  };

  const handleSelect = (type: "size" | "style" | "fit", value: string | ColorType | SizeType) => {
    if (type === "size") {
      setSize(value as string);
    } else if (type === "style") {
      setStyle(value as ColorType);
    } else {
      setFit(value as string);
    }
  };

  return (
    <div className={styles.reviews__add}>
      <DialogModal />
      <div className={styles.reviews__add_wrap}>
        <div className={styles.flex} style={{ gap: "10px" }}>
          <Select
            property={size || ""}
            text="Size"
            data={product.allSizes}
            handleChange={(value) => handleSelect("size", value)}
          />
          <Select
            property={style as ColorType || ""}
            text="Style"
            data={product.colors}
            handleChange={(value) => handleSelect("style", value)}
          />
          <Select
            property={fit}
            text="How does it fit"
            data={fitOptions}
            handleChange={(value) => handleSelect("fit", value)}
          />
        </div>
        <Images images={images} setImages={setImages} />
        <textarea
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
        />
        <Rating
          name="half-rating-read"
          defaultValue={0}
          value={rating}
          onChange={(e, value) => setRating(value)}
          precision={0.5}
          style={{ color: "#facf19", fontSize: "3rem" }}
        />
        <button
          className={`${styles.login_btn} ${loading ? styles.disabled : ""}`}
          onClick={() => handleSubmit()}
          disabled={loading}
        >
          Submit Review{" "}
          {loading && <ClipLoader loading={loading} color="#fff" />}
        </button>
      </div>
    </div>
  );
}
const fitOptions = ["Small", "True to size", "Large"];
