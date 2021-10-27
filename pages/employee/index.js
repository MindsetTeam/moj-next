import React, { useEffect, useState } from "react";
import styles from "@/styles/Employee.module.css";

import Search from "@/components/Employee/Search";

import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import structureMinistryData from "/data/Structure.json";

import { useRouter } from "next/router";

import {
  EditOutlined,
  PrinterOutlined,
  DownOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

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
} from "antd";

import api from "@/utils/api";
import { useSession } from "next-auth/client";

const { Option } = Select;
const { confirm } = Modal;

const data = structureMinistryData["ក្រសួងយុត្តិធម៌"];
const generalDepartmentData = [];
let departmentData = {};
for (const key in data) {
  if (Object.hasOwnProperty.call(data, key)) {
    departmentData = { ...departmentData, ...data[key] };
    generalDepartmentData.push(...Object.keys(data[key]));
  }
}
const Index = () => {
  const router = useRouter();
  const [session, loading] = useSession();
  const [form] = Form.useForm();

  const [generalDepartment, setGeneralDepartment] = useState(
    generalDepartmentData
  );
  const [selectedGeneralDepartment, setSelectedGeneralDepartment] =
    useState("");
  const [department, setDepartment] = useState([]);

  const [generalDepartmentEdit, setGeneralDepartmentEdit] = useState(
    generalDepartmentData
  );
  const [selectedGeneralDepartmentEdit, setSelectedGeneralDepartmentEdit] =
    useState("");
  const [departmentEdit, setDepartmentEdit] = useState([]);

  useEffect(() => {
    form.resetFields(["department"]);
    setDepartment([
      ...Object.keys(departmentData[selectedGeneralDepartment] || {}),
    ]);
  }, [selectedGeneralDepartment]);

  useEffect(() => {
    formEditRole.resetFields(["departmentEdit"]);
    setDepartmentEdit([
      ...Object.keys(departmentData[selectedGeneralDepartmentEdit] || {}),
    ]);
  }, [selectedGeneralDepartmentEdit]);

  const [modalEdit, setModalEdit] = useState(false);

  const [formEditRole] = Form.useForm();

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    fetchEmployees(router.query.s || "");
  }, [router]);
  const fetchEmployees = async (search) => {
    try {
      const { data } = await api.get(
        `/api/users${search ? `?searchTerm=${search}` : ""}`
      );
      const employees = data.data.map((employee) => {
        for (const key in employee) {
          if (Object.hasOwnProperty.call(employee, key)) {
            if (
              typeof employee[key] != "string" &&
              typeof employee[key] != "boolean" &&
              key != "experience" &&
              key != "rank"
            ) {
              delete employee[key];
            }
          }
        }
        employee.experience =
          employee.experience[employee.experience.length - 1] || {};
        employee.rank = employee.rank[employee.rank.length - 1] || {};

        return employee;
      });
      setEmployees(employees);
    } catch (error) {
      console.log(error);
    }
  };

  const [selectedUser, setSelectedUser] = useState(null);
  const onEditRole = async (record) => {
    setSelectedUser(record);
    formEditRole.setFieldsValue({ role: record.role });
    toggleModalEdit();
  };

  const updateUserRole = async (role) => {
    console.log(role);
    const { data } = await api.put(`api/users/${selectedUser.id}`, { role });
    toggleModalEdit();
    setSelectedUser(null);
    fetchEmployees();
  };
  const updateSuspendUser = async ({ suspended, userId }) => {
    console.log(`api/users/${userId}`, { suspended });
    const { data } = await api.put(`api/users/${userId}`, { suspended });
    fetchEmployees();
  };

  const onSuspendUser = (record) => {
    confirm({
      title: `Do you want to ${record.suspended ? "unsuspend" : "suspend"} ${
        record.firstName
      } ?`,
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return updateSuspendUser({
          suspended: !record.suspended,
          userId: record.id,
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
          key="0"
          icon={<EditOutlined />}
          onClick={() => {
            router.push(`/employee/${record.id}`);
          }}
        >
          <a>កែប្រែ</a>
        </Menu.Item>
        {session?.user.role === "admin" && session?.user.id !== record.id && (
          <Menu.Item
            key="1"
            icon={<EditOutlined />}
            onClick={onEditRole.bind(this, record)}
          >
            <a>កំណត់តួនាទី</a>
          </Menu.Item>
        )}
        <Menu.Item
          key="2"
          icon={<PrinterOutlined />}
          onClick={() => {
            router.push(`/print/${record.id}`);
          }}
        >
          <a>បោះពុម្ភ</a>
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<PrinterOutlined />}
          onClick={() => {
            router.push(`/print-card/${record.id}`);
          }}
        >
          <a>បោះពុម្ភកាត</a>
        </Menu.Item>
        {["admin", "editor"].includes(session?.user.role) &&
          session?.user.id !== record.id && (
            <Menu.Item
              key="4"
              icon={<StopOutlined />}
              onClick={onSuspendUser.bind(this, record)}
            >
              <a>{record.suspended ? "បិទផ្អាក" : "ផ្អាក"}</a>
            </Menu.Item>
          )}
        {session?.user.role === "admin" && session?.user.id !== record.id && (
          <Menu.Item
            key="5"
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
      title: "nationalityIDNum",
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
      dataIndex: ["experience", "position"],
      key: "position",
    },
    {
      title: "អង្គភាព",
      dataIndex: "experience",
      key: "department",
      render: (experience) => {
        return experience.department || experience.unit;
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
                router.push(`/employee/${record.id}`);
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

  if (session?.user.role === "admin") {
    columns.splice(columns.length - 1, 0, {
      title: "ផ្ទៀង​ផ្ទាត់",
      dataIndex: "approval",
      render: (verified, record) => {
        if (verified) {
          return null;
        }
        return (
          <>
            <span
              style={{ cursor: "pointer" }}
              onClick={async () => {
                console.log("/api/users/" + record.id);
                await api.put("/api/users/" + record.id, {
                  approval: true,
                });
                fetchEmployees();
              }}
            >
              <CheckOutlined style={{ color: "green" }} />
            </span>{" "}
            |{" "}
            <span style={{ cursor: "pointer" }}>
              <CloseOutlined style={{ color: "red" }} />
            </span>
          </>
        );
      },
    });
  }

  return (
    <div className={styles.employeeListContainer}>
      <Search></Search>

      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={employees}></Table>
      </div>

      {/* Modal Edit */}
      <Modal
        title="Edit Role"
        visible={modalEdit}
        onCancel={toggleModalEdit}
        footer={null}
      >
        <Form form={formEditRole} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  <Option value="editor">Editor</Option>
                  <Option value="moderator">Moderator</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="អគ្គនាយកដ្ឋាន"
                name="អគ្គនាយកដ្ឋាន"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="ជ្រើសរើស"
                  onChange={setSelectedGeneralDepartmentEdit}
                >
                  {generalDepartmentEdit.map((v, i) => {
                    return (
                      <Option value={v} key={i}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row> */}
          {/* <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="នាយកដ្ឋាន"
                name="នាយកដ្ឋាន"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  {departmentEdit.map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row> */}
          <Button
            style={{ marginRight: 8 }}
            onClick={() => {
              const data = formEditRole.getFieldsValue(true);
              console.log(data);
              updateUserRole(data.role);
              // alert("Save");
            }}
          >
            Save
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

Index.allowed_roles = ["admin", "editor", "moderator"];

export default Index;
