import styles from "../../styles/signin.module.scss";
import { BiRightArrowAlt, BiUser } from "react-icons/bi";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/logininput";
import { SiMinutemailer } from "react-icons/si";
import { ChangeEvent, useState } from "react";
import { IoKeyOutline } from "react-icons/io5";
import CircledIconButton from "../../components/buttons/circled-icon-button";
import { GetServerSidePropsContext } from "next";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import DotLoaderComponent from "../../components/loaders/dot-loader";
import axios from "axios";
import Router from "next/router";
import countryServerProps, {
  CountryType,
} from "../../utils/server-props/get-country";
import Header from "../../components/header";
import Footer from "../../components/footer";
import LoginHeader from "../../components/login-header";
import Image from "next/image";

type UserValues = {
  loginEmail: string;
  loginPassword: string;
  signupFullName: string;
  signupEmail: string;
  signupPassword: string;
  signupConfirmPassword: string;
};

type ProvidersType = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
};

type SignInProps = {
  providers: ProvidersType[];
  csrfToken: string;
  callbackUrl: string;
  country: CountryType;
};

export default function SignIn({
  providers,
  csrfToken,
  callbackUrl,
  country,
}: SignInProps) {
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [apiLoginMessage, setApiLoginMessage] = useState("");
  const [apiLoginError, setApiLoginError] = useState("");

  const [user, setUser] = useState<UserValues>({
    loginEmail: "",
    loginPassword: "",
    signupFullName: "",
    signupEmail: "",
    signupPassword: "",
    signupConfirmPassword: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSchema = Yup.object().shape({
    loginEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    loginPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const signupSchema = Yup.object().shape({
    signupFullName: Yup.string().required("Full name is required"),
    signupEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    signupPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    signupConfirmPassword: Yup.string()
      .oneOf([Yup.ref("signupPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const signInHandler = async () => {
    setLoading(true);
    setApiLoginMessage("");
    setApiLoginError("");
    const { loginEmail, loginPassword } = user;
    const options = {
      redirect: false,
      email: loginEmail,
      password: loginPassword,
    };
    const res = await signIn("credentials", options);
    setLoading(false);
    if (res?.error) {
      setApiLoginError(res.error);
    } else {
      setApiLoginMessage("Login Successful");
      Router.push(callbackUrl || "/");
    }
  };

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { signupFullName, signupEmail, signupPassword } = user;
      const { data } = await axios.post("/api/auth/signup", {
        name: signupFullName,
        email: signupEmail,
        password: signupPassword,
      });
      setApiMessage(data.message);
      setApiError("");
      setLoading(false);

      const options = {
        redirect: false,
        email: signupEmail,
        password: signupPassword,
      };
      const res = await signIn("credentials", options);

      Router.push("/");
    } catch (error) {
      setLoading(false);
      setApiMessage("");
      setApiError((error as any).response.data.message);
      console.log(error);
    }
  };

  return (
    <>
      <Header country={country} />
      {loading && <DotLoaderComponent loading={loading} />}
      <div className={styles.login}>
        <div className={styles.login__container}>
          <LoginHeader
            title="We'd be happy to join us !"
            subtitle="Go to store"
          />
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best eshopping in the world</p>
            <Formik
              enableReinitialize
              onSubmit={signInHandler}
              initialValues={{
                loginEmail: user.loginEmail,
                loginPassword: user.loginPassword,
                signupFullName: user.signupFullName,
                signupEmail: user.signupEmail,
                signupPassword: user.signupPassword,
                signupConfirmPassword: user.signupConfirmPassword,
              }}
              validationSchema={loginSchema}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="email"
                    name="loginEmail"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    IconComponent={SiMinutemailer}
                    value={user.loginEmail}
                  />
                  <LoginInput
                    type="password"
                    name="loginPassword"
                    placeholder="Password"
                    onChange={handleInputChange}
                    IconComponent={IoKeyOutline}
                    value={user.loginPassword}
                    autoComplete="on"
                  />
                  <CircledIconButton
                    type="submit"
                    title="Sign in"
                    IconComponent={BiRightArrowAlt}
                  />
                  <div>
                    {apiLoginMessage && (
                      <span className={styles.success}>{apiLoginMessage}</span>
                    )}
                  </div>
                  <div>
                    {apiLoginError && (
                      <span className={styles.error}>{apiLoginError}</span>
                    )}
                  </div>
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot Password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {providers.map((provider) => {
                  if (provider.name === "Credentials") return;
                  return (
                    <div key={provider.id}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <Image
                          width={20}
                          height={20}
                          src={`/icons/${provider.name}.png`}
                          alt="provider"
                        />
                        Sign in with{provider.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Get access to one of the best eshopping in the world</p>
            <Formik
              enableReinitialize
              onSubmit={signUpHandler}
              initialValues={{
                loginEmail: user.loginEmail,
                loginPassword: user.loginPassword,
                signupFullName: user.signupFullName,
                signupEmail: user.signupEmail,
                signupPassword: user.signupPassword,
                signupConfirmPassword: user.signupConfirmPassword,
              }}
              validationSchema={signupSchema}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="signupFullName"
                    placeholder="Full Name"
                    onChange={handleInputChange}
                    IconComponent={BiUser}
                    value={user.signupFullName}
                  />
                  <LoginInput
                    type="email"
                    name="signupEmail"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    IconComponent={SiMinutemailer}
                    value={user.signupEmail}
                  />
                  <LoginInput
                    type="password"
                    name="signupPassword"
                    placeholder="Password"
                    onChange={handleInputChange}
                    IconComponent={IoKeyOutline}
                    value={user.signupPassword}
                    autoComplete="on"
                  />
                  <LoginInput
                    type="password"
                    name="signupConfirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    IconComponent={IoKeyOutline}
                    value={user.signupConfirmPassword}
                    autoComplete="on"
                  />
                  <CircledIconButton
                    type="submit"
                    title="Sign up"
                    IconComponent={BiRightArrowAlt}
                  />
                </Form>
              )}
            </Formik>
            <div>
              {apiMessage && (
                <span className={styles.success}>{apiMessage}</span>
              )}
            </div>
            <div>
              {apiError && <span className={styles.error}>{apiError}</span>}
            </div>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, query } = context;
  const session = await getSession({ req });
  const  callbackUrl  = query.callbackUrl || "";

  if (session) {
    return {
      redirect: {
        destination: callbackUrl || "/",
      },
    };
  }

  const csrfToken = await getCsrfToken(context);
  const providers = Object.values((await getProviders()) as object);

  const countryServProps = await countryServerProps();
  return {
    props: {
      ...countryServProps.props,
      providers,
      csrfToken,
      callbackUrl,
    }, // will be passed to the page component as props
  };
}
