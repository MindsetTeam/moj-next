import { useState } from "react";

import { Tabs } from "antd";

// import styles from "@/styles/Employee.module.css";

import SelfInfo from "@/components/Employee/Edit/SelfInfo";
import ParentInfo from "@/components/Employee/Edit/ParentInfo";
import SpouseInfo from "@/components/Employee/Edit/SpouseInfo";
import EducationInfo from "@/components/Employee/Edit/EducationInfo";
import WorkHistoryInfo from "@/components/Employee/Edit/WorkHistoryInfo";
import RankInfo from "@/components/Employee/Edit/RankInfo";
import StatusInfo from "@/components/Employee/Edit/StatusInfo";
// import PraiseInfo from "@/components/Employee/Edit/PraiseInfo";
// import PenaltyInfo from "@/components/Employee/Edit/PenaltyInfo";
import AttachmentInfo from "@/components/Employee/Edit/AttachmentInfo";

const { TabPane } = Tabs;

const EditInfo = ({
   userData,
   ministryStructure,
   statusOfficer,
   ministryList,
   letterTypes,
   provincesList,
   positionList,
   fileTypeName,
   structureMOJ,
   rankList,
}) => {
   const [activeTabKey, setActiveTabKey] = useState("1");
   const [familyStatusInfo, setFamilyStatusInfo] = useState(
      userData.familyStatus
   );
   const onChangeTabKey = (key) => {
      setActiveTabKey(key);
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   return (
      <div>
         <Tabs
            activeKey={activeTabKey}
            onTabClick={(e) => {
               setActiveTabKey(e);
            }}
         >
            <TabPane tab="ព័ត៌មានផ្ទាល់ខ្លួន" key="1">
               <SelfInfo
                  userData={userData}
                  onChangeTabKey={onChangeTabKey}
                  setFamilyStatusInfo={setFamilyStatusInfo}
               ></SelfInfo>
            </TabPane>
            {familyStatusInfo !== "នៅលីវ" && (
               <TabPane tab="អំពីសហព័ទ្ធ" key="2">
                  <SpouseInfo
                     userData={userData}
                     familyStatusInfo={familyStatusInfo}
                     onChangeTabKey={onChangeTabKey}
                  ></SpouseInfo>
               </TabPane>
            )}

            {/* <TabPane tab="ព័ត៌មានកូន" key="3">
               <ChildrenInfo userData={user}></ChildrenInfo>
            </TabPane> */}
            <TabPane tab="អំពីឪពុកម្តាយ" key="3">
               <ParentInfo
                  userData={userData}
                  onChangeTabKey={onChangeTabKey}
               ></ParentInfo>
            </TabPane>
            <TabPane tab="កម្រិតវប្បធម៌" key="4">
               <EducationInfo userData={userData}></EducationInfo>
            </TabPane>
            <TabPane tab="​​ក្របខណ្ឌ ឋានន្តរសកិ្ត និងថ្នាក់" key="5">
               <RankInfo userData={userData}></RankInfo>
            </TabPane>
            <TabPane tab="ប្រវត្តិការងារ" key="6">
               <WorkHistoryInfo
                  userData={userData}
                  provincesList={provincesList}
                  ministryStructure={ministryStructure}
                  positionList={positionList}
               ></WorkHistoryInfo>
            </TabPane>
            <TabPane tab="ស្ថានភាពមន្រ្ដី" key="7">
               <StatusInfo
                  onChangeTabKey={onChangeTabKey}
                  userData={userData}
                  rankList={rankList}
                  letterTypes={letterTypes}
                  positionList={positionList}
                  ministryList={ministryList}
                  structureMOJ={structureMOJ}
                  statusOfficer={statusOfficer}
                  ministryStructure={ministryStructure}
               ></StatusInfo>
            </TabPane>
            {/* <TabPane tab="ព័ត៌មានការដាក់ពិន័យ" key="8">
          <PenaltyInfo userData={userData}></PenaltyInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានការលើកសសើរ" key="9">
          <PraiseInfo userData={userData}></PraiseInfo>
        </TabPane> */}
            <TabPane tab="ឯកសារយោង" key="8">
               <AttachmentInfo
                  userData={userData}
                  fileTypeName={fileTypeName}
               ></AttachmentInfo>
            </TabPane>
         </Tabs>
      </div>
   );
};

export default EditInfo;
