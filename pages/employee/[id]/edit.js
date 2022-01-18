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

export async function getServerSideProps({ params }) {
  const res = await api.get("/api/users/" + params.id);

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
      user: res.data,
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
