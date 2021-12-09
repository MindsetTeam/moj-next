import React, { useEffect, useState } from "react";
import styles from "@/styles/Employee.module.css";

import Search from "@/components/Employee/Search";
import SortOption from "@/components/Employee/SortOption";

import {
  CheckOutlined,
  CloseOutlined,
  // SearchOutlined,
} from "@ant-design/icons";
import structureMinistryData from "/data/Structure.json";

import { useRouter } from "next/router";
import Link from 'next/link'


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
  notification,
  Radio,
  Checkbox,
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
  const [roleChoice, setRoleChoice] = useState("");

  const [nearlyRetired, setNearlyRetired] = useState(false);

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

  // change password
  const [modalChangePassword, setModalChangePassword] = useState(false);

  const [formChangePassword] = Form.useForm();

  const toggleModalChangePassword = () => {
    setModalChangePassword(!modalChangePassword);
  };

  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    // console.log({ router: router.query });
    fetchEmployees(router.query.s || "", router.query);
  }, [router]);
  const fetchEmployees = async (search = "", query = "") => {
    let searchQuery = new URLSearchParams();
    searchQuery.append("searchTerm", search);
    if (query) {
      Object.keys(query).forEach((v) => {
        searchQuery.append(v, query[v]);
      });
    }
    try {
      const { data } = await api.get(
        `/api/users${
          "?select=firstName,lastName,firstNameLatin,lastNameLatin,nationalityIDNum,gender,birthDate,rank,officerStatus,approval,suspended,role,moderatorType,latestOfficerStatus&" +
          searchQuery.toString()
        }`
        // const { data } = await api.get(
        //   `/api/users${
        //     search
        //       ? `?searchTerm=${search}&select=firstName,lastName,nationalityIDNum`
        //       : "?select=firstName,lastName,firstNameLatin,lastNameLatin,nationalityIDNum,gender,birthDate,rank,officerStatus,approval,suspended,role,moderatorType&" +
        //         searchQuery.toString()
        //   }`
      );
      const employees = data.data.map((employee) => {
        for (const key in employee) {
          if (Object.hasOwnProperty.call(employee, key)) {
            if (
              typeof employee[key] != "string" &&
              typeof employee[key] != "boolean" &&
              key != "experience" &&
              key != "rank" &&
              key !== "officerStatus" &&
              key !== "latestOfficerStatus"
            ) {
              delete employee[key];
            }
          }
        }
        employee.oldStateOfficerStatus = [...employee.officerStatus];
        employee.officerStatus =
          employee.officerStatus[employee.officerStatus.length - 1] || {};
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
    setRoleChoice(record.role);
    console.log(record);
    console.log({
      role: record.role,
      moderatorType: record.moderatorType,
    });
    formEditRole.resetFields();
    formEditRole.setFieldsValue({
      role: record.role,
      moderatorType: record.moderatorType,
    });
    toggleModalEdit();
  };
  const onEditChangePassword = async (record) => {
    setSelectedUser(record);
    toggleModalChangePassword();
  };

  const onSubmitChangePassword = async (password) => {
    const res = await api.put(`api/users/${selectedUser.id}/updatepassword`, {
      newPassword: password,
    });
    notification.success({ message: res.data.msg });
    formChangePassword.resetFields();
    toggleModalChangePassword();
  };
  const updateUserRole = async ({ role, moderatorType }) => {
    const { data } = await api.put(`api/users/${selectedUser.id}`, {
      role,
      moderatorType,
    });
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
          icon={<EditOutlined />}
          onClick={() => {
            router.push(`/employee/${record.id}/edit`);
          }}
        >
          <a>កែប្រែ</a>
        </Menu.Item>
        {["admin", "editor"].includes(session?.user.role) &&
          session?.user.id !== record.id &&
          record.role !== "admin" &&
          !(session?.user.role == "editor" && record.role == "editor") && (
            <Menu.Item
              icon={<EditOutlined />}
              onClick={onEditRole.bind(this, record)}
            >
              <a>កំណត់តួនាទី</a>
            </Menu.Item>
          )}
        <Menu.Item
          icon={<PrinterOutlined />}
          onClick={() => {
            router.push(`/print/${record.id}`);
          }}
        >
          <a>បោះពុម្ភ</a>
        </Menu.Item>
        <Menu.Item
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
              icon={<StopOutlined />}
              onClick={onSuspendUser.bind(this, record)}
            >
              <a>{record.suspended ? "បិទផ្អាក" : "ផ្អាក"}</a>
            </Menu.Item>
          )}
        {["admin", "editor"].includes(session?.user.role) &&
          session?.user.id !== record.id &&
          record.role !== "admin" &&
          !(session?.user.role == "editor" && record.role == "editor") && (
            <Menu.Item
              icon={<EditOutlined />}
              onClick={onEditChangePassword.bind(this, record)}
            >
              <a>ផ្លាស់ប្តូរពាក្យសម្ងាត់</a>
            </Menu.Item>
          )}
        {["admin", "editor"].includes(session?.user.role) &&
          session?.user.id !== record.id &&
          record.role !== "admin" &&
          !(session?.user.role == "editor" && record.role == "editor") && (
            <Menu.Item
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
        return (
          <Link href={"/employee/" + record.id}>
            {firstName
              ? firstName + " " + (record.lastName || "")
              : (record.firstNameLatin || "") +
                " " +
                (record.lastNameLatin || "")}
          </Link>
        );
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
      dataIndex: "latestOfficerStatus",
      key: "department",
      render: (latestOfficerStatus) => {
        return (
          latestOfficerStatus?.department ||
          latestOfficerStatus?.generalDepartment
        );
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
        let title = "ជិតចូល";
        if (
          [...(record.oldStateOfficerStatus || [])].findIndex(
            (v) => v.rank == "និវត្តន៍"
          ) > -1
        ) {
          title = "និវត្តន៍";
        }
        return (
          <>
            {/* <Tag color={color} key={approval}>
                     {title}
                  </Tag>{" "} */}
            {(new Date(record.birthDate).getTime() <
              new Date(
                Date.now() - 59.5 * 365 * 24 * 60 * 60 * 1000
              ).getTime() ||
              title === "និវត្តន៍") && <Tag color="red">{title}</Tag>}
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
                router.push(`/employee/${record._id || record.id}`);
              }}
            >
              ពិនិត្យ
            </a>
          );
        }
        return {
          props: {
            style: { background: "#96ac9a17" },
          },
          children: (
            <Dropdown overlay={() => actionMenu(record)}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                ផ្សេងៗ <DownOutlined />
              </a>
            </Dropdown>
          ),
        };
      },
    },
  ];

  if (["admin", "editor"].includes(session?.user.role)) {
    columns.splice(columns.length - 2, 0, {
      title: "ផ្ទៀង​ផ្ទាត់",
      dataIndex: "approval",
      render: (verified, record) => {
        if (verified) {
          return (
            <Tag color={"green"} key={record.id}>
              អនុម័ត្ត
            </Tag>
          );
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
        <SortOption ministryStructure={structureMinistryData}></SortOption>
      </div>

      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={employees}></Table>
      </div>

      {/* Modal Edit */}
      <Modal
        title="ផ្លាស់ប្តូរពាក្យសម្ងាត់"
        visible={modalChangePassword}
        footer={null}
        onCancel={toggleModalChangePassword}
      >
        <Form form={formChangePassword} layout="vertical">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="New Password"
                name="password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="ពាក្យសម្ងាត់" />
              </Form.Item>
            </Col>
          </Row>
          <Button
            style={{ marginRight: 8 }}
            onClick={() => {
              const data = formChangePassword.getFieldsValue();
              onSubmitChangePassword(data.password);
            }}
          >
            Save
          </Button>
        </Form>
      </Modal>
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
                <Select
                  placeholder="ជ្រើសរើស"
                  onChange={(v) => {
                    console.log(v);
                    if (v == "moderator") {
                      setRoleChoice(v);
                    } else {
                      setRoleChoice("");
                    }
                  }}
                >
                  {session?.user.role === "admin" && (
                    <Option value="editor">Editor</Option>
                  )}
                  <Option value="moderator">Moderator</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {roleChoice === "moderator" && (
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  label="Type"
                  name="moderatorType"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Radio.Group
                    options={[
                      {
                        label: "អគ្គនាយកដ្ឋាន",
                        value: "generalDepartment",
                      },
                      { label: "នាយកដ្ឋាន", value: "department" },
                    ]}
                  ></Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          )}
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
              updateUserRole({
                role: data.role,
                moderatorType: data.moderatorType,
              });
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
