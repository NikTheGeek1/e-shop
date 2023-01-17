import { ChangeEvent } from "react";
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { LeanProductType, ProductQuestionType } from "../../../../types/product";
import styles from "./styles.module.scss";

type QuestionsProps = {
  questions: ProductQuestionType[];
  product: LeanProductType;
  setProduct: React.Dispatch<React.SetStateAction<LeanProductType>>;
};

export default function Questions({ questions, product, setProduct }: QuestionsProps) {
  const handleQuestion = (i: number, e: ChangeEvent<HTMLInputElement>) => {
    const values = [...questions];
    values[i][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values } as LeanProductType);
  };
  const handleRemove = (i: number) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(i, 1);
      setProduct({ ...product, questions: values } as LeanProductType);
    }
  };

  return (
    <div>
      <div className={styles.header}>Questions</div>
      {questions.length == 0 && (
        <BsFillPatchPlusFill
          className={styles.svg}
          onClick={() => {
            setProduct({
              ...product,
              questions: [
                ...questions,
                {
                  question: "",
                  answer: "",
                },
              ],
            } as LeanProductType);
          }}
        />
      )}
      {questions
        ? questions.map((q, i) => (
            <div className={styles.clicktoadd} key={i}>
              <input
                type="text"
                name="question"
                placeholder="Question"
                value={q.question}
                onChange={(e) => handleQuestion(i, e)}
              />
              <input
                type="text"
                name="answer"
                placeholder="Answer"
                value={q.answer}
                onChange={(e) => handleQuestion(i, e)}
              />

              <>
                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                <BsFillPatchPlusFill
                  onClick={() => {
                    setProduct({
                      ...product,
                      questions: [
                        ...questions,
                        {
                          question: "",
                          answer: "",
                        },
                      ],
                    } as LeanProductType);
                  }}
                />
              </>
            </div>
          ))
        : ""}
    </div>
  );
}
