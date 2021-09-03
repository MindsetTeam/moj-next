import React, { useState } from "react";

import {
   Table,
} from "antd";

import { UserOutlined } from "@ant-design/icons";

const Education = ({userData}) => {
   const [educationLevel, setEducationLevel] = useState(userData?.education || []);
   const [foreignLangLevel, setForeignLangLevel] = useState(null);

   const educationLevelColumns = [
      {
         title: "វគ្គសិក្សា",
         dataIndex: "course",
         key: "course",
      },
      {
         title: "វគ្គបណ្តុះបណ្តាលផ្សេងៗ",
         dataIndex: "other",
         key: "other",
      },
      {
         title: "កម្រិតសិក្សា",
         dataIndex: "level",
         key: "level",
      },
      {
         title: "សញ្ញាប័ត្រ",
         dataIndex: "degreeType",
         key: "degreeType",
      },
      {
         title: "គ្រឹះស្ថានសិក្សា",
         dataIndex: "institution",
         key: "institution",
      },
      {
         title: "ទីកន្លែងសិក្សា",
         dataIndex: "place",
         key: "place",
      },
      {
         title: "ឆ្នាំចូលសិក្សា",
         dataIndex: "startYear",
         key: "startYear",
      },
      {
         title: "ឆ្នាំបញ្ចប់សិក្សា",
         dataIndex: "endYear",
         key: "endYear",
      },
   ];

   const foreignLangLevelColumns = [
      {
         title: "ភាសារ",
         dataIndex: "language",
         key: "language",
      },
      {
         title: "ស្តាប់",
         dataIndex: "listening",
         key: "listening",
      },
      {
         title: "និយាយ",
         dataIndex: "speaking",
         key: "speaking",
      },
      {
         title: "សរសេរ",
         dataIndex: "writing",
         key: "writing",
      },
   ];

   return (
      <div>
         <div style={{ marginBottom: 30 }}>
            <h1 style={{ marginBottom: 20 }}>
               <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
               កម្រិតវប្បធម៌
            </h1>
            <div style={{ marginTop: 20 }}>
               <Table
                  columns={educationLevelColumns}
                  dataSource={educationLevel}
               ></Table>
            </div>
         </div>
         {/* <div>
            <h1 style={{ marginBottom: 20 }}>
               <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
               កម្រិតភាសារបរទេស
            </h1>
            <div style={{ marginTop: 20 }}>
               <Table
                  columns={foreignLangLevelColumns}
                  dataSource={foreignLangLevel}
               ></Table>
            </div>
         </div> */}
      </div>
   );
};

export default Education;
