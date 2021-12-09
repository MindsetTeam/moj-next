import styles from "@/styles/Print.module.css";
import { Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import moment from "moment";
import "moment/locale/km";

const index = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(async () => {
    const user = await fetch(`/api/users/${router.query.id}`).then((res) =>
      res.json()
    );
    setUser(user);
  }, [router]);
  return (
    <>
      <style jsx>{`
        #section-to-print h1 {
          font-size: 1.2em;
          margin: 0;
          font-weight: bold;
        }
        #section-to-print .tacteng {
          font-family: tacteng;
          font-size: 2.2em;
          margin-top: -20px;
        }

        .text-center {
          text-align: center;
        }

        @media print {
          body marquee,
          marquee * {
            display: none;
            visibility: hidden;
          }
          body * {
            visibility: hidden;
          }

          body *:not(#section-to-print *) {
            height: 0px;
          }
          #section-to-print,
          #section-to-print * {
            visibility: visible;
          }
          #section-to-print {
            display: flex;
            flex-direction: column;
            padding: 0px 45px;
            margin: 0;
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .container {
          background: white;
          height: 100%;
          margin: auto;
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .front-card-container {
          width: 550px;
          /* height: 400px; */
          font-size: 0.9em;
          padding: 20px;
          border: 1px solid #000;
          border-radius: 15px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }

        /* Front Top */
        .front-card-container .top-section .profile {
          margin-right: 10px;
        }

        .front-card-container .top-section .profile img {
          width: 160px;
          height: 180px;
        }

        .front-card-container .top-section {
          display: flex;
          font-style: italic;
        }

        .front-card-container .top-section table tr td:nth-child(3n + 3) {
          color: rgb(34, 34, 185);
        }

        /* Front Bottom */
        .front-card-container .bottom-section {
          display: flex;
        }

        .front-card-container .bottom-section .card-info {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          margin-top: 12px;
          font-size: 0.8rem;
          font-style: italic;
          color: rgb(34, 34, 185);
        }

        .front-card-container .bottom-section .card-info .qrcode img {
          /* padding-left: 30px; */
          width: 90px;
        }

        .front-card-container .bottom-section .signature {
          flex: 1;
          text-align: center;
          font-size: 1.2rem;
          color: rgb(34, 34, 185);
          font-family: "Moul", serif;
        }

        /* Back Card */

        .back-card-container {
          font-family: "Moul", serif;
          width: 550px;
          height: 325px;
          padding: 20px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          font-size: 1.2rem;
          color: rgb(34, 34, 185);
          border: 1px solid #000;
          border-radius: 15px;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }

        .back-card-container .logo img {
          width: 170px;
        }
      `}</style>
      <div className={styles.printCardContainer}>
        <Button
          icon={<PrinterOutlined />}
          onClick={() => {
            window.print();
          }}
        >
          បោះពុម្ព
        </Button>

        <div className="container" id="section-to-print">
          <div className="front-card-container">
            <div className="top-section">
              <div className="profile">
                <img
                  src={user?.photo || "/card/user.png"}
                  alt=""
                  style={{ objectFit: "contain" }}
                />
              </div>
              <table>
                <tr>
                  <td>គោត្តនាម-នាម</td>
                  <td>:</td>
                  <td>{user?.firstName + " " + user?.lastName}</td>
                  <td>ភេទ </td>
                  <td>:</td>
                  <td>{user?.gender}</td>
                </tr>
                <tr>
                  <td>អក្សរពុម្ពឡាតាំង </td>
                  <td>:</td>
                  <td>{user?.firstNameLatin + " " + user?.lastNameLatin}</td>
                </tr>
                <tr>
                  <td>ថ្ងៃខែឆ្នាំកំណើត </td>
                  <td>:</td>

                  <td>{moment(user?.birthDate).format("DD-MMMM-YYYY")}</td>
                </tr>
                <tr>
                  <td>មុខតំណែង </td>
                  <td>:</td>

                  <td>
                    {user?.experience?.[user?.experience?.length - 1]?.position}
                  </td>
                </tr>
                <tr>
                  <td>អង្គភាព </td>
                  <td>:</td>

                  <td>
                    {user?.experience?.[user?.experience?.length - 1]
                      ?.department ||
                      user?.experience?.[user?.experience?.length - 1]?.unit}
                  </td>
                </tr>
                <tr>
                  <td>អត្តលេខ </td>
                  <td>:</td>

                  <td>{user?.civilID}</td>
                </tr>
              </table>
            </div>
            <div className="bottom-section">
              <div className="card-info">
                <div className="qrcode">
                  <img src="/card/qrcode.png" alt="" />
                </div>
                <div>
                  <table>
                    <tr>
                      <td>លេខរៀងប័ណ្ណ</td>
                      <td>:</td>
                      <td>{user?.officerID}</td>
                    </tr>
                    <tr>
                      <td>ថ្ងៃចេញប័ណ្ណ</td>
                      <td>:</td>
                      <td>{moment().format("DD-MMMM-YYYY")}</td>
                    </tr>
                    <tr>
                      <td>មានសុពលភាព</td>
                      <td>:</td>
                      <td>{moment().add(1, "y").format("DD-MMMM-YYYY")}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className="signature">
                <p>រដ្ឋមន្រ្ដីក្រសួងយុត្តិធម៌</p>
              </div>
            </div>
          </div>
          <div className="back-card-container">
            <div>
              <p>ព្រះរាជាណាចក្រកម្ពុជា</p>
              <p>ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
            </div>
            <div className="logo">
              <img src="/card/logo.png" alt="" />
            </div>
            <div>
              <p>ក្រសួងយុត្តិធម៌</p>
              <p>ប័ណ្ណសម្គាល់ខ្លួនមន្រ្ដីរាជការ</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
index.allowed_roles = ["admin", "editor"];

export default index;
