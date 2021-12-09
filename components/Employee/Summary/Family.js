import React, { useState, useEffect } from "react";
import { Form, Col, Row, Input, Table, Radio } from "antd";
import { UserOutlined } from "@ant-design/icons";
import moment from "moment";

const statusOptions = [
  { label: "រស់", value: "រស់" },
  { label: "ស្លាប់", value: "ស្លាប់" },
];

const genderOptions = [
  { label: "ប្រុស", value: "ប្រុស" },
  { label: "ស្រី", value: "ស្រី" },
];

const Family = ({ userData }) => {
  // Children
  const [children, setChildren] = useState(userData?.children || []);

  // Spouse
  const birthPlace = [];
  for (const key in userData.partnerInfo?.birthPlace) {
    if (Object.hasOwnProperty.call(userData.partnerInfo?.birthPlace, key)) {
      birthPlace.push(userData.partnerInfo?.birthPlace[key]);
    }
  }
  const currentResidence = [];
  for (const key in userData.partnerInfo?.currentResidence) {
    if (
      Object.hasOwnProperty.call(userData.partnerInfo?.currentResidence, key)
    ) {
      currentResidence.push(userData.partnerInfo?.currentResidence[key]);
    }
  }
  userData.partnerInfo = {
    ...userData.partnerInfo,
  };
  userData.partnerInfo.birthPlace = birthPlace.join(", ") || "";
  userData.partnerInfo.currentResidence = currentResidence.join(", ");

  // Parent
  const motherInfo = {
    ...userData?.motherInfo,
    birthPlaceOther: userData.motherInfo?.birthPlace.other,
  };
  const motherInfoBirthPlace = [];
  for (const key in motherInfo?.birthPlace) {
    if (
      Object.hasOwnProperty.call(motherInfo?.birthPlace, key) &&
      key !== "other"
    ) {
      motherInfoBirthPlace.push(motherInfo?.birthPlace[key]);
    }
  }
  motherInfo.birthPlace = motherInfoBirthPlace.join(", ");

  const fatherInfo = {
    ...userData?.fatherInfo,
    birthPlaceOther: userData.fatherInfo?.birthPlace.other,
  };
  const fatherInfoBirthPlace = [];
  for (const key in fatherInfo.birthPlace) {
    if (
      Object.hasOwnProperty.call(fatherInfo.birthPlace, key) &&
      key !== "other"
    ) {
      fatherInfoBirthPlace.push(fatherInfo.birthPlace[key]);
    }
  }
  fatherInfo.birthPlace = fatherInfoBirthPlace.join(", ");

  const columns = [
    {
      title: "លេខសំបុត្រកំណើត",
      dataIndex: "birthCertificateNum",
      key: "birthCertificateNum",
    },
    {
      title: "លេខអត្តសញ្ញាណប័ណ្ណ",
      dataIndex: "nationalityIDNum",
      key: "nationalityIDNum",
    },
    {
      title: "គោត្តនាម និងនាម",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "គោត្តនាម និងនាមឡាតាំង",
      dataIndex: "fullNameLatin",
      key: "fullNameLatin",
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
      render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
    },
    {
      title: "មុខរបរ",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "ស្ថានភាព",
      dataIndex: "livingStatus",
      key: "livingStatus",
    },
  ];

  return (
    <div style={{ paddingTop: 10 }}>
      {/* Spouse */}
      <Form
        layout="vertical"
        initialValues={{
          ...userData?.partnerInfo,
          gender: userData?.gender !== "ប្រុស" ? "ប្រុស" : "ស្រី",
          birthDate: userData?.birthDate
            ? moment(userData?.birthDate).format("DD/MM/YYYY")
            : null,
        }}
      >
        <h1 style={{ marginBottom: 20 }}>
          <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
          ព័ត៌មានសហព័ទ្ធ
        </h1>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="លេខសំបុត្រអាពាហ៍ពិពាហ៍"
              name="weddingCertificateNum"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញលេខសំបុត្រអាពាហ៍ពិពាហ៍",
                },
              ]}
            >
              <Input disabled placeholder="លេខសំបុត្រអាពាហ៍ពិពាហ៍" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
              name="nationalityIDNum"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
                },
              ]}
            >
              <Input disabled placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="គោត្តនាម និងនាម"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញគោត្តនាម និងនាម",
                },
              ]}
            >
              <Input disabled placeholder="គោត្តនាម និងនាម" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="គោត្តនាម និងនាមឡាតាំង"
              name="fullNameLatin"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញគោត្តនាម និងនាមឡាតាំង",
                },
              ]}
            >
              <Input disabled placeholder="គោត្តនាម និងនាមឡាតាំង" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ភេទ"
              name="gender"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើសភេទ",
                },
              ]}
            >
              <Radio.Group disabled options={genderOptions}></Radio.Group>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ស្ថានភាព"
              name="statusLive"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើសស្ថានភាព",
                },
              ]}
            >
              <Radio.Group disabled options={statusOptions}></Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="មុខរបរ"
              name="occupation"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញមុខរបរ",
                },
              ]}
            >
              <Input disabled placeholder="មុខរបរ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ទីកន្លែងបំពេញការងារ"
              name="workPlace"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញទីកន្លែងបំពេញការងារ",
                },
              ]}
            >
              <Input disabled placeholder="ទីកន្លែងបំពេញការងារ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ថ្ងៃខែឆ្នាំកំណើត"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                },
              ]}
            >
              <Input disabled placeholder="ថ្ងៃខែឆ្នាំកំណើត" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* Parent */}
      {/* Father */}
      <Form
        layout="vertical"
        initialValues={{
          ...fatherInfo,
          birthDate: fatherInfo.birthDate
            ? moment(fatherInfo.birthDate).format("DD/MM/YYYY")
            : null,
        }}
        style={{ marginTop: 20 }}
      >
        <h1 style={{ marginBottom: 20 }}>
          <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
          ព័ត៌មានឪពុក
        </h1>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
              name="nationalityIDNum"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
                },
              ]}
            >
              <Input disabled placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="គោត្តនាម និងនាម"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញគោត្តនាម និងនាម",
                },
              ]}
            >
              <Input disabled placeholder="គោត្តនាម និងនាម" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="គោត្តនាម និងនាមឡាតាំង"
              name="fullNameLatin"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញគោត្តនាម និងនាមឡាតាំង",
                },
              ]}
            >
              <Input disabled placeholder="គោត្តនាម និងនាមឡាតាំង" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ថ្ងៃខែឆ្នាំកំណើត"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                },
              ]}
            >
              <Input disabled placeholder="ថ្ងៃខែឆ្នាំកំណើត" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="មុខរបរ"
              name="occupation"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញមុខរបរ",
                },
              ]}
            >
              <Input disabled placeholder="មុខរបរ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ស្ថានភាព"
              name="livingStatus"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើសស្ថានភាព",
                },
              ]}
            >
              <Radio.Group disabled options={statusOptions}></Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* Mother */}
      <Form
        layout="vertical"
        initialValues={{
          ...motherInfo,
          birthDate: motherInfo.birthDate
            ? moment(motherInfo.birthDate).format("DD/MM/YYYY")
            : null,
        }}
        style={{ margin: "20px 0px" }}
      >
        <h1 style={{ marginBottom: 20 }}>
          <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
          ព័ត៌មានម្ដាយ
        </h1>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
              name="nationalityIDNum"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
                },
              ]}
            >
              <Input disabled placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="គោត្តនាម និងនាម"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញគោត្តនាម និងនាម",
                },
              ]}
            >
              <Input disabled placeholder="គោត្តនាម និងនាម" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="គោត្តនាម និងនាមឡាតាំង"
              name="fullNameLatin"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញគោត្តនាម និងនាមឡាតាំង",
                },
              ]}
            >
              <Input disabled placeholder="គោត្តនាម និងនាមឡាតាំង" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ថ្ងៃខែឆ្នាំកំណើត"
              name="birthDate"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                },
              ]}
            >
              <Input disabled placeholder="ថ្ងៃខែឆ្នាំកំណើត" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="មុខរបរ"
              name="occupation"
              rules={[
                {
                  required: true,
                  message: "សូមបំពេញមុខរបរ",
                },
              ]}
            >
              <Input disabled placeholder="មុខរបរ" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ marginBottom: 10 }}
              label="ស្ថានភាព"
              name="livingStatus"
              rules={[
                {
                  required: true,
                  message: "សូមជ្រើសរើសស្ថានភាព",
                },
              ]}
            >
              <Radio.Group disabled options={statusOptions}></Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {/* Children */}
      <div>
        <h1 style={{ marginBottom: 20 }}>
          <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
          ព័ត៌មានកូន
        </h1>
        <div style={{ marginTop: 20 }}>
          <Table columns={columns} dataSource={children}></Table>
        </div>
      </div>
    </div>
  );
};

export default Family;
