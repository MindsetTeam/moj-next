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
      // {
      //    title: "ប្រភេទឯកសារ",
      //    dataIndex: "attachmentType",
      //    key: "attachmentType",
      // },
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
         attachment: "ឯកសារផ្ទាល់ខ្លួន",
         children: [
            {
               key: "11",
               attachment: "asdf",
            },
            {
               key: "12",
               attachment: "asdf123123",
            },
         ],
      },
      {
         key: "2",
         attachment: "ឋានន្តរសកិ្ត និងថ្នាក់",
         children: [
            {
               key: "21",
               attachment: "rank1",
            },
            {
               key: "22",
               attachment: "rank2",
            },
         ],
      },
      {
         key: "3",
         attachment: "សញ្ញាបត្រ",
      },
      {
         key: "4",
         attachment: "សំបុត្រអាពាហ៍ពិពាហ៍",
      },
      {
         key: "5",
         attachment: "សំបុត្រកំណើតកូន",
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
               checkStrictly: false,
               ...rowSelection,
            }}
         ></Table>
      </div>
   );
};

export default Attachment;
