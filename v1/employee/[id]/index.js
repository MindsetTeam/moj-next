import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
import styles from "@/styles/v1/Employee.module.css";

import { Tabs } from "antd";

// import {
//    HomeOutlined,
//    DatabaseOutlined,
//    UserOutlined,
// } from "@ant-design/icons";

const { TabPane } = Tabs;

import General from "@/components/v1/Employee/General";
import Rank from "@/components/v1/Employee/Rank";
import Family from "@/components/v1/Employee/Family";
import Education from "@/components/v1/Employee/Education";
import WorkHistory from "@/components/v1/Employee/WorkHistory";
import Status from "@/components/v1/Employee/Status";
import Praise from "@/components/v1/Employee/Praise";
import Penalty from "@/components/v1/Employee/Penalty";
import Attachment from "@/components/v1/Employee/Attachment";

import api from "@/utils/api";
// import { readFileFolderData } from "@/lib/ReadFileFolderData";
import ministryStructure from "data/Structure.json";
import statusOfficer from "data/StatusOfficer.json";
import ministryList from "data/Ministry.json";
import letterTypes from "data/LetterTypes.json";
import rankList from "data/Rank.json";

export async function getServerSideProps({ params }) {
   const res = await api.get("/api/users/" + params.id);
   return {
      props: {
         ministryStructure,
         statusOfficer,
         letterTypes,
         rankList,
         ministryList,
         user: res.data,
      },
   };
}

export default function Home({
   ministryStructure,
   statusOfficer,
   ministryList,
   letterTypes,
   rankList,
   user,
}) {
   return (
      <div className={styles.container}>
         <Head>
            <title>ព័ត៌មានមន្រ្តីរាជការ</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            ></meta>
         </Head>

         <div className={styles.userInfo}>
            {/* Specific Info */}
            <Tabs
               defaultActiveKey="1"
               size="small"
               className={styles.specificInfo}
               centered
            >
               <TabPane
                  tab={
                     <span>
                        <img src="/user.png" width="30" height="30" />
                        ព័ត៌មានទូទៅ
                     </span>
                  }
                  key="1"
               >
                  <General userData={user}></General>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/rank.png" width="30" height="30" />
                        ឋានន្តរសកិ្ត និងថ្នាក់
                     </span>
                  }
                  key="2"
               >
                  <Rank userData={user}></Rank>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/family.png" width="30" height="30" />
                        គ្រួសារ
                     </span>
                  }
                  key="3"
               >
                  <Family userData={user}></Family>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/education.png" width="30" height="30" />
                        កម្រិតវប្បធម៌
                     </span>
                  }
                  key="4"
               >
                  <Education userData={user}></Education>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/work.png" width="30" height="30" />
                        ប្រវត្តិការងារ
                     </span>
                  }
                  key="5"
               >
                  <WorkHistory
                     userData={user}
                     ministryStructure={ministryStructure}
                  ></WorkHistory>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/status.png" width="30" height="30" />
                        ស្ថានភាពមន្រ្ដី
                     </span>
                  }
                  key="6"
               >
                  <Status
                     userData={user}
                     rankList={rankList}
                     letterTypes={letterTypes}
                     ministryList={ministryList}
                     statusOfficer={statusOfficer}
                  ></Status>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/penalty.png" width="30" height="30" />
                        ការដាក់ពិន័យ
                     </span>
                  }
                  key="7"
               >
                  <Penalty userData={user}></Penalty>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/praise.png" width="30" height="30" />
                        ការលើកសសើរ
                     </span>
                  }
                  key="8"
               >
                  <Praise userData={user}></Praise>
               </TabPane>
               <TabPane
                  tab={
                     <span>
                        <img src="/attachment.png" width="30" height="30" />
                        ឯកសារយោង
                     </span>
                  }
                  key="9"
               >
                  <Attachment></Attachment>
               </TabPane>
            </Tabs>
         </div>
         <style global jsx>{`
            .ant-tabs-tab-btn span {
               display: flex;
               flex-direction: column;
               align-items: center;
               gap: 1rem;
            }
            .ant-tabs-tab-btn .anticon {
               margin-right: 0;
            }
         `}</style>
      </div>
   );
}
