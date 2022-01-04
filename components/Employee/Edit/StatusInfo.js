import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import styles from "@/styles/Employee.module.css";
import {
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  // Table,
  // Dropdown,
  Menu,
  Switch,
  // Modal,
} from "antd";
import { AlertDispatch } from "contexts/alert.context";

import {
  // PlusOutlined,
  // EditOutlined,
  // DeleteOutlined,
  SaveOutlined,
  UserOutlined,
  // DownOutlined,
} from "@ant-design/icons";
// import api from "@/utils/api";
import { fetcher } from "@/lib/fetch";

const { Option } = Select;

const StatusInfo = ({
  statusOfficer,
  ministryList,
  letterTypes,
  structureMOJ,
  rankList,
  positionList,
  onChangeTabKey,
  ministryStructure,
  userData,
}) => {
  const dispatch = useContext(AlertDispatch);
  const [formInfo] = Form.useForm();
  const [formStatus] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [nowOption, setNowOption] = useState(
    !Boolean(userData?.latestOfficerStatus?.endDate)
  );
  const [officerStatusList, setOfficerStatusList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [selectedGeneralDepartment, setSelectedGeneralDepartment] = useState(
    userData?.latestOfficerStatus?.generalDepartment
  );
  const [selectedUnit, setSelectedUnit] = useState(
    userData?.latestOfficerStatus?.unit
  );
  const [selectedDepartment, setSelectedDepartment] = useState(
    userData?.latestOfficerStatus?.department
  );

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [employmentDate, setEmploymentDate] = useState();
  const [officialDate, setOfficialDate] = useState();

  const onStartDateChange = (date, dateString) => {
    setStartDate(dateString);
  };

  const onEndDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  const onEmploymentDateChange = (date, dateString) => {
    setEmploymentDate(dateString);
  };

  const onOfficialDateChange = (date, dateString) => {
    setOfficialDate(dateString);
  };

  const onNowChange = (checked) => {
    if (checked) {
      setNowOption(true);
      setEndDate(new Date());
    } else {
      setNowOption(false);
    }
  };

  // const showDrawer = () => {
  //   setVisible(true);
  // };

  // const onClose = () => {
  //   setVisible(false);
  // };

  // const onClear = () => {
  //   formStatus.resetFields();
  // };

  // const onSubmit = () => {
  //   const dataInput = formStatus.getFieldsValue(true);

  //   formStatus.validateFields().then(async () => {
  //     let updateData;
  //     if (editData) {
  //       updateData = {
  //         officerStatus: officerStatusList.map((v) =>
  //           v._id === editData._id ? dataInput : v
  //         ),
  //       };
  //     } else {
  //       updateData = { officerStatus: [...officerStatusList, dataInput] };
  //     }

  //     const res = await api.put(`/api/users/${userData.id}`, updateData);
  //     setVisible(false);
  //     setOfficerStatusList(res.data.data.officerStatus);
  //     formStatus.resetFields();

  //     dispatch({
  //       type: "SUCCESS",
  //       payload: {
  //         message: "បានរក្សាទុក",
  //         // description: "Successfully",
  //       },
  //     });
  //     onChangeTabKey("8");
  //   });
  // };

  // useEffect(() => {
  //   if (visible === false) {
  //     setEditData(null);
  //   }
  //   formStatus.resetFields();
  // }, [visible]);

  // const onEdit = (record) => {
  //   setEditData(record);
  //   setVisible(true);
  // };

  // const onDelete = async (record) => {
  //   let res = await api.put(`/api/users/${userData.id}`, {
  //     officerStatus: officerStatusList.filter((v) => v._id !== record._id),
  //   });
  //   setOfficerStatusList(res.data.data.officerStatus);
  // };
  // const onSave = () => {
  //   const data = formInfo.getFieldsValue(true);
  //   formInfo.validateFields().then(async () => {
  //     const res = await api.put(`/api/users/${userData.id}`, data);

  //     console.log(res);
  //     dispatch({
  //       type: "SUCCESS",
  //       payload: {
  //         message: "បានរក្សាទុក",
  //         // description: "Successfully",
  //       },
  //     });
  //     onChangeTabKey("8");
  //   });
  // };
  const onSubmit = () => {
    Promise.all([formStatus.validateFields(), formInfo.validateFields()]).then(
      async () => {
        const dataStatus = formStatus.getFieldsValue();
        const dataInfo = formInfo.getFieldsValue();
        // Object.keys(dataStatus).forEach((key) => {
        //   if (!dataStatus[key]) delete dataStatus[key];
        // });
        // Object.keys(dataInfo).forEach((key) => {
        //   if (!dataInfo[key]) delete dataInfo[key];
        // });
        // console.log(dataStatus, dataInfo);

        const updateData = {
          ...dataInfo,
          latestOfficerStatus: { ...dataStatus },
        };
        try {
          const res = await fetcher(`/api/users/${userData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData),
          });
          dispatch({
            type: "SUCCESS",
            payload: {
              message: "បានរក្សាទុក",
              // description: "Successfully",
            },
          });
          console.log(res);
          onChangeTabKey("8");
        } catch (error) {
          dispatch({
            type: "ERROR",
            payload: {
              message: "Something went wrong",
              // description: "Successfully",
            },
          });
        }
        // const res = await api.put(`/api/users/${userData.id}`, updateData);
        // setVisible(false);
        // setOfficerStatusList(res.data.data.officerStatus);
        // formStatus.resetFields();
      }
    );
  };

  // const actionMenu = (record) => {
  //   return (
  //     <Menu>
  //       <Menu.Item
  //         key="0"
  //         icon={<EditOutlined />}
  //         onClick={onEdit.bind(this, record)}
  //       >
  //         <a>Edit</a>
  //       </Menu.Item>
  //       <Menu.Item
  //         key="1"
  //         icon={<DeleteOutlined />}
  //         onClick={onDelete.bind(this, record)}
  //       >
  //         <a>Delete</a>
  //       </Menu.Item>
  //     </Menu>
  //   );
  // };

  // const columns = [
  //    {
  //       title: "លេខលិខិតយោង",
  //       dataIndex: "refNum",
  //       key: "refNum",
  //    },
  //    {
  //       title: "ប្រភេទលិខិត",
  //       dataIndex: "letterType",
  //       key: "letterType",
  //    },
  //    {
  //       title: "ប្រភេទមន្រ្ដី",
  //       dataIndex: "rank",
  //       key: "rank",
  //    },
  //    {
  //       title: "ស្ថានភាព",
  //       dataIndex: "status",
  //       key: "status",
  //    },
  //    {
  //       title: "ក្រសួង-ស្ថាប័ន",
  //       dataIndex: "ministry",
  //       key: "ministry",
  //    },
  //    {
  //       title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
  //       dataIndex: "startDate",
  //       key: "startDate",
  //       render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
  //    },
  //    {
  //       title: "មុខតំណែង",
  //       dataIndex: "position",
  //       key: "position",
  //    },
  //    {
  //       title: "ផ្សេងៗ",
  //       key: "action",
  //       render: (text, record) => (
  //          <Dropdown overlay={() => actionMenu(record)}>
  //             <a
  //                className="ant-dropdown-link"
  //                onClick={(e) => e.preventDefault()}
  //             >
  //                ផ្សេងៗ <DownOutlined />
  //             </a>
  //          </Dropdown>
  //       ),
  //    },
  // ];
  //   console.log(...userData.latestOfficerStatus);
  const formInfoData = {
    ...userData,
    employmentDate: userData.employmentDate
      ? moment(userData.employmentDate)
      : null,
    fullyEmploymentDate: userData.fullyEmploymentDate
      ? moment(userData.fullyEmploymentDate)
      : null,
  };
  useEffect(() => {
    formInfo.resetFields();
    formInfo.setFieldsValue({ formInfoData });
    setOfficerStatusList(
      userData.officerStatus ? [...userData.officerStatus] : []
    );
  }, [userData]);
  const onFormStatusChange = (changedValue, allValues) => {
    console.log(changedValue);
    let resetFields = {};
    if (changedValue.unit) {
      setSelectedUnit(changedValue.unit);
      console.log(structureMOJ[changedValue.unit][""]);
      if (structureMOJ[changedValue.unit][""]) {
        setSelectedGeneralDepartment("");
        resetFields.generalDepartment = "";
      } else {
        resetFields.generalDepartment = null;
      }
      formStatus.setFieldsValue({
        ...resetFields,
        department: null,
        office: null,
      });
    }
    if (changedValue.generalDepartment) {
      setSelectedGeneralDepartment(changedValue.generalDepartment);
      if (structureMOJ[selectedUnit][changedValue.generalDepartment][""]) {
        setSelectedDepartment("");
        resetFields.department = "";
      }
      formStatus.setFieldsValue({
        ...resetFields,
        office: null,
      });
    }
    if (changedValue.department) {
      setSelectedDepartment(changedValue.department);
      formStatus.setFieldsValue({
        office: null,
      });
    }
  };
  const isDisabledGeneralDepartment =
    Object.keys(structureMOJ[selectedUnit] || {}).length <= 0 ||
    Object.keys(structureMOJ[selectedUnit] || {})[0] === "";

  const isDisabledDepartment =
    Object.keys(structureMOJ[selectedUnit]?.[selectedGeneralDepartment] || {})
      .length <= 0;
  const isDisabledOffice =
    Object.keys(
      structureMOJ[selectedUnit]?.[selectedGeneralDepartment]?.[
        selectedDepartment
      ] || {}
    ).length <= 0;
  return (
    <div className={styles.statusInfoContainer}>
      <Form layout="vertical" form={formInfo} initialValues={formInfoData}>
        <Row gutter={16}>
          {/* <Col span={6}>
                  <Form.Item
                     style={{ marginBottom: 10 }}
                     name="civilID"
                     label="អត្តលេខមន្រ្ដីរាជការ"
                     rules={[
                        {
                           required: true,
                           message: "សូមបំពេញអត្តលេខមន្រ្ដីរាជការ",
                        },
                     ]}
                  >
                     <Input placeholder="អត្តលេខមន្រ្ដីរាជការ" />
                  </Form.Item>
               </Col> */}
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              name="employmentDate"
              label="ថ្ងៃខែឆ្នាំចូលបម្រើការងារ"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញថ្ងៃខែឆ្នាំចូលបម្រើការងារ",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={onEmploymentDateChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              name="fullyEmploymentDate"
              label="កាលបរិច្ឆេទតាំងស៊ប់"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញកាលបរិច្ឆេទតាំងស៊ប់",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                onChange={onOfficialDateChange}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              name="otherNote"
              label="កំណត់សំគាល់ផ្សេងៗ"
              // rules={[
              //    {
              //       required: true,
              //       message: "សូមបំពេញកំណត់សំគាល់ផ្សេងៗ",
              //    },
              // ]}
            >
              <Input placeholder="កំណត់សំគាល់ផ្សេងៗ" />
            </Form.Item>
          </Col>
          {/* <Col span={6} style={{ alignSelf: "center" }}>
            <Button type="primary" onClick={onSave} style={{ float: "right" }}>
              រក្សាទុក
            </Button>
          </Col> */}
        </Row>
      </Form>

      {/* <div>
            <Button icon={<PlusOutlined />} onClick={showDrawer}>
               បញ្ចូលស្ថានភាពមន្រ្ដី
            </Button>
            <div style={{ marginTop: 20 }}>
               <Table columns={columns} dataSource={officerStatusList}></Table>
            </div>
         </div> */}

      {/* Modal */}
      {/* <Modal
            title="បញ្ចូលបំរែបំរួលស្ថានភាពមន្ត្រី"
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
         > */}

      <div style={{ marginTop: 20 }}>
        <h1 className={styles.title}>
          <UserOutlined></UserOutlined> ស្ថានភាពមន្ត្រី
        </h1>
        <Form
          layout="vertical"
          form={formStatus}
          initialValues={{
            ...userData.latestOfficerStatus,
            startDate: userData.latestOfficerStatus?.startDate
              ? moment(userData.latestOfficerStatus.startDate)
              : null,
            endDate: userData.latestOfficerStatus?.endDate
              ? moment(userData.latestOfficerStatus.endDate)
              : null,
          }}
          // initialValues={{
          //    ministry: "ក្រសួងយុត្តិធម៌",
          //    ...editData,
          //    startDate: editData?.startDate
          //       ? moment(editData.startDate)
          //       : null,
          //    endDate: editData?.endDate ? moment(editData.endDate) : null,
          // }}
          onValuesChange={onFormStatusChange}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"refNum"}
                label="លេខលិខិតយោង"
                //  rules={[
                //    {
                //      required: true,
                //      message: "សូមបំពេញលេខលិខិតយោង",
                //    },
                //  ]}
              >
                <Input placeholder="លេខលិខិតយោង" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"letterType"}
                label="ប្រភេទលិខិត"
                //  rules={[
                //    {
                //      required: true,
                //      message: "សូមជ្រើសរើសប្រភេទលិខិត",
                //    },
                //  ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  {letterTypes.map((v) => {
                    return (
                      <Option key={v} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"rank"}
                label="ប្រភេទមន្រ្ដី"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសប្រភេទមន្រ្ដី",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  {rankList.map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v}{" "}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"status"}
                label="ស្ថានភាព"
                // rules={[
                //   {
                //     required: true,
                //     message: "សូមបំពេញស្ថានភាព",
                //   },
                // ]}
              >
                <Select placeholder="ជ្រើសរើស" allowClear>
                  {statusOfficer.map((v) => {
                    return (
                      <Option key={v} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
                {/* <Input placeholder="ស្ថានភាព" /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"unit"}
                label="អង្គភាព"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសអង្គភាព",
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  {Object.keys(structureMOJ).map((v) => (
                    <Option value={v}>{v}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="generalDepartment"
                label="អគ្គលេខាធិការដ្ឋាន / អគ្គនាយកដ្ឋាន / អគ្គាធិការដ្ឋាន"
                // rules={[
                //   {
                //     required: !isDisabledGeneralDepartment,
                //     message: "សូមបំពេញអគ្គនាយកដ្ឋាន",
                //   },
                // ]}
              >
                {/* <Input placeholder="អគ្គនាយកដ្ឋាន" /> */}
                <Select
                  placeholder="ជ្រើសរើស"
                  disabled={isDisabledGeneralDepartment}
                >
                  {Object.keys(structureMOJ[selectedUnit] || {}).map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="department"
                label="នាយកដ្ឋាន​ / លេខាធិការដ្ឋាន"

                // rules={[
                //    {
                //       required: true,
                //       message: "សូមបំពេញនាយកដ្ឋាន",
                //    },
                // ]}
              >
                <Select placeholder="ជ្រើសរើស" disabled={isDisabledDepartment}>
                  {Object.keys(
                    structureMOJ[selectedUnit]?.[selectedGeneralDepartment] ||
                      {}
                  ).map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
                {/* <Input placeholder="អគ្គនាយកដ្ឋាន" /> */}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                // name={"ministry"}
                name={"office"}
                label="ការិយាល័យ"
              >
                <Select placeholder="ជ្រើសរើស" disabled={isDisabledOffice}>
                  {[
                    ...(structureMOJ[selectedUnit]?.[
                      selectedGeneralDepartment
                    ]?.[selectedDepartment] || []),
                  ].map((v, i) => {
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
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"position"}
                label="មុខតំណែង"
                rules={[
                  {
                    required: true,
                    message: "សូមបំពេញមុខតំណែង",
                  },
                ]}
              >
                {/* <Input placeholder="មុខតំណែង" /> */}
                <Select placeholder="ជ្រើសរើស" showSearch>
                  {positionList.map((v, i) => {
                    return (
                      <Option key={i} value={v}>
                        {v}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"startDate"}
                label="កាលបរិច្ឆេទតែងតាំង"
                rules={[
                  {
                    required: true,
                    message: "សូមជ្រើសរើសកាលបរិច្ឆេទតែងតាំង",
                  },
                ]}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  format="DD/MM/YYYY"
                  onChange={onStartDateChange}
                />
              </Form.Item>
            </Col>
            <Col span={1}>
              <Form.Item
                label="បច្ចុប្បន្ន"
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  display: "block",
                }}
              >
                <Switch
                  onChange={onNowChange}
                  defaultChecked={
                    userData.latestOfficerStatus?.endDate ? false : true
                  }
                ></Switch>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name={"endDate"}
                label="កាលបរិច្ឆេទបញ្ចប់"
                style={{ marginBottom: 10 }}
              >
                <DatePicker
                  disabled={nowOption}
                  format="DD/MM/YYYY"
                  style={{ width: "100%" }}
                  onChange={onEndDateChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name={"otherNote"}
                label="កំណត់សម្គាល់"
                //  rules={[
                //    {
                //      required: true,
                //      message: "សូមបំពេញកំណត់សម្គាល់",
                //    },
                //  ]}
              >
                <Input placeholder="កំណត់សម្គាល់" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <div className={styles.btnContainer} style={{ gap: "20px" }}>
        <Button
          icon={<SaveOutlined />}
          onClick={() => {
            formInfo.setFieldsValue(formInfoData);
            formStatus.setFieldsValue({
              ...userData.latestOfficerStatus,
              startDate: userData.latestOfficerStatus?.startDate
                ? moment(userData.latestOfficerStatus.startDate)
                : null,
              endDate: userData.latestOfficerStatus?.endDate
                ? moment(userData.latestOfficerStatus.endDate)
                : null,
            });
          }}
        >
          Reset
        </Button>
        <Button icon={<SaveOutlined />} onClick={onSubmit} type="primary">
          រក្សាទុក
        </Button>
      </div>
      {/* </Modal> */}
    </div>
  );
};

export default StatusInfo;
