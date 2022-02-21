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
import { useSession, getSession } from "next-auth/client";
import dbConnect from "api-lib/dbConnect";
import User from "@/models/User";

export async function getServerSideProps({ params, req }) {
  const { id } = params;
  const session = await getSession({ req });
  const { user } = session;
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.role == "user" && user.id !== id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  await dbConnect();
  const resUser = await User.findById(id)
  if (!resUser) {
    return {
      notFound: true,
    };
  }
  if (user.role == "moderator") {
    const compareObj = {};
    let isAllow = false;
    if (user.moderatorType && resUser.latestOfficerStatus) {
      if (
        ["unit", "generalDepartment", "department"].includes(user.moderatorType)
      ) {
        compareObj.generalDepartment =
          user.latestOfficerStatus.generalDepartment;
      }
      if (["generalDepartment", "department"].includes(user.moderatorType)) {
        compareObj.department = user.latestOfficerStatus.department;
      }
      if (user.moderatorType == "department") {
        compareObj.office = user.latestOfficerStatus.office;
      }

      isAllow = Object.keys(compareObj).every((current) => {
        return (
         resUser.latestOfficerStatus[current] ==
          user.latestOfficerStatus[current]
        );
      });
    }
    if (!user.moderatorType || !isAllow) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
  }
  // try {
  //   const res1 = await fetchSingleEmployee(params.id, req.cookies);
  //   console.log(res1);
  // } catch (error) {
  //   console.log(error);
  // }
  return {
    props: {
      ministryStructure,
      statusOfficer,
      letterTypes,
      rankList,
      ministryList,
      user: JSON.parse(JSON.stringify(resUser)),
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
