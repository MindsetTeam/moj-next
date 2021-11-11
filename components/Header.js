import Image from "next/image";
import Link from "next/link";

import TopMenu from "@/components/TopMenu";
import { Menu, Avatar, Dropdown } from "antd";
import { DownOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";

import styles from "@/styles/Header.module.css";
import Cookies from "js-cookie";
import { useSession, signOut } from "next-auth/client";

const dropDownMenu = (
  <Menu>
    <Menu.Item>
      <Link href="/settings">
        <a>
          <EditOutlined></EditOutlined>កែប្រែ
        </a>
      </Link>
    </Menu.Item>
    <Menu.Item
      onClick={() =>
        signOut({ redirect: false }).then(() => {
          Cookies.remove("authorization");
        })
      }
    >
      <LogoutOutlined></LogoutOutlined>ចាកចេញ
    </Menu.Item>
  </Menu>
);

const Header = () => {
  const [session, loading] = useSession();
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div>
          <Image src="/logo.png" width={40} height={40} />
        </div>
        <p className={styles.logoName}>ប្រព័ន្ធគ្រប់គ្រងមន្រ្ដីរាជការស៊ីវិល</p>
      </div>
      <div className={styles.topMenu}>
        <TopMenu></TopMenu>
      </div>
      <div className={styles.user}>
        {session?.user && (
          <>
            <Avatar src={session.user.photo} />
            <div>
              <Dropdown overlay={dropDownMenu}>
                <div>
                  <span>
                    {session.user.firstNameLatin +
                      " " +
                      (session.user.lastNameLatin || "")}
                  </span>
                  <DownOutlined></DownOutlined>
                </div>
              </Dropdown>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
