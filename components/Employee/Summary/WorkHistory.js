import { useState } from "react";
import moment from "moment";

import { Table } from "antd";

const WorkHistory = ({ userData }) => {
  const [experiencesList, setExperiencesList] = useState([
    ...userData.experience,
  ]);

  const columns = [
    {
      title: "លេខលិខិតយោង",
      dataIndex: "refNum",
      key: "refNum",
    },
    {
      title: "មុខតំណែង",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "អង្គភាព",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "ថ្ងៃខែឆ្នាំបញ្ចប់",
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
      <Table columns={columns} dataSource={experiencesList}></Table>
    </div>
  );
};

export default WorkHistory;
