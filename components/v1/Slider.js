import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Layout, Menu, Divider } from "antd";
import {
   UserOutlined,
   HomeOutlined,
   NotificationOutlined,
   SettingOutlined,
   PrinterOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
const { Sider } = Layout;
const { SubMenu } = Menu;

const Slider = () => {
   const [session, loading] = useSession();
   const [collapsed, setCollapsed] = useState(false);
   const [selectedMenuKey, setSelectedMenuKey] = useState(["/"]);
   const router = useRouter();

   const mainSiderMenu = [
      {
         link: "/",
         title: "ទំព័រដើម",
         iconUrl: "/home.png",
      },
      {
         link: "/v1/me",
         title: "ព័ត៌មានផ្ទាល់ខ្លួន",
         iconUrl: "/user.png",
      },
      {
         link: "/v1/print",
         title: "បោះពុម្ភប្រវត្តិរូប",
         iconUrl: "/printer.png",
      },
      {
         link: "/print-card",
         title: "បោះពុម្ភកាតមន្ត្រី",
         iconUrl: "/printer.png",
      },
   ];
   const secondarySiderMenu = [
      {
         link: "/announcement",
         title: "សេចក្ដីជូនដំណឹង",
         iconUrl: "/announcement.png",
      },
      {
         link: "/setting",
         title: "កំណត់អ្នកប្រើប្រាស់",
         iconUrl: "/setting.png",
      },
      {
         link: "/feedback",
         title: "feedback",
         iconUrl: "/setting.png",
      },
   ];

   if (["admin", "editor"].includes(session?.user.role)) {
      mainSiderMenu.push(
         {
            link: "/employee",
            title: "បញ្ជីឈ្មោះមន្រ្តីរាជការ",
            iconUrl: "/team.png",
         },
         {
            link: "/employee/add",
            title: "បញ្ចូលមន្ត្រីរាជការថ្មី",
            iconUrl: "/addUser.png",
         }
      );
   }

   useEffect(() => {
      setSelectedMenuKey([router.pathname]);
   }, [router.pathname]);

   const onCollapse = (col) => {
      setCollapsed(col);
   };

   return (
      <Sider
         theme="light"
         collapsed={collapsed}
         onCollapse={onCollapse}
         width="280px"
         collapsible
      >
         <div
            style={{
               display: "flex",
               flexDirection: "row",
               justifyContent: "center",
               alignItems: "center",
               padding: "15px 0px",
            }}
         >
            <div>
               <Image src="/hello.png" width={40} height={40} />
            </div>
            <h1
               style={{
                  fontSize: "1.1em",
                  fontWeight: "normal",
                  display: collapsed ? "none" : "",
                  marginLeft: 10,
               }}
            >
               គ្រប់គ្រងព័ត៌មានមន្រ្តីរាជការ
            </h1>
         </div>
         <Menu theme="light" mode="inline" selectedKeys={selectedMenuKey}>
            {mainSiderMenu.map((v) => {
               //   if(v.name==='print'){
               //   return  <SubMenu key={v.name} icon={<MailOutlined />} title="Navigation One">
               //   <Menu.Item key="1"> <Link href={v.link}>
               //         <a>{v.title}</a>
               //       </Link></Menu.Item>
               //   <Menu.Item key="2">Option 2</Menu.Item>
               //   <Menu.Item key="3">Option 3</Menu.Item>
               //   <Menu.Item key="4">Option 4</Menu.Item>
               // </SubMenu>
               //   }
               return (
                  <Menu.Item
                     key={v.link}
                     icon={<img src={v.iconUrl} width="20" height="20" />}
                  >
                     <Link href={v.link}>
                        <a>{v.title}</a>
                     </Link>
                  </Menu.Item>
               );
            })}
            <Divider
               style={{
                  borderColor: "#888",
               }}
            ></Divider>
            {secondarySiderMenu.map((v) => {
               return (
                  <Menu.Item
                     key={v.link}
                     icon={<img src={v.iconUrl} width="20" height="20" />}
                  >
                     <Link href={v.link}>
                        <a>{v.title}</a>
                     </Link>
                  </Menu.Item>
               );
            })}
         </Menu>
      </Sider>
   );
};

export default Slider;
