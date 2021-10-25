import { Table, Button } from "antd";
import Link from "next/link";

import { EditOutlined, SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "@/utils/api";

const Index = () => {
  const columns = [
    {
      title: "ល.រ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "អត្តលេខ",
      dataIndex: "nationalityIDNum",
      key: "nationalityIDNum",
    },
    {
      title: "គោត្តនាមនិងនាម",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "តួនាទី",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "សកម្មភាព",
      key: "action",
      render: (text, record) => (
        <Button icon={<EditOutlined />} onClick={() => {}}>
          Edit
        </Button>
      ),
    },
  ];
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await api.get("/api/users");
      const users = res.data.data.map((employee) => {
        for (const key in employee) {
          if (Object.hasOwnProperty.call(employee, key)) {
            if (typeof employee[key] != "string") {
              delete employee[key];
            }
          }
        }
        return employee;
      });
      setUsers(users);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button icon={<SearchOutlined />} onClick={() => {}}>
          Search
        </Button>
        <Link href="/user/add">
          <Button icon={<PlusOutlined />} style={{ marginLeft: 10 }}>
            Add
          </Button>
        </Link>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={users}></Table>
      </div>
    </div>
  );
};

export default Index;
