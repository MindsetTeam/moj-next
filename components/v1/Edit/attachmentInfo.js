import React, { useState } from "react";
import styles from "@/styles/Edit.module.css";

import {
  Table,
  Button,
  Modal,
  Input,
  Select,
  Form,
  Row,
  Col,
  Upload,
  Menu,
  Dropdown,
} from "antd";

import {
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
  DownOutlined,
} from "@ant-design/icons";

const attachmentInfo = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const actionMenu = (record) => {
    console.log(record);
    return (
      <Menu>
        <Menu.Item
          key="0"
          icon={<DownloadOutlined />}
          // onClick={onEdit.bind(this, record)}
        >
          <a>ទាញយក</a>
        </Menu.Item>
        <Menu.Item
          key="1"
          icon={<DeleteOutlined />}
          // onClick={onDelete.bind(this, record)}
        >
          <a>Delete</a>
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: "ប្រភេទឯកសារ",
      dataIndex: "attachmentType",
      key: "attachmentType",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "ឯកសារ",
      dataIndex: "attachment",
      key: "attachment",
    },
    {
      title: "ផ្សេងៗ",
      key: "action",
      align: "center",
      render: (text, record, index) => {
        console.log({ record });
        if (record.key > 0 && record.key < 6) {
          return null;
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

  const data = [
    {
      key: "1",
      attachmentType: "ឯកសារផ្ទាល់ខ្លួន",
      children: [
        {
          key: "6",
          attachment: "ឯកសារផ្ទាល់ខ្លួនasdfasdf",
        },
      ],
    },
    {
      key: "2",
      attachmentType: "ឋានន្តរសកិ្ត និងថ្នាក់",
      children: [
        {
          key: "7",
          attachment: "ឯកសារផ្ទាល់ខ្លួនasdfasdf",
        },
      ],
    },
    {
      key: "3",
      attachmentType: "សញ្ញាបត្រ",
    },
    {
      key: "4",
      attachmentType: "សំបុត្រអាពាហ៍ពិពាហ៍",
    },
    {
      key: "5",
      attachmentType: "សំបុត្រកំណើតកូន",
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  return (
    <div className={styles.attachmentInfoContainer}>
      <Button
        style={{ marginRight: 8, marginBottom: 20 }}
        onClick={showModal}
        icon={<PlusOutlined></PlusOutlined>}
      >
        បន្ថែមឯកសារយោង
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          defaultExpandAllRows: true,
        }}
      ></Table>

      {/* Modal */}
      <Modal
        title="បន្ថែមឯកសារយោង"
        width={650}
        onCancel={() => setVisible(false)}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form hideRequiredMark form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="attachment"
                label="ឈ្មោះឯកសារ"
                rules={[
                  {
                    required: true,
                    message: "សូមបំពេញឈ្មោះឯកសារ",
                  },
                ]}
              >
                <Input placeholder="ឈ្មោះឯកសារ" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="attachmentType"
                label="ប្រភេទឯកសារ"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសប្រភេទឯកសារ",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  <Option value="ឯកសារផ្ទាល់ខ្លួន">ឯកសារផ្ទាល់ខ្លួន</Option>
                  <Option value="ឋានន្តរសកិ្ត និងថ្នាក់">
                    ឋានន្តរសកិ្ត និងថ្នាក់
                  </Option>
                  <Option value="សញ្ញាបត្រ">សញ្ញាបត្រ</Option>
                  <Option value="សំបុត្រអាពាហ៍ពិពាហ៍">
                    សំបុត្រអាពាហ៍ពិពាហ៍
                  </Option>
                  <Option value="សំបុត្រកំណើតកូន">សំបុត្រកំណើតកូន</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Upload>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default attachmentInfo;
