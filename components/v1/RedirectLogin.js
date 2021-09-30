import { useRouter } from "next/router";
import { useEffect } from "react";

const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/login?referer=${encodeURIComponent(router.asPath)}`);
  }, []);
  return null;
};

export default Redirect;
