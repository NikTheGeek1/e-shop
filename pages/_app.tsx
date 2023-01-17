import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import translations from "../language-translations/all";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

let persistor = persistStore(store);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>{translations.headTitle.en}</title>
        <meta name="description" content={translations.headDescription.en} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <PayPalScriptProvider
            deferLoading={true}
            options={{
              "client-id": process.env.PAYPAL_CLIENT_ID as string,
            }}
          >
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </PayPalScriptProvider>
        </Provider>
      </SessionProvider>
    </>
  );
}
