import "../styles/globals.css";
import "antd/dist/antd.css";

import ProtectedLayout from "../components/ProtectedLayout";
import { AlertProvider } from "contexts/alert.context";

import { Provider } from "next-auth/client";
import GlobalLayout from "@/components/GlobalLayout";
import { SWRConfig } from "swr";
import Script from "next/script";
import Head from "next/head";
import Cookies from "js-cookie";
import Redirect from "@/components/Redirect";

function MyApp({ Component, pageProps }) {
  const authCookie = Cookies.get("authorization");

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      {Component.name !== "login" && (
        <Script src="js/auth.js" strategy="beforeInteractive" />
      )}

      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <Provider session={pageProps.session}>
          <AlertProvider>
            <GlobalLayout>
              {Component.withAuth === false ? (
                <Component {...pageProps} />
              ) : authCookie ? (
                <ProtectedLayout roles={Component.roles}>
                  <Component {...pageProps} />
                </ProtectedLayout>
              ) : (
                <Redirect />
              )}
            </GlobalLayout>
          </AlertProvider>
        </Provider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
