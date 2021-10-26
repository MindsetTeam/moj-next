import api from "@/utils/api";
import Link from "next/link";

import { Button } from "antd";

import styles from "@/styles/Employee.module.css";

import EditInfo from "@/components/Employee/EditInfo";

import ministryStructure from "data/Structure.json";
import statusOfficer from "data/StatusOfficer.json";
import ministryList from "data/Ministry.json";
import letterTypes from "data/LetterTypes.json";
import rankList from "data/Rank.json";

export async function getServerSideProps({ params }) {
  const res = await api.get("/api/users/" + params.id);
  console.log(res.data);

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

const Edit = ({
  ministryStructure,
  statusOfficer,
  ministryList,
  letterTypes,
  rankList,
  user,
}) => {
  console.log(user);
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
          statusOfficer={statusOfficer}
          ministryList={ministryList}
        ></EditInfo>
      </div>
    </div>
  );
};

Edit.allowed_roles = ["admin", "editor"];

export default Edit;
