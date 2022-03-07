import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import { signOut } from "next-auth/client";
import Cookies from "js-cookie";

const SECONDS_IN_20MM = 60 * 20;
export default function Timer() {
  const router = useRouter();
  const [second, setSecond] = useState(SECONDS_IN_20MM);
  const interval = useRef();
  useEffect(() => {
    interval.current = setInterval(() => {
      setSecond((v) => v - 1);
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);
  useEffect(() => {
    setSecond(SECONDS_IN_20MM);
  }, [router]);

  useEffect(() => {
    if (second <= 0) {
      signOut({ redirect: false }).then(() => {
        Cookies.remove("authorization");
      });
    }
  }, [second]);

  return (
    <span
      style={{ position: "absolute", bottom: "0%", left: "1%", color: "white" }}
    >
      {Math.floor(second / 60) + ":" + (second % 60)}នាទី
    </span>
  );
}
