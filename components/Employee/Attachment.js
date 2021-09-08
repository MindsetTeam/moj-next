import React, { useState } from "react";

import { Table, Button } from "antd";

import { DownloadOutlined } from "@ant-design/icons";

const Attachment = () => {
   const [selectedRows, setSelectedRows] = useState(null);

   const columns = [
      {
         title: "ឯកសារ",
         dataIndex: "attachment",
         key: "attachment",
      },
      {
         title: "ប្រភេទឯកសារ",
         dataIndex: "attachmentType",
         key: "attachmentType",
      },
      {
         title: "ផ្សេងៗ",
         key: "action",
         align: "center",
         render: () => <a>ទាញយក</a>,
      },
   ];

   const data = [
      {
         key: "1",
         attachment: "John Brown",
         attachmentType: "hi2",
      },
      {
         key: "2",
         attachment: "123123",
         attachmentType: "hi3",
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
         <Button
            style={{ marginRight: 8, marginBottom: 20 }}
            onClick={download}
            icon={<DownloadOutlined></DownloadOutlined>}
         >
            ទាញយកឯកសារ
         </Button>
         <Table
            columns={columns}
            dataSource={data}
            rowSelection={{
               type: "checkbox",
               ...rowSelection,
            }}
         ></Table>
      </div>
   );
};

export default Attachment;
