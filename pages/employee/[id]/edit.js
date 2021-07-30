import styles from "@/styles/Edit.module.css";
import SelfInfo from "@/components/Edit/selfInfo";
import ParentInfo from "@/components/Edit/parentInfo";
import SpouseInfo from "@/components/Edit/spouseInfo";
import ChildrenInfo from "@/components/Edit/childrenInfo";
import EducationInfo from "@/components/Edit/educationInfo";
import { Tabs } from "antd";
import api from "@/utils/api";

const { TabPane } = Tabs;

export async function getServerSideProps({ params }) {
  const res = await api.get("/api/users/" + params.id);
  console.log(res.data);

  return {
    props: {
      user: res.data,
    },
  };
}

const Edit = ({ user }) => {
  console.log(user);
  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="ព័ត៌មានផ្ទាល់ខ្លួន" key="1">
          <SelfInfo userData={user}></SelfInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានសហព័ទ្ធ" key="3">
          <SpouseInfo userData={user}></SpouseInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានកូន" key="4">
          <ChildrenInfo userData={user}></ChildrenInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានឪពុកម្តាយ" key="2">
          <ParentInfo userData={user}></ParentInfo>
        </TabPane>
        <TabPane tab="ព័ត៌មានកម្រិតវប្បធម៌" key="5">
          <EducationInfo userData={user}></EducationInfo>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Edit;
