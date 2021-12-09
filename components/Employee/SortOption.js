import { Col, Row, Select, Form, Checkbox, Button } from "antd";
import { route } from "next/dist/server/router";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const SortOption = ({ ministryStructure }) => {
  const [form] = Form.useForm();

  const [choiceGeneralDepartment, setChoiceGeneralDepartment] = useState("");

  const [nearlyRetired, setNearlyRetired] = useState(false);

  const onSearch = () => {};

  const nearRetired = (e) => {
    setNearlyRetired(e.target.checked);
  };
  const router = useRouter();
  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(router.query);
  }, [router.query]);
  return (
    <Form
      form={form}
      onValuesChange={(changed, allValues) => {
        let searchQuery = [];
        if (changed.generalDepartment || !allValues.generalDepartment) {
          form.resetFields(["department"]);
          delete allValues.department;
        }
        Object.keys(allValues).forEach((v) => {
          if (allValues[v]) searchQuery.push([v] + "=" + allValues[v]);
        });
        if (router?.query?.s) {
          searchQuery.push("s=" + router.query.s);
        }
        router.push("/employee?" + searchQuery.join("&"));
      }}
    >
      <Row gutter={16}>
        <Col span={4}></Col>
        <Col span={6}>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="generalDepartment"
            label="អង្គភាព ​/ ​អគ្គនាយកដ្ឋាន"
          >
            <Select
              placeholder="ជ្រើសរើស"
              allowClear
              onChange={(v) => {
                setChoiceGeneralDepartment(v);
                form.resetFields(["department"]);
              }}
            >
              {Object.keys(
                ministryStructure["ក្រសួងយុត្តិធម៌"]["ថ្នាក់កណ្តាល"]
              ).map((v, i) => {
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
            label="នាយកដ្ឋាន"
          >
            <Select placeholder="ជ្រើសរើស" allowClear>
              {Object.keys(
                ministryStructure["ក្រសួងយុត្តិធម៌"]["ថ្នាក់កណ្តាល"][
                  choiceGeneralDepartment
                ] || {}
              ).map((v, i) => {
                return (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={2} style={{ marginTop: 5 }}>
          <Form.Item name="nearRetired" valuePropName="checked">
            <Checkbox>ជិតចូលនិវត្តន៏</Checkbox>
            {/* <Checkbox onChange={nearRetired}>ជិតចូលនិវត្តន៏</Checkbox> */}
          </Form.Item>
        </Col>
        <Col span={2} style={{ marginTop: 5 }}>
          <Form.Item name="retired" valuePropName="checked">
            <Checkbox onChange={null}>ចូលនិវត្តន៏</Checkbox>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SortOption;
