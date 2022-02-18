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

export async function getServerSideProps({ params, req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  // await dbConnect();
  // const user = await User.findById(id)
  // if()
  // console.log(session);
  const res = await api.get("/api/users/" + params.id);
  if (!res) {
    return {
      notFound: true,
    };
  }
  const { user } = session;

  if (user.role == "user" && session.user.id !== res.data.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (user.role == "moderator") {
    const compareObj = {};
    let isAllow = false;
    if (user.moderatorType && res.data.latestOfficerStatus) {
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
      console.log(compareObj);
      isAllow = Object.keys(compareObj).every((current) => {
        return (
          res.data.latestOfficerStatus[current] ==
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
