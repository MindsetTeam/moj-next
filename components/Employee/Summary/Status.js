import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, Col, Row, Input, DatePicker, Table } from "antd";

import styles from "@/styles/Employee.module.css";

const Status = ({ userData }) => {
  const [formInfo] = Form.useForm();

  const [officerStatusList, setOfficerStatusList] = useState([]);
  const [penaltyList, setPenaltyList] = useState([...userData.penalty]);
  const [praiseList, setPraiseList] = useState([...userData.praised]);

  const columnsStatus = [
    {
      title: "លេខលិខិតយោង",
      dataIndex: "refNum",
      key: "refNum",
    },
    {
      title: "ប្រភេទលិខិត",
      dataIndex: "letterType",
      key: "letterType",
    },
    {
      title: "ប្រភេទមន្រ្ដី",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "ស្ថានភាព",
      dataIndex: "status",
      key: "status",
    },
    // {
    //    title: "ក្រសួង-ស្ថាប័ន",
    //    dataIndex: "ministry",
    //    key: "ministry",
    // },
    {
      title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
      dataIndex: "startDate",
      key: "startDate",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "តួនាទី",
      dataIndex: "position",
      key: "position",
    },
  ];

  const columnsPraise = [
    {
      title: "លេខលិខិតយោង",
      dataIndex: "refNum",
      key: "refNum",
    },
    {
      title: "ប្រភេទការលើកសសើរ",
      dataIndex: "letterType",
      key: "letterType",
    },
    // {
    //    title: "រូបភាពលើកសសើរ",
    //    dataIndex: "photo",
    //    key: "photo",
    // },
    {
      title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "ក្រសួង-ស្ថាប័ន",
      dataIndex: "ministry",
      key: "ministry",
    },
  ];

  const columnsPenalty = [
    {
      title: "លេខលិខិតយោង",
      dataIndex: "refNum",
      key: "refNum",
    },
    {
      title: "ប្រភេទការដាក់ពិន័យ",
      dataIndex: "type",
      key: "type",
    },
    // {
    //    title: "រូបភាពការដាក់ពិន័យ",
    //    dataIndex: "photo",
    //    key: "photo",
    // },
    {
      title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "ក្រសួង-ស្ថាប័ន",
      dataIndex: "ministry",
      key: "ministry",
    },
  ];

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
    setOfficerStatusList([{ ...userData.latestOfficerStatus }]);
    // setOfficerStatusList(
    //    userData.officerStatus ? [...userData.officerStatus] : []
    // );
  }, [userData]);

  return (
    <div>
      <div className={styles.statusInfoContainer}>
        <Form layout="vertical" form={formInfo} initialValues={formInfoData}>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="civilID"
                label="អត្តលេខមន្រ្ដីរាជការ"
                // rules={[
                //    {
                //       required: true,
                //       message: "សូមបំពេញអត្តលេខមន្រ្ដីរាជការ",
                //    },
                // ]}
              >
                <Input
                  disabled={true}
                  style={{ backgroundColor: "white", color: "black" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="employmentDate"
                label="ថ្ងៃខែឆ្នាំចូលបម្រើការងារ"
                // rules={[
                //    {
                //       required: true,
                //       message: "សូមបំពេញថ្ងៃខែឆ្នាំចូលបម្រើការងារ",
                //    },
                // ]}
              >
                <DatePicker
                  style={{ width: "100%", backgroundColor: "white" }}
                  format="DD/MM/YYYY"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="fullyEmploymentDate"
                label="កាលបរិច្ឆេទតាំងស៊ប់"
                // rules={[
                //    {
                //       required: true,
                //       message: "សូមបំពេញកាលបរិច្ឆេទតាំងស៊ប់",
                //    },
                // ]}
              >
                <DatePicker
                  style={{ width: "100%", backgroundColor: "#fffbfb" }}
                  format="DD/MM/YYYY"
                  disabled={true}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                style={{ marginBottom: 10 }}
                name="otherNote"
                label="កំណត់សំគាល់ផ្សេងៗ"
              >
                <Input disabled={true} />
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <div>
          <div style={{ marginTop: 20 }}>
            <Table
              columns={columnsStatus}
              dataSource={officerStatusList}
            ></Table>
          </div>
        </div>
      </div>

      {/* <div className={styles.praiseInfoContainer}>
        <img src="/praise.png" alt="" width="20" height="20" />
        <h1>ការលើកសរសើរ</h1>
        <div style={{ marginTop: 20 }}>
          <Table columns={columnsPraise} dataSource={praiseList}></Table>
        </div>
      </div>

      <div className={styles.penaltyInfoContainer}>
        <img src="/penalty.png" alt="" width="20" height="20" />
        <h1>ការដាក់ពិន័យ</h1>
        <div style={{ marginTop: 20 }}>
          <Table columns={columnsPenalty} dataSource={penaltyList}></Table>
        </div>
      </div> */}
      <style jsx global>{`
        input[disabled] {
          color: rgba(0, 0, 0, 0.75) !important;
        }
      `}</style>
    </div>
  );
};

export default Status;
