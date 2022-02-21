import api from "@/utils/api";
// import Link from "next/link";
// import { Button } from "antd";
import styles from "@/styles/Employee.module.css";

import EditInfo from "@/components/Employee/EditInfo";

import structureMOJ from "data/FullStructureMOJ.json";
import ministryStructure from "data/Structure.json";
import statusOfficer from "data/StatusOfficer.json";
import ministryList from "data/Ministry.json";
import letterTypes from "data/LetterTypes.json";
import rankList from "data/Rank.json";
import provincesList from "data/Province.json";
import positionList from "data/Position.json";
import fileTypeName from "data/FileTypeName.json";
import roleMOJ from "data/RoleMOJ.json";
import dbConnect from "api-lib/dbConnect";
import { getSession } from "next-auth/client";
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
  return {
    props: {
      ministryStructure,
      statusOfficer,
      letterTypes,
      rankList,
      ministryList,
      provincesList,
      positionList,
      structureMOJ,
      fileTypeName,
      roleMOJ,
      user: JSON.parse(JSON.stringify(resUser)),
    },
  };
}

const Edit = ({
  ministryStructure,
  statusOfficer,
  ministryList,
  letterTypes,
  rankList,
  provincesList,
  positionList,
  fileTypeName,
  structureMOJ,
  roleMOJ,
  user,
}) => {
  return (
    <div style={{ padding: "25px 20px" }}>
      {/* <div style={{ marginBottom: 20 }}>
            <Button style={{ marginRight: 5 }} type="primary">
               <Link href={`/employee/${user.id}`}>
                  ព័ត៌មានប្រវត្តិរូបសង្ខេប
               </Link>
            </Button>
            <Button>កែប្រែព័ត៌មាន</Button>
         </div> */}
      <div className={styles.editInfoContainer}>
        <EditInfo
          userData={user}
          ministryStructure={ministryStructure}
          rankList={rankList}
          letterTypes={letterTypes}
          provincesList={provincesList}
          statusOfficer={statusOfficer}
          positionList={positionList}
          ministryList={ministryList}
          fileTypeName={fileTypeName}
          structureMOJ={structureMOJ}
          roleMOJ={roleMOJ}
        ></EditInfo>
      </div>
      <style jsx global>{`
        .ant-table-cell > span {
          display: flex;
          gap: 1.5em;
        }
      `}</style>
    </div>
  );
};

Edit.allowed_roles = ["admin", "editor"];

export default Edit;
