import { useEffect, useState, useRef } from "react";

import styles from "@/styles/Footer.module.css";
import { useAnnouncements } from "@/lib/announcement/hooks";
import { useSession } from "next-auth/client";

const Footer = () => {
  const [temp, setTemp] = useState("Something Went Wrong");
  const { data = [] } = useAnnouncements();
  const [session, loading] = useSession();

  const marqueeRef = useRef(null);

  useEffect(async () => {
    const { cod, main } = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=phnom%20penh&units=metric&appid=058c4dbeb76422dd4385d2b21838334d"
    ).then((res) => res.json());
    if (cod == 200) {
      setTemp(main.temp + "°C");
    }
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.announcement}>
        <img src="/announcement.png" width="20" height="20"></img>
        <p>សេចក្ដីជូនដំណឹងក្រសួងយុត្តិធម៌</p>
      </div>

      {session?.user?.role !== "admin" && (
        <div className={styles.marquee}>
          <marquee
            ref={marqueeRef}
            behavior="scroll"
            direction="left"
            onMouseOver={() => {
              marqueeRef.current.stop();
            }}
            onMouseOut={() => {
              marqueeRef.current.start();
            }}
          >
            {data.map((v) => (
              <span>
                <a href={v.attachment} target="_blank">
                  {v.title}
                </a>
              </span>
            ))}
          </marquee>
        </div>
      )}

      {typeof window !== "undefined" && navigator.platform === "Win32" ? (
        <div className={styles.temp}>
          <span style={{ marginRight: "1rem" }}>Phnom Penh: {temp} </span>{" "}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Footer;
