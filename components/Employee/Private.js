import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Menu,
  Input,
  Select,
  DatePicker,
  Table,
  Dropdown,
  Tag,
  Space,
  Switch,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import api from "@/utils/api";

const Private = ({ userData }) => {
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [form] = Form.useForm();
  const [privateSectorList, setPrivateSectorList] = useState([
    ...userData.privateSector,
  ]);
  const [editData, setEditData] = useState(null);

  const onStartDateChange = (date, dateString) => {
    setStartDate(dateString);
    console.log(dateString);
  };

  const onEndDateChange = (date, dateString) => {
    setEndDate(dateString);
    console.log(dateString);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onClear = () => {
    form.resetFields();
  };

  const onSubmit = () => {
    const dataInput = form.getFieldsValue(true);
    form.validateFields().then(async () => {
      let updateData;
      if (editData) {
        updateData = {
          privateSector: privateSectorList.map((v) =>
            v._id === editData._id ? dataInput : v
          ),
        };
      } else {
        updateData = { privateSector: [...privateSectorList, dataInput] };
      }
      const res = await api.put(
        `/api/users/${userData.id}`,
        updateData
      );
      setVisible(false);
      setPrivateSectorList(res.data.data.privateSector);
      form.resetFields();
    });
  };
  useEffect(() => {
    if (visible === false) {
      setEditData(null);
    }
    form.resetFields();
  }, [visible]);

  const onEdit = (record) => {
    setEditData(record);
    setVisible(true);
  };

  const onDelete = async (record) => {
    let res = await api.put(`/api/users/${userData.id}`, {
      privateSector: privateSectorList.filter((v) => v._id !== record._id),
    });
    setPrivateSectorList(res.data.data.privateSector);
  };

  const actionMenu = (record) => {
    return (
      <Menu>
        <Menu.Item
          key="0"
          icon={<EditOutlined />}
          onClick={onEdit.bind(this, record)}
        >
          <a>Edit</a>
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<DeleteOutlined />}
          onClick={onDelete.bind(this, record)}
        >
          <a>Delete</a>
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: "គ្រឹះស្ថាន-អង្គភាព",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "តួនាទី",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "ជំនាញ/បច្ចេកទេស",
      dataIndex: "skill",
      key: "skill",
    },
    {
      title: "ថ្ងៃខែឆ្នាំចូលបម្រើការងារ",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "ថ្ងៃខែឆ្នាំបញ្ចប់ការងារ",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "ផ្សេងៗ",
      key: "action",
      render: (text, record) => (
        <Dropdown overlay={() => actionMenu(record)}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            ផ្សេងៗ <DownOutlined />
          </a>
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Button icon={<PlusOutlined />} onClick={showDrawer}>
        បញ្ចូលវិស័យការងារឯកជន
      </Button>
      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={privateSectorList}></Table>
      </div>

      {/* Drawer */}
      <Drawer
        title="បញ្ចូលវិស័យការងារឯកជន"
        width={550}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Button onClick={onClear} style={{ marginRight: 8 }}>
              Clear
            </Button>
            <Button onClick={onSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <Form
          layout="vertical"
          hideRequiredMark
          form={form}
          initialValues={{
            ...editData,
            startDate: editData?.startDate ? moment(editData.startDate) : null,
            endDate: editData?.endDate ? moment(editData.endDate) : null,
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="unit"
                label="គ្រឹះស្ថាន-អង្គភាព"
                rules={[
                  {
                    required: true,
                    message: "សូមបំពេញគ្រឹះស្ថាន-អង្គភាព",
                  },
                ]}
              >
                <Input placeholder="គ្រឹះស្ថាន-អង្គភាព" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="role"
                label="តួនាទី"
                rules={[
                  {
                    required: true,
                    message: "សូមបំពេញតួនាទី",
                  },
                ]}
              >
                <Input placeholder="តួនាទី" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="skill"
                label="ជំនាញ/បច្ចេកទេស"
                rules={[
                  {
                    required: true,
                    message: "សូមបំពេញជំនាញ/បច្ចេកទេស",
                  },
                ]}
              >
                <Input placeholder="ជំនាញ/បច្ចេកទេស" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="startDate"
                label="ថ្ងៃ ខែ ឆ្នាំ ចូលបម្រើការងារ"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសថ្ងៃ ខែ ឆ្នាំ ចូលបម្រើការងារ",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format='DD/MM/YYYY'
                  onChange={onStartDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="endDate"
                label="ថ្ងៃ ខែ ឆ្នាំ បញ្ចប់ការងារ"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសថ្ងៃ ខែ ឆ្នាំ បញ្ចប់ការងារ",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format='DD/MM/YYYY'
                  onChange={onEndDateChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </div>
  );
};

export default Private;
