import React, { useEffect, useState } from "react";
import styles from "@/styles/Employee.module.css";

import {
   Table,
   Button,
   Modal,
   Form,
   Col,
   Tag,
   Row,
   Input,
   Select,
   Menu,
   Dropdown,
   notification,
   Radio,
} from "antd";

import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

const retired = () => {
   const router = useRouter();
   const [session, loading] = useSession();
   const [retiredUser, setRetiredUser] = useState(null);

   const onDeleteUser = (record) => {
      confirm({
         title: `Do you want to delete User: ${record.firstName} ?`,
         icon: <ExclamationCircleOutlined />,
         async onOk() {
            await api.delete(`/api/users/${record.id}`);
            fetchEmployees(router.query.s || "");
         },
         onCancel() {
            // console.log("Cancel");
         },
      });
   };

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item
               // key="0"
               icon={<EditOutlined />}
               onClick={() => {
                  router.push(`/employee/${record.id}`);
               }}
            >
               <a>កែប្រែ</a>
            </Menu.Item>
            <Menu.Item
               // key="1"
               icon={<PrinterOutlined />}
               onClick={() => {
                  router.push(`/print/${record.id}`);
               }}
            >
               <a>បោះពុម្ភ</a>
            </Menu.Item>
            <Menu.Item
               // key="2"
               icon={<PrinterOutlined />}
               onClick={() => {
                  router.push(`/print-card/${record.id}`);
               }}
            >
               <a>បោះពុម្ភកាត</a>
            </Menu.Item>

            {["admin", "editor"].includes(session?.user.role) &&
               session?.user.id !== record.id &&
               record.role !== "admin" &&
               !(session?.user.role == "editor" && record.role == "editor") && (
                  <Menu.Item
                     key="3"
                     icon={<DeleteOutlined />}
                     onClick={onDeleteUser.bind(this, record)}
                  >
                     <a>លុប</a>
                  </Menu.Item>
               )}
         </Menu>
      );
   };

   const columns = [
      {
         title: "លេខអត្តសញ្ញាណប័ណ្ណ",
         dataIndex: "nationalityIDNum",
         key: "nationalityIDNum",
      },
      {
         title: "គោត្តនាមនិងនាម",
         dataIndex: "firstName",
         key: "firstName",
         render: (firstName, record) => {
            return firstName + " " + (record.lastName || "");
         },
      },
      {
         title: "ភេទ",
         dataIndex: "gender",
         key: "gender",
      },
      {
         title: "ថ្ងៃខែឆ្នាំកំណើត",
         dataIndex: "birthDate",
         key: "birthDate",
         render: (date) => {
            return date ? new Date(date).toLocaleDateString("en-GB") : "";
         },
      },
      {
         title: "មុខតំណែង",
         dataIndex: ["officerStatus", "position"],
         key: "position",
      },
      {
         title: "អង្គភាព",
         dataIndex: "officerStatus",
         key: "department",
         render: (officerStatus) => {
            return officerStatus.department || officerStatus.unit;
         },
      },
      {
         title: "ឋានន្តរស័ក្កិនិងថ្នាក់",
         dataIndex: "rank",
         key: "rank",
         render: (rank) => {
            return rank.framework && rank.rankType && rank.level
               ? `${rank.framework} - ${rank.rankType} - ${rank.level}`
               : "";
         },
      },
      {
         title: "ស្ថានភាពមន្ត្រី",
         dataIndex: "approval",
         key: "approvalStatus",
         render: (approval, record) => {
            console.log(approval);
            let color = "red";
            let title = "កំពុងពិនិត្យ";
            if (approval) {
               title = "អនុម័ត្ត";
               color = "green";
            }
            return (
               <>
                  <Tag color={color} key={approval}>
                     {title}
                  </Tag>{" "}
                  {record.suspended && (
                     <Tag color={"red"} key={"ផ្អាក"}>
                        ផ្អាក
                     </Tag>
                  )}
               </>
            );
         },
      },
      {
         title: "កែប្រែ",
         key: "action",
         render: (text, record) => {
            if (session?.user.role === "moderator") {
               return (
                  <a
                     onClick={() => {
                        router.push(`/employee/${record._id}`);
                     }}
                  >
                     View
                  </a>
               );
            }
            return (
               <Dropdown overlay={() => actionMenu(record)}>
                  <a
                     className="ant-dropdown-link"
                     onClick={(e) => e.preventDefault()}
                  >
                     ផ្សេងៗ <DownOutlined />
                  </a>
               </Dropdown>
            );
         },
      },
   ];

   return (
      <div>
         <Table columns={columns} dataSource={retiredUser}></Table>
      </div>
   );
};

export default retired;
