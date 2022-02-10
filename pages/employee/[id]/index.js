import Head from "next/head";
import Link from "next/link";

import SummaryInfo from "@/components/Employee/SummaryInfo";

import styles from "@/styles/Employee.module.css";

import { Button } from "antd";

import api from "@/utils/api";
import ministryStructure from "data/Structure.json";
import statusOfficer from "data/StatusOfficer.json";
import ministryList from "data/Ministry.json";
import letterTypes from "data/LetterTypes.json";
import rankList from "data/Rank.json";
import { useSession,getSession } from "next-auth/client";

import { fetchSingleEmployee } from "api/Employee";

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req })
  console.log(session);
  // try {
  //   const res1 = await fetchSingleEmployee(params.id, req.cookies);
  //   console.log(res1);
  // } catch (error) {
  //   console.log(error);
  // }
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
  const [session] = useSession();
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
        <div>
          <Button style={{ marginRight: 5 }}>ព័ត៌មានប្រវត្តិរូបសង្ខេប</Button>
          {session?.user.role === "user" ||
          session?.user.role === "moderator" ? null : (
            <Button type="primary">
              <Link href={`/employee/${user.id}/edit`}>កែប្រែព័ត៌មាន</Link>
            </Button>
          )}
        </div>

        <SummaryInfo
          userData={user}
          ministryStructure={ministryStructure}
          rankList={rankList}
          letterTypes={letterTypes}
          statusOfficer={statusOfficer}
          ministryList={ministryList}
        ></SummaryInfo>
      </div>
    </div>
  );
}
