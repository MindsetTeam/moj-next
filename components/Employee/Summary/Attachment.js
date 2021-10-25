import React, { useState } from "react";

import { Table, Button } from "antd";

import { DownloadOutlined } from "@ant-design/icons";

const attachmentTypeName = {
  info: "ឯកសារផ្ទាល់ខ្លួន",
  rank: "ឋានន្តរសកិ្ត និងថ្នាក់",
  education: "សញ្ញាបត្រ",
  marriage: "សំបុត្រអាពាហ៍ពិពាហ៍",
  child: "សំបុត្រកំណើតកូន",
};
const Attachment = ({ userData }) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [attachmentList, setAttachmentList] = useState(() => {
    return Object.keys(userData.attachment).map((v, i) => {
      console.log(i);
      const returnObject = {
        key: i,
        type: attachmentTypeName[v],
      };
      if (userData.attachment[v].length) {
        returnObject.children = userData.attachment[v].map((val) => ({
          ...val,
          parent: v,
        }));
      }
      return returnObject;
    });
  });
  const columns = [
    {
      title: "ប្រភេទឯកសារ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "ឯកសារ",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "ផ្សេងៗ",
      key: "action",
      align: "center",
      render: (text, record) => {
        if (record._id) {
          return (
            <a href={record.url} target="_blank">
              ទាញយក
            </a>
          );
        }
      },
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const download = () => {
    console.log(selectedRows);
  };

  return (
    <div style={{ paddingTop: 10 }}>
      {/* <Button
        style={{ marginRight: 8, marginBottom: 20 }}
        onClick={download}
        icon={<DownloadOutlined></DownloadOutlined>}
      >
        ទាញយកឯកសារ
      </Button> */}
      <Table
        columns={columns}
        dataSource={attachmentList}
        expandable={{
         defaultExpandAllRows: true,
       }}
        //   rowSelection={{
        //     type: "checkbox",
        //      checkStrictly: false,
        //     ...rowSelection,
        //   }
        // }
      ></Table>
    </div>
  );
};

export default Attachment;
