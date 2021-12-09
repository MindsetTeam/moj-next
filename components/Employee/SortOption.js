import { Col, Row, Select, Form, Checkbox, Button } from "antd";
import { useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const SortOption = ({ ministryStructure }) => {
  const [form] = Form.useForm();
  const [session, loading] = useSession();

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
  let initialValues = {};
  if (session?.user?.role == "moderator") {
    initialValues.generalDepartment =
      session?.user?.latestOfficerStatus?.generalDepartment;
    if (session?.user?.moderatorType == "department") {
      initialValues.department = session?.user?.latestOfficerStatus?.department;
    }
  }
  useEffect(() => {
    if (session?.user?.role == "moderator") {
      setChoiceGeneralDepartment(
        session?.user?.latestOfficerStatus?.generalDepartment
      );
    }
  }, [session]);
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
      initialValues={initialValues}
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
              disabled={session?.user?.role == "moderator"}
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
            <Select
              placeholder="ជ្រើសរើស"
              allowClear
              disabled={
                session?.user?.role == "moderator" &&
                session?.user?.moderatorType == "department"
              }
            >
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
