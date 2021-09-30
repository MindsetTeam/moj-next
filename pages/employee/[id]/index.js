import Head from "next/head";

import SummaryInfo from "@/components/Employee/SummaryInfo";
import EditInfo from "@/components/Employee/EditInfo";

import styles from "@/styles/Employee.module.css";

import { Tabs } from "antd";

const { TabPane } = Tabs;

import api from "@/utils/api";
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
      <div className={styles.employeeContainer}>
         <Head>
            <title>ព័ត៌មានមន្រ្តីរាជការ</title>
            <link rel="icon" href="/favicon.ico" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            ></meta>
         </Head>

         <div>
            <Tabs defaultActiveKey="1" onChange={null} type="card">
               <TabPane tab="ព័ត៌មានប្រវត្តិរូបសង្ខេប" key="1">
                  <SummaryInfo
                     userData={user}
                     ministryStructure={ministryStructure}
                     rankList={rankList}
                     letterTypes={letterTypes}
                     statusOfficer={statusOfficer}
                     ministryList={ministryList}
                  ></SummaryInfo>
               </TabPane>
               <TabPane tab="កែប្រែព័ត៌មាន" key="2">
                  <EditInfo
                     userData={user}
                     ministryStructure={ministryStructure}
                     rankList={rankList}
                     letterTypes={letterTypes}
                     statusOfficer={statusOfficer}
                     ministryList={ministryList}
                  ></EditInfo>
               </TabPane>
            </Tabs>
         </div>
      </div>
   );
}
