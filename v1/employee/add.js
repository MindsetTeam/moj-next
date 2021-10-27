// import styles from "../../styles/Edit.module.css";
// import SelfInfo from "../../components/Add/selfInfo";
// import ParentInfo from "../../components/Add/parentInfo";
// import SpouseInfo from "../../components/Add/spouseInfo";
// import ChildrenInfo from "../../components/Add/childrenInfo";
// import EducationInfo from "../../components/Add/educationInfo";

// import { Tabs } from "antd";
// import api from "@/utils/api";
// import { createEmployee } from "api/EmployeeAPI";
// import { useRouter } from "next/router";

// const { TabPane } = Tabs;

// const Add = () => {
//   const router = useRouter();
//   const saveEmployee = async (body) => {
//    //  const res = await createEmployee(body);
//    //  console.log(res);
//    //  if (res.success) {
//    //    router.push("/employee/" + res.data.id);
//    //  }
//    try {
//       const {data} = await api.post("/api/auth/register", body);
//       router.push('/employee/'+data.data.id)
//    } catch (error) {
//       console.log(error);
//    }

//   };
//   return (
//     <div className={styles.container}>
//       <Tabs defaultActiveKey="1">
//         <TabPane tab="ព័ត៌មានផ្ទាល់ខ្លួន" key="1">
//           <SelfInfo createEmployee={saveEmployee}></SelfInfo>
//         </TabPane>
//         <TabPane tab="ព័ត៌មានឪពុកម្តាយ" key="2">
//           <ParentInfo></ParentInfo>
//         </TabPane>
//         <TabPane tab="ព័ត៌មានសហព័ទ្ធ" key="3">
//           <SpouseInfo></SpouseInfo>
//         </TabPane>
//         <TabPane tab="ព័ត៌មានកូន" key="4">
//           <ChildrenInfo></ChildrenInfo>
//         </TabPane>
//         <TabPane tab="ព័ត៌មានកម្រិតវប្បធម៌" key="5">
//           <EducationInfo></EducationInfo>
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default Add;

const add = () => {
   return (
      <div>
         <p>Add User</p>
      </div>
   );
};

export default add;
