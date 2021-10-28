import React, { useState } from "react";
import moment from 'moment'

import { Table } from "antd";

// import { UserOutlined } from "@ant-design/icons";

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
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "ឆ្នាំបញ្ចប់សិក្សា",
      dataIndex: "endDate",
      key: "endDate",
      render: (text) => {
        return text
          ? moment(text).local(true).format("DD/MM/YYYY")
          : "បច្ចុប្បន្ន";
      },
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
