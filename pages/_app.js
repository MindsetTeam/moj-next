import "../styles/globals.css";
import "antd/dist/antd.css";

import ProtectedLayout from "../components/ProtectedLayout";
import { AlertProvider } from "contexts/alert.context";

import { Provider, signOut, useSession } from "next-auth/client";
import GlobalLayout from "@/components/GlobalLayout";
import { SWRConfig } from "swr";
import Script from "next/script";
import Head from "next/head";
import { fetcher } from "@/lib/fetch";
import Cookies from "js-cookie";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  // const [session] = useSession();

  // console.log(session);
  useEffect(() => {
    //detect when user close browser or tab is closed
    //TODO: Add "Remember me" feature for login page
    if (typeof window !== "undefined") {
      window.addEventListener("beforeunload", function (e) {
        e.preventDefault();
        signOut({ redirect: false }).then(() => {
          Cookies.remove("authorization");
        });
        e.returnValue = "";
      });
    }
  }, []);
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
                <ProtectedLayout roles={Component.allowed_roles}>
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
