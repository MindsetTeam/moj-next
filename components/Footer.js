import { useEffect, useState } from "react";

import styles from "@/styles/Footer.module.css";

const Footer = () => {
   const [temp, setTemp] = useState("Something Went Wrong");
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

         {typeof window !== "undefined" && navigator.platform === "Win32" ? (
            <div style={{ display: "flex", alignItems: "center" }}>
               <span style={{ marginRight: "1rem" }}>Phnom Penh: {temp} </span>{" "}
               Time:{" "}
               <svg
                  style={{ width: "1.2rem" }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
               </svg>
            </div>
         ) : (
            <div></div>
         )}
      </div>
   );
};

export default Footer;
