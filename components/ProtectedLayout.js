import "nprogress/nprogress.css";
import { useEffect } from "react";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

import { Layout as LayoutAnt } from "antd";
const { Content } = LayoutAnt;
import { useSession } from "next-auth/client";

import Slider from "./Slider";
import Header from "./Header";
import Breadcrumb from "./Breadcrumb";
import Footer from "./Footer";
import Cookies from "js-cookie";

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

  useEffect(() => {
    if ((!loading && !session) || !authCookie) {
      router.push(`/login?referer=${encodeURIComponent(router.asPath)}`);
      return null;
    }
    if (roles.length != 0 && !roles.includes(session?.user.role)) {
      router.push(`/`);
      return null;
    }
  }, [session]);

  return (
    <>
      <Slider />
      <LayoutAnt className="site-layout">
        <Header></Header>
        <Content>
          <Breadcrumb></Breadcrumb>
          {children}
        </Content>
        <Footer></Footer>
      </LayoutAnt>
    </>
  );
};

export default Layout;