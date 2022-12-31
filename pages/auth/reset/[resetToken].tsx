import { Form, Formik } from "formik";
import { useState } from "react";
import CircledIconButton from "../../../components/buttons/circled-icon-button";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import LoginInput from "../../../components/inputs/logininput";
import LoginHeader from "../../../components/login-header";
import styles from "../../../styles/reset.module.scss";
import { CountryType } from "../../../utils/server-props/get-country";
import * as Yup from "yup";
import { BiRightArrowAlt } from "react-icons/bi";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import getCountryServerSideProps from "../../../utils/server-props/get-country";
import { GetServerSidePropsContext } from "next";
import jtw from "jsonwebtoken";
import DotLoaderComponent from "../../../components/loaders/dot-loader";
import { getSession, signIn } from "next-auth/react";

type ResetProps = {
  country: CountryType;
  userId: string;
};

export default function Reset({ country, userId }: ResetProps) {
  const [apiMessage, setApiMessage] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/reset", {
        userId,
        password,
      });
      setApiMessage(data.message);
      setApiError("");
      const signInOptions = {
        callbackUrl: "/",
        email: data.email,
        password,
      };
      await signIn("credentials", signInOptions);
      setLoading(false);
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
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <>
      {loading && <DotLoaderComponent loading={loading} />}
      <Header country={country} />
      <div className={styles.reset}>
        <div>
          <LoginHeader title="Reset your password ?" subtitle="" />
          <Formik
            enableReinitialize
            onSubmit={resetHandler}
            initialValues={{
              password,
              confirmPassword,
            }}
            validationSchema={validationSchema}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  IconComponent={RiLockPasswordFill}
                  value={password}
                />
                <LoginInput
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  IconComponent={RiLockPasswordFill}
                  value={confirmPassword}
                />
                <CircledIconButton
                  type="submit"
                  title="Submit"
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { resetToken } = context.query;
  const session = await getSession({ req: context.req });
  if (session) { // if user is already logged in, redirect to home page 
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const country = await getCountryServerSideProps();
  const userIdObj = jtw.verify(
    resetToken as string,
    process.env.RESET_PASSWORD_TOKEN_SECRET as string
  );
  return {
    props: {
      country,
      userId: (userIdObj as jtw.JwtPayload).id,
    },
  };
}
