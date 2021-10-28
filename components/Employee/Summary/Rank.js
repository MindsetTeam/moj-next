import React, { useState } from "react";
import moment from "moment";
import { Table } from "antd";

const Rank = ({ userData }) => {
  const [rankList, setRankList] = useState([...userData.rank]);

  const columns = [
    {
      title: "លេខលិខិតយោង",
      dataIndex: "refNum",
      key: "refNum",
    },
    {
      title: "ប្រភេទលក្ខន្តិកៈ",
      dataIndex: "statueType",
      key: "statueType",
    },
    {
      title: "ក្របខ័ណ្ឌ",
      dataIndex: "framework",
      key: "framework",
    },
    {
      title: "ឋានន្តរសកិ្ត",
      dataIndex: "rankType",
      key: "rankType",
    },
    {
      title: "កម្រិតថ្នាក់",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "កំណត់សំគាល់",
      dataIndex: "otherNote",
      key: "otherNote",
    },
  ];

  return (
    <div style={{ paddingTop: 10 }}>
      <div>
        <Table columns={columns} dataSource={rankList}></Table>
      </div>
    </div>
  );
};

export default Rank;
