import React, { useState } from "react";

import { Table, Button } from "antd";

import { DownloadOutlined } from "@ant-design/icons";

const attachmentTypeName = {
  info: "ព័ត៌មានផ្ទាល់ខ្លួន",
  family: "ព័ត៌មានគ្រួសារ",
  rank: "ក្របខណ្ឌ ឋាន្តរស័ក្តិ និងថ្នាក់",
  work: "ប្រវត្តិការងារ",
  education: "ប្រវត្តិការសិក្សា",
  status: "ស្ថានភាពមន្រ្តី",
  medal: "ឯកសារគ្រឿងឥស្សរិយយស",
};

const Attachment = ({ userData }) => {
  const [selectedRows, setSelectedRows] = useState(null);
  const [attachmentList, setAttachmentList] = useState(() => {
    return Object.keys(userData.attachment || {}).map((v, i) => {
       
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
      width: "20%",
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
       
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  const download = () => {
     
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
