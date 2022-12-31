import { Form, Formik } from "formik";
import { useState } from "react";
import CircledIconButton from "../../components/buttons/circled-icon-button";
import Footer from "../../components/footer";
import Header from "../../components/header";
import LoginInput from "../../components/inputs/logininput";
import LoginHeader from "../../components/login-header";
import styles from "../../styles/forgot.module.scss";
import { CountryType } from "../../utils/server-props/get-country";
import * as Yup from "yup";
import { SiMinutemailer } from "react-icons/si";
import { BiRightArrowAlt } from "react-icons/bi";
import { DotLoader } from "react-spinners";
import axios from "axios";

type ForgotProps = {
  country: CountryType;
};

export default function Forgot({ country }: ForgotProps) {
  const [apiMessage, setApiMessage] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const forgotHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgot", {
        email: email,
      });
      setApiMessage(data.message);
      setApiError("");
      setLoading(false);
      setEmail("");
    } catch (error) {
      setLoading(false);
      setApiError(
        ((error as any).response && (error as any).response.data.message) ||
          (error as Error).message
      );
      setApiMessage("");
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

  return (
    <>
      {loading && <DotLoader />}
      <Header country={country} />
      <div className={styles.forgot}>
        <div>
          <LoginHeader title="Forgot your password ?" subtitle="" />
          <Formik
            enableReinitialize
            onSubmit={forgotHandler}
            initialValues={{
              email: email,
            }}
            validationSchema={validationSchema}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                  IconComponent={SiMinutemailer}
                  value={email}
                />
                <CircledIconButton
                  type="submit"
                  title="Submit email"
                  IconComponent={BiRightArrowAlt}
                />
                <div className={styles.api_message}>
                  {apiMessage && (
                    <span className={styles.success}>{apiMessage}</span>
                  )}
                </div>
                <div>
                  {apiError && <span className={styles.error}>{apiError}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export { default as getServerSideProps } from "../../utils/server-props/get-country";
