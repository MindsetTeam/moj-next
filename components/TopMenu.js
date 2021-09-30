import React, { useState } from "react";

import Link from "next/link";
import { Menu } from "antd";

const { SubMenu } = Menu;

const TopMenu = () => {
   const [current, setCurrent] = useState("home");
   const onChange = (e) => {
      setCurrent(e.key);
   };
   return (
      <>
         <Menu
            onClick={onChange}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ backgroundColor: "#800808" }}
         >
            <Menu.Item key="home">
               <span>
                  <img src="/home.png" width="20" height="20" />
               </span>
               <Link href="/">
                  <a>ទំព័រដើម</a>
               </Link>
            </Menu.Item>
            <Menu.Item key="me">
               <span>
                  <img src="/user.png" width="20" height="20" />
               </span>
               <Link href="/me">
                  <a>ព័ត៌មានផ្ទាល់ខ្លួន</a>
               </Link>
            </Menu.Item>
            <Menu.Item key="employee">
               <span>
                  <img src="/team.png" width="20" height="20" />
               </span>
               <Link href="/employee">
                  <a>បញ្ជីឈ្មោះមន្រ្តីរាជការ</a>
               </Link>
            </Menu.Item>
            <Menu.Item key="addUser">
               <span>
                  <img src="/addUser.png" width="20" height="20" />
               </span>
               <Link href="/employee/add">
                  <a>បញ្ចូលមន្ត្រីរាជការថ្មី</a>
               </Link>
            </Menu.Item>
            <SubMenu
               key="Print"
               title="ការបោះពុម្ព"
               icon={<img src="/printer.png" width="20" height="20" />}
            >
               <Menu.Item key="setting:1">
                  <Link href="/print-card">ការបោះពុម្ពកាតមន្រ្ដី </Link>
               </Menu.Item>
               <Menu.Item key="setting:2">
                  <Link href="/print">ការបោះពុម្ពប្រវត្តិរូប </Link>
               </Menu.Item>
            </SubMenu>
            <Menu.Item key="report">
               <span>
                  <img src="/setting.png" width="20" height="20" />
               </span>
               <Link href="/report">
                  <a>របាយការណ៌</a>
               </Link>
            </Menu.Item>
            <Menu.Item key="setting">
               <span>
                  <img src="/setting.png" width="20" height="20" />
               </span>
               <Link href="/setting">
                  <a>កំណត់ប្រើប្រាស់</a>
               </Link>
            </Menu.Item>
            <Menu.Item key="feedback">
               <span>
                  <img src="/setting.png" width="20" height="20" />
               </span>
               <Link href="/feedback">
                  <a>មតិយោបល់</a>
               </Link>
            </Menu.Item>
         </Menu>

         <style global jsx>{`
            .ant-menu-horizontal {
               border-bottom: 0px !important;
            }

            .ant-menu-item {
               margin: 0 !important;
               padding: 0 15px !important;
            }

             {
               /* .ant-menu-item:hover {
               top: -4px;
               transition: top 0.1s;
            } */
            }

            .ant-menu-horizontal > .ant-menu-item a {
               color: #fff !important;
            }

            .ant-menu-item a {
               color: #fff !important;
            }

            .ant-menu-item span {
               display: flex;
               flex-direction: column;
               align-items: center;
               gap: 1rem;
            }

            .ant-menu-item span img {
               margin-top: 1rem;
               margin-bottom: -5px;
            }

            .ant-menu-submenu-title {
               display: flex;
               flex-direction: column;
               align-items: center;
            }

            .ant-menu-submenu-title span {
               color: #fff;
               margin-top: -5px;
            }

            .ant-menu-submenu-popup > .ant-menu {
               background-color: #800808;
               margin-top: -6px;
            }

            .ant-menu-item-active:hover {
               background-color: red;
            }

            .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
               background-color: red;
            }
         `}</style>
      </>
   );
};

export default TopMenu;
