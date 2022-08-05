import styles from "@/styles/Employee.module.css";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { AlertDispatch } from "contexts/alert.context";

import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Table,
  // Upload,
  Menu,
  Dropdown,
  Modal,
} from "antd";

import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  // UploadOutlined,
  DownOutlined,
} from "@ant-design/icons";
import api from "@/utils/api";

const { Option } = Select;

const khmerNum = {
  1: "១",
  2: "២",
  3: "៣",
  4: "៤",
  5: "៥",
  6: "៦",
  7: "៧",
  8: "៨",
  9: "៩",
  10: "១០",
};

const RankInfo = ({ userData }) => {
  const dispatch = useContext(AlertDispatch);

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [nowOption, setNowOption] = useState(true);
  const [rankList, setRankList] = useState([...userData.rank]);
  const [editData, setEditData] = useState(null);
  const [isRankTypeDisable, setIsRankTypeDisable] = useState(false);

  const onStartDateChange = (date, dateString) => {
    setStartDate(dateString);
    //
  };
  const onFormChange = (form)=>{
    console.log(form);
  }

  const onEndDateChange = (date, dateString) => {
    setEndDate(dateString);
    //
  };

  const onNowChange = (checked) => {
    if (checked) {
      setNowOption(true);
      setEndDate(new Date());
    } else {
      setNowOption(false);
    }
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
          rank: rankList.map((v) => (v._id === editData._id ? dataInput : v)),
        };
      } else {
        updateData = { rank: [...rankList, dataInput] };
      }

      const res = await api.put(`/api/users/${userData.id}`, updateData);
      dispatch({
        type: "SUCCESS",
        payload: {
          message: "បានរក្សាទុក",
          //  description: "បានរក្សាទុក",
        },
      });
      setVisible(false);
      setRankList(res.data.data.rank);
      form.resetFields();
    });
  };

  const onEdit = (record) => {
    setEditData(record);
    setVisible(true);
  };

  const onDelete = async (record) => {
    let res = await api.put(`/api/users/${userData.id}`, {
      rank: rankList.filter((v) => v._id !== record._id),
    });
    setRankList(res.data.data.rank);
  };
  useEffect(() => {
    if (visible === false) {
      setEditData(null);
    }
    form.resetFields();
  }, [visible]);

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
      title: "លេខលិខិតយោង",
      dataIndex: "refNum",
      key: "refNum",
    },
    {
      title: "ប្រភេទលក្ខន្តិកៈ",
      dataIndex: "statueType",
      key: "statueType",
    },
    {
      title: "ក្របខ័ណ្ឌ",
      dataIndex: "framework",
      key: "framework",
    },
    {
      title: "ឋានន្តរសកិ្ត",
      dataIndex: "rankType",
      key: "rankType",
    },
    {
      title: "ថ្នាក់",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "កំណត់សំគាល់",
      dataIndex: "otherNote",
      key: "otherNote",
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
    <div className={styles.rankInfoContainer}>
      <Button icon={<PlusOutlined />} onClick={showDrawer}>
        បញ្ចូលឋានន្តរសកិ្ត និងថ្នាក់
      </Button>
      <div style={{ marginTop: 20 }}>
        <Table columns={columns} dataSource={rankList}></Table>
      </div>

      {/* Modal */}
      <Modal
        title="បញ្ចូលឋាន្តរសក្កិ"
        width={800}
        onCancel={onClose}
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
                name="refNum"
                label="លេខលិខិតបទដ្ឋានគតិយុត្ត"
                // rules={[
                //   {
                //     required: true,
                //     message: "សូមបំពេញលេខលិខិតបទដ្ឋានគតិយុត្ត",
                //   },
                // ]}
              >
                <Input placeholder="លេខលិខិតបទដ្ឋានគតិយុត្ត" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="startDate"
                label="កាលបរិច្ឆេទបទដ្ឋានគតិយុត្តិ"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសកាលបរិច្ឆេទបទដ្ឋានគតិយុត្តិ",
                  },
                ]}
              >
                <DatePicker
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  onChange={onStartDateChange}
                />
              </Form.Item>
            </Col>
            {/* <Col span={3}>
                     <Form.Item
                        label="បច្ចុប្បន្ន"
                        style={{ marginBottom: 10 }}
                     >
                        <Switch defaultChecked onChange={onNowChange}></Switch>
                     </Form.Item>
                  </Col> */}
            {/* <Col span={8}>
              <Form.Item
                name="endDate"
                label="កាលបរិច្ឆេទដំឡើងឋាន្តរសក្តិ ថ្នាក់ចុងក្រោយ"
                style={{ marginBottom: 10 }}
              >
                <DatePicker
                  // disabled={nowOption}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  onChange={onEndDateChange}
                />
              </Form.Item>
            </Col> */}
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="letterType"
                label="ប្រភេទលិខិតបទដ្ឋានគតិយុត្តិ"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសប្រភេទលិខិតបទដ្ឋានគតិយុត្តិ",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  <Option value="ព្រះរាជក្រឹត្យ">ព្រះរាជក្រឹត្យ</Option>
                  <Option value="អនុក្រឹត្យ">អនុក្រឹត្យ</Option>
                  <Option value="ប្រកាស">ប្រកាស</Option>
                  <Option value="ដីកា">ដីកា</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="promoteType"
                label="ប្រភេទការតម្លើង"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសប្រភេទការតម្លើង",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  <Option value="ប្រចាំឆ្នាំ">ប្រចាំឆ្នាំ</Option>
                  <Option value="កិត្តិយស">កិត្តិយស</Option>
                  <Option value="តាមកំរិតសញ្ញាប័ត្រ">តាមកំរិតសញ្ញាប័ត្រ</Option>
                  <Option value="និយ័តកម្ម">និយ័តកម្ម</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="statueType"
                label="អង្គវីជ្ជាជីវៈ"
                // rules={[
                //   {
                //     required: true,
                //     message: "សូមជ្រើសរើសអង្គវីជ្ជាជីវៈ",
                //   },
                // ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  <Option value="រដ្ឋបាលទូទៅ">រដ្ឋបាលទូទៅ</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="framework"
                label="ក្របខណ្ឌ"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសក្របខណ្ឌ",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស" onChange={e=>{
                  form.resetFields(['rankType', 'level']);
                  setIsRankTypeDisable(e==="គ")
                }}>
                  {["ក", "ខ", "គ"].map((e, i) => {
                    return <Option value={e}>{e}</Option>;
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="rankType"
                label="ឋានន្តរស័ក្តិ"
                rules={[
                  {
                    required: !isRankTypeDisable,
                    message: "សូមជ្រើសរើសឋានន្តរស័ក្តិ",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស" disabled={isRankTypeDisable} onChange={(e)=>{
                  form.resetFields(['level'])
                }}>
                  {[...Array(3)].map((e, i) => {
                    return (
                      <Option value={khmerNum[i + 1]}>{khmerNum[i + 1]}</Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="level"
                label="ថ្នាក់"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសថ្នាក់",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  {[...Array(10)].map((e, i) => {
                    return (
                      <Option value={khmerNum[i + 1]}>{khmerNum[i + 1]}</Option>
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
                name="otherNote"
                label="កំណត់សម្គាល់"
                // rules={[
                //   {
                //     required: true,
                //     message: "សូមបំពេញកំណត់សម្គាល់",
                //   },
                // ]}
              >
                <Input placeholder="កំណត់សម្គាល់" />
              </Form.Item>
            </Col>
          </Row>
          {/* <Col span={12}>
                  <div>
                     <p>ឯកសារយោង</p>
                     <Upload>
                        <Button icon={<UploadOutlined />}>
                           ចុចដើម្បីរក្សាទុក
                        </Button>
                     </Upload>
                  </div>
               </Col> */}
        </Form>
      </Modal>
    </div>
  );
};

export default RankInfo;
