import React, { useState } from "react";

import Link from "next/link";
import { Menu, Modal, Upload, Button, Form, notification } from "antd";
import { useSession } from "node_modules/next-auth/client";
import { fetcher } from "@/lib/fetch";

const { SubMenu } = Menu;

const TopMenu = () => {
  const [current, setCurrent] = useState("home");
  const [modalUpload, setModalUpload] = useState(false);
  const [session] = useSession();
  const [formXlsx] = Form.useForm();
  const onChange = (e) => {
    setCurrent(e.key);
  };

  const menuList = [
    {
      link: "/",
      title: "ទំព័រដើម",
      iconUrl: "/home.png",
    },
    {
      link: "/me",
      title: "ព័ត៌មានផ្ទាល់ខ្លួន",
      iconUrl: "/user.png",
    },
    {
      iconUrl: "/printer.png",
      title: "ការបោះពុម្ព",
      sub: [
        {
          link: "/print",
          title: "ការបោះពុម្ពប្រវត្តិរូប",
        },
        {
          link: "/print-card",
          title: "ការបោះពុម្ពកាតមន្រ្ដី",
        },
        {
          link: "/setting",
          title: "កែប្រែលេខកាត",
        },
      ],
    },

    // {
    //   link: "/feedbacks",
    //   title: "មតិយោបល់",
    //   iconUrl: "/setting.png",
    // },
  ];
  // if (["moderator"].includes(session?.user.role)) {
  //   menuList.splice(2, 0, {
  //     link: "/employee",
  //     title: "បញ្ជីឈ្មោះមន្រ្តីរាជការ",
  //     iconUrl: "/team.png",
  //   });
  // }

  if (["admin", "editor", "moderator"].includes(session?.user.role)) {
    let menu = [
      {
        link: "/employee",
        title: "បញ្ជីឈ្មោះមន្រ្តីរាជការ",
        iconUrl: "/team.png",
      },
    ];
    if (["admin", "editor"].includes(session?.user.role)) {
      menu.push(
        {
          link: "/employee/add",
          title: "បញ្ចូលមន្ត្រីរាជការថ្មី",
          iconUrl: "/addUser.png",
        },
        {
          link: "/report",
          title: "របាយការណ៌",
          iconUrl: "/report.png",
        }
        // {
        //    link: "/setting",
        //    title: "ការកំណត់",
        //    iconUrl: "/setting.png",
        // }
      );
    }

    menuList.splice(2, 0, ...menu);
  } else {
    menuList.shift();
  }

  const onUpload = () => {
    formXlsx.validateFields().then(async () => {
      const { cardXlsx } = await formXlsx.getFieldsValue();
      console.log(cardXlsx);
      const formData = new FormData();
      if (cardXlsx?.fileList?.length > 0) {
        formData.append("card-xlsx", cardXlsx?.fileList?.[0]?.originFileObj);
        const res = await fetcher("/api/users/update-cardid", {
          method: "POST",
          body: formData,
        });
        notification.success({ message: res.msg });
      }
      setModalUpload(false);
    });
  };

  return (
    <>
      <Modal
        visible={modalUpload}
        onCancel={() => setModalUpload(false)}
        onOk={onUpload}
        title="Upload Excel"
      >
        <h3>កែប្រែលេខកាតថ្មី</h3>
        <Form form={formXlsx}>
          <Form.Item
            name="cardXlsx"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Upload accept=".xlsx" maxCount={1}>
              <Button>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Menu
        onClick={onChange}
        selectedKeys={[current]}
        mode="horizontal"
        style={{ backgroundColor: "#800808" }}
      >
        {menuList.map((v, i) => {
          if (v.sub) {
            return (
              <SubMenu
                key={i}
                title={v.title}
                icon={<img src={v.iconUrl} width="20" height="20" />}
              >
                {v.sub.map((val, i) => (
                  <Menu.Item key={i}>
                    {val.link === "/setting" ? (
                      <p
                        onClick={() => setModalUpload(true)}
                        style={{ color: "#fff" }}
                      >
                        {val.title}
                      </p>
                    ) : (
                      <Link href={val.link}>{val.title}</Link>
                    )}
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={i}>
              <span>
                <img src={v.iconUrl} width="20" height="20" />
              </span>
              <Link href={v.link}>
                <a>{v.title}</a>
              </Link>
            </Menu.Item>
          );
        })}
        {/* <Menu.Item key="home">
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
        <Menu.Item key="announcement">
          <span>
            <img src="/announcement.png" width="20" height="20" />
          </span>
          <Link href="/announcement">
            <a>សេចក្ដីជូនដំណឹង</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="feedback">
          <span>
            <img src="/setting.png" width="20" height="20" />
          </span>
          <Link href="/feedbacks">
            <a>មតិយោបល់</a>
          </Link>
        </Menu.Item> */}
      </Menu>

      <style global jsx>{`
        .ant-menu-horizontal {
          border-bottom: 0px !important;
        }

        .ant-menu-item {
          margin: 0 !important;
          padding: 0 15px !important;
        }

        //  {
        //     .ant-menu-item:hover {
        //    top: -4px;
        //    transition: top 0.1s;
        // }
        // }

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
