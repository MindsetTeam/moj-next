import "../styles/globals.css";
import "antd/dist/antd.css";

import ProtectedLayout from "../components/ProtectedLayout";
import { AlertProvider } from "contexts/alert.context";

import { Provider } from "next-auth/client";
import GlobalLayout from "@/components/GlobalLayout";
import { SWRConfig } from "swr";
import Script from "next/script";
import Head from "next/head";
import { fetcher } from "@/lib/fetch";

function MyApp({ Component, pageProps }) {
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
          fetcher,
        }}
      >
        <Provider session={pageProps.session}>
          <AlertProvider>
            <GlobalLayout>
              {Component.withAuth === false ? (
                <Component {...pageProps} />
              ) : (
                <ProtectedLayout roles={Component.roles}>
                  <Component {...pageProps} />
                </ProtectedLayout>
              )}
            </GlobalLayout>
          </AlertProvider>
        </Provider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
