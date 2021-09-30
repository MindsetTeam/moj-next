import React, { useState } from "react";

import { Table } from "antd";

import { UserOutlined } from "@ant-design/icons";

const Education = ({ userData }) => {
   const [educationLevel, setEducationLevel] = useState(
      userData?.education || []
   );

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

   return (
      <div style={{ paddingTop: 10 }}>
         <div>
            <Table
               columns={educationLevelColumns}
               dataSource={educationLevel}
            ></Table>
         </div>
      </div>
   );
};

export default Education;
