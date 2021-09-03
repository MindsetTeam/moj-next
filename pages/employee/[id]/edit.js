import styles from "@/styles/Edit.module.css";
import SelfInfo from "@/components/Edit/selfInfo";
import ParentInfo from "@/components/Edit/parentInfo";
import SpouseInfo from "@/components/Edit/spouseInfo";
import ChildrenInfo from "@/components/Edit/childrenInfo";
import EducationInfo from "@/components/Edit/educationInfo";
import WorkHistoryInfo from "@/components/Edit/workHistoryInfo";
import RankInfo from "@/components/Edit/rankInfo";
import StatusInfo from "@/components/Edit/statusInfo";
import PraiseInfo from "@/components/Edit/praiseInfo";
import PenaltyInfo from "@/components/Edit/penaltyInfo";
import { Tabs } from "antd";
import api from "@/utils/api";

import ministryStructure from "data/Structure.json";
import statusOfficer from "data/StatusOfficer.json";
import ministryList from "data/Ministry.json";
import letterTypes from "data/LetterTypes.json";
import rankList from "data/Rank.json";
import { useState } from "react";

const { TabPane } = Tabs;

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
  const [activeTabKey, setActiveTabKey] = useState("1");
  const [familyStatusInfo, setFamilyStatusInfo] = useState(user.familyStatus);
  const onChangeTabKey = (key) => {
    setActiveTabKey(key);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.container}>
      <Tabs
        activeKey={activeTabKey}
        onTabClick={(e) => {
          setActiveTabKey(e);
        }}
      >
        <TabPane tab="ព័ត៌មានផ្ទាល់ខ្លួន" key="1">
          <SelfInfo
            userData={user}
            onChangeTabKey={onChangeTabKey}
            setFamilyStatusInfo={setFamilyStatusInfo}
          ></SelfInfo>
        </TabPane>
        {familyStatusInfo !== "នៅលីវ" && (
          <TabPane tab="ព័ត៌មានសហព័ទ្ធ" key="2">
            <SpouseInfo
              userData={user}
              familyStatusInfo={familyStatusInfo}
              onChangeTabKey={onChangeTabKey}
            ></SpouseInfo>
          </TabPane>
        )}

        {/* <TabPane tab="ព័ត៌មានកូន" key="3">
               <ChildrenInfo userData={user}></ChildrenInfo>
            </TabPane> */}
        <TabPane tab="ព័ត៌មានឪពុកម្តាយ" key="3">
          <ParentInfo
            userData={user}
            onChangeTabKey={onChangeTabKey}
          ></ParentInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានកម្រិតវប្បធម៌" key="4">
          <EducationInfo userData={user}></EducationInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានឋានន្តរសកិ្ត និងថ្នាក់" key="5">
          <RankInfo userData={user}></RankInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានប្រវត្តិការងារ" key="6">
          <WorkHistoryInfo
            userData={user}
            ministryStructure={ministryStructure}
          ></WorkHistoryInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានស្ថានភាពមន្រ្ដី" key="7">
          <StatusInfo
            onChangeTabKey={onChangeTabKey}
            userData={user}
            rankList={rankList}
            letterTypes={letterTypes}
            ministryList={ministryList}
            statusOfficer={statusOfficer}
          ></StatusInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានការដាក់ពិន័យ" key="8">
          <PenaltyInfo userData={user}></PenaltyInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានការលើកសសើរ" key="9">
          <PraiseInfo userData={user}></PraiseInfo>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Edit;
