import React, { useEffect, useState } from "react";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import structureMinistryData from "/data/Structure.json";

import Link from "next/link";
import { useRouter } from "next/router";

import {
  EditOutlined,
  SearchOutlined,
  PlusOutlined,
  PrinterOutlined,
  DownOutlined,
  StopOutlined,
  ExclamationCircleOutlined,
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
import withAuth from "hoc/withAuth";

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

console.log(generalDepartmentData, departmentData);

const Index = () => {
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

  const router = useRouter();
  const [session, loading] = useSession();

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalSuspend, setModalSuspend] = useState(false);

  const [formEditRole] = Form.useForm();

  const toggleModalAdd = () => {
    setModalAdd(!modalAdd);
  };

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const toggleModalSuspend = () => {
    setModalSuspend(!modalSuspend);
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
              key != "experience"
            ) {
              delete employee[key];
            }
          }
        }
        employee.experience =
          employee.experience[employee.experience.length - 1] || {};

        return employee;
      });
      setEmployees(employees);
    } catch (error) {
      console.log(error);
    }
  };

  const saveEmployee = async () => {
    const dataInput = form.getFieldsValue(true);
    console.log(dataInput);
    form.validateFields().then(async () => {
      try {
        const { data } = await api.post("/api/auth/register", dataInput);
        router.push("/employee/" + data.data.id);
      } catch (error) {
        console.log(error);
      }
    });
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
    console.log(data);
    fetchEmployees();
  };

  const onSuspendUser = (record) => {
    // toggleModalSuspend();
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
      </Menu>
    );
  };

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
      title: "ភេទ",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "ថ្ងៃខែឆ្នាំកំណើត",
      dataIndex: "birthDate",
      key: "birthDate",
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
      title: "ស្ថានភាព",
      dataIndex: "status",
      key: "status",
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
      render: (text, record) => (
        // <Button
        //    icon={<EditOutlined />}
        //    onClick={() => {
        //       router.push(`/employee/${record.id}`);
        //    }}
        // >
        //    Edit
        // </Button>
        <Dropdown overlay={() => actionMenu(record)}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ផ្សេងៗ <DownOutlined />
          </a>
        </Dropdown>
      ),
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
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <Button
            onClick={toggleModalAdd}
            icon={
              <img
                src="/follow.png"
                style={{ width: 18, height: 18, marginRight: 7 }}
              />
            }
            style={{ marginLeft: 10 }}
          >
            បញ្ចូលមន្រ្ដីរាជការ
          </Button>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={employees}></Table>
      </div>

      {/* Modal Add User */}
      <Modal
        title="Add User"
        visible={modalAdd}
        onCancel={toggleModalAdd}
        footer={null}
      >
        <Form layout="vertical" hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="Username"
                name="firstName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="username" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="ID"
                name="nationalityIDNum"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="អត្តលេខ" />
              </Form.Item>
            </Col>
          </Row>
          {session?.user.role === "admin" && (
            <>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    label="អគ្គនាយកដ្ឋាន"
                    name="generalDepartment"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      placeholder="ជ្រើសរើស"
                      onChange={setSelectedGeneralDepartment}
                    >
                      {generalDepartment.map((v, i) => {
                        return (
                          <Option value={v} key={i}>
                            {v}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    label="Department"
                    name="department"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select placeholder="ជ្រើសរើស">
                      {department.map((v, i) => {
                        return (
                          <Option key={i} value={v}>
                            {v}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
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
                  <Option value="user">User</Option>
                  <Option value="editor">Editor</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Button style={{ marginRight: 8 }} onClick={saveEmployee}>
            Add
          </Button>
        </Form>
      </Modal>

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
                  <Option value="user">User</Option>
                  <Option value="editor">Editor</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
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
          </Row>
          <Row gutter={16}>
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
          </Row>
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

      {/* Modal Suspend */}
      <Modal
        title="Suspend User"
        visible={modalSuspend}
        onCancel={toggleModalSuspend}
      >
        <p>hi</p>
      </Modal>
    </div>
  );
};

export default withAuth(Index, ["admin", "editor"]);
