import "nprogress/nprogress.css";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

import { Layout as LayoutAnt } from "antd";
const { Content } = LayoutAnt;
import { useSession } from "next-auth/client";

// import Slider from "./Slider";
import Header from "./Header";
import Footer from "./Footer";
import Cookies from "js-cookie";
import RedirectLogin from "./RedirectLogin";

NProgress.configure({
  trickleRate: 0.02,
  trickleSpeed: 800,
  showSpinner: false,
});
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const Layout = ({ children, roles = [] }) => {
  const [session, loading] = useSession();
  const router = useRouter();
  const authCookie = Cookies.get("authorization");
  if (loading) {
    return null;
  }
  if (!session || !authCookie) {
    router.push(`/login?referer=${encodeURIComponent(router.asPath)}`);
    return null;
  }
  if (roles.length != 0 && !roles.includes(session?.user?.role)) {
    router.push(`/`);
    return null;
  }
  // console.log(roles,session)
  //   useEffect(() => {
  //     if (loading) {
  //       return null;
  //     }
  //     if (!session || !authCookie) {
  //       router.push(`/login?referer=${encodeURIComponent(router.asPath)}`);
  //       return null;
  //     }
  //     if (roles.length != 0 && !roles.includes(session?.user?.role)) {
  //       router.push(`/`);
  //       return null;
  //     }
  //   }, [session]);

  if (!authCookie) {
    return <RedirectLogin />;
  }

  return (
    <>
      {/* <Slider /> */}
      <LayoutAnt className="site-layout">
        <Header></Header>
        <Content style={{ paddingTop: 25 }}>{children}</Content>
        <Footer></Footer>
      </LayoutAnt>
    </>
  );
};

export default Layout;
