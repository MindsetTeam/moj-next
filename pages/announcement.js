import React, { useState } from "react";
import styles from "@/styles/Announcement.module.css";

import {
  Button,
  Table,
  Modal,
  Dropdown,
  Menu,
  Form,
  Upload,
  Input,
  Select,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  UploadOutlined,
  DeleteOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { fetcher } from "@/lib/fetch";

const { Option } = Select;

const Announcement = () => {
  const [announcementList, setAnnouncementList] = useState([
    {
      title: "Do Lorem sit ad fugiat cillum eiusmod do.",
      isActive: false,
    },
    {
      title: "Do Lorem sit ad fugiat cillum eiusmod do.",
      isActive: true,
    },
  ]);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editData, setEditData] = useState(null);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const onClear = () => {
    form.resetFields();
  };

  const onSubmit = () => {
    form.validateFields().then(async () => {
      const values = form.getFieldsValue();
      const formData = new FormData();
      if (values.attachment?.fileList?.length) {
        formData.append(
          "attachment",
          values.attachment?.fileList?.[0]?.originFileObj
        );
      }
      formData.append("title", values.title);
      formData.append("isActive", values.isActive);
       fetcher("/api/announcements", { method: "POST", body: formData });
      console.log(values, formData);
    });
  };

  const actionMenu = (record) => {
    return (
      <Menu>
        <Menu.Item
          key="0"
          icon={<EditOutlined />}
          //    onClick={onEdit.bind(this, record)}
        >
          <a>Edit</a>
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<DeleteOutlined />}
          //    onClick={onDelete.bind(this, record)}
        >
          <a>Delete</a>
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: "សេចក្ដីជូនដំណឹង",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => {
        return <p>{text ? "Active" : "Inactive"}</p>;
      },
    },
    {
      title: "Attachment",
      dataIndex: "attachment",
      key: "attachment",
      render: (text) => {
        return <p>{text ? "Active" : "Inactive"}</p>;
      },
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
    <div className={styles.container}>
      <Button icon={<PlusOutlined />} onClick={toggleModal}>
        បញ្ចូលសេចក្ដីជូនដំណឹង
      </Button>

      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={announcementList}></Table>
      </div>

      {/* Modal Add */}
      <Modal
        title="បញ្ចូលសេចក្ដីជូនដំណឹង"
        width={800}
        onCancel={toggleModal}
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
        <Form hideRequiredMark form={form} initialValues={{ isActive: false }}>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="title"
            label="សេចក្ដីជូនដំណឹង"
            rules={[
              {
                required: true,
                message: "សូមបំពេញសេចក្ដីជូនដំណឹង",
              },
            ]}
          >
            <Input placeholder="សេចក្ដីជូនដំណឹង" />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="isActive"
            label="isActive"
            rules={[
              {
                required: true,
                message: "សូមបំពេញ isActive",
              },
            ]}
          >
            <Select>
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item name="attachment" label="attachment">
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Announcement;
