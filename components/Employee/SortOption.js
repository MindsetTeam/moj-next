import { Col, Row, Select, Form, Checkbox, Button } from "antd";
import { useSession } from "next-auth/client";
import router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const { Option } = Select;

const SortOption = ({ ministryStructure, structureMOJ, rankListData }) => {
  const [form] = Form.useForm();
  const [session, loading] = useSession();

  const [selectedGeneralDepartment, setSelectedGeneralDepartment] =
    useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

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
    initialValues.unit = session?.user?.latestOfficerStatus?.unit;
    if (
      ["department", "generalDepartment"].includes(session?.user?.moderatorType)
    ) {
      initialValues.generalDepartment =
        session?.user?.latestOfficerStatus?.generalDepartment;
    }
    if (session?.user?.moderatorType == "department") {
      initialValues.department = session?.user?.latestOfficerStatus?.department;
    }
  }
  useEffect(() => {
    if (session?.user?.role == "moderator") {
      setSelectedUnit(session?.user?.latestOfficerStatus?.unit);
      if (
        ["generalDepartment", "department"].includes(
          session?.users?.moderatorType
        )
      ) {
        setSelectedGeneralDepartment(
          session?.user?.latestOfficerStatus?.generalDepartment
        );
      }
      if (session?.user?.moderatorType == "department") {
        setSelectedDepartment(session?.user?.latestOfficerStatus?.department);
      }
    }
  }, [session]);

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
    <Form
      form={form}
      onValuesChange={(changed, allValues) => {
        let searchQuery = [];
        //   if (changed.generalDepartment || !allValues.generalDepartment) {
        //     form.resetFields(["department"]);
        //     delete allValues.department;
        //   }

        let resetFields = {};
        if (changed.unit) {
          setSelectedUnit(changed.unit);
          if (structureMOJ[changed.unit][""]) {
            setSelectedGeneralDepartment("");
            resetFields.generalDepartment = "";
            //   allValues.generalDepartment = "";
          }
          form.setFieldsValue({
            ...resetFields,
            department: null,
            office: null,
          });
        }
        if (Object.keys(changed)[0] == "unit" && changed.unit === undefined) {
          form.setFieldsValue({
            generalDepartment: null,
            department: null,
            office: null,
          });
        }
        if (changed.generalDepartment) {
          setSelectedGeneralDepartment(changed.generalDepartment);
          if (structureMOJ[selectedUnit][changed.generalDepartment][""]) {
            setSelectedDepartment("");
            resetFields.department = "";
          }
          form.setFieldsValue({
            ...resetFields,
            office: null,
          });
        }
        if (
          Object.keys(changed)[0] == "generalDepartment" &&
          changed.generalDepartment === undefined
        ) {
          form.setFieldsValue({
            department: null,
            office: null,
          });
        }
        if (changed.department) {
          setSelectedDepartment(changed.department);
          form.setFieldsValue({
            office: null,
          });
        }
        if (
          Object.keys(changed)[0] == "department" &&
          changed.department === undefined
        ) {
          form.setFieldsValue({
            office: null,
          });
        }
        const queryValue = form.getFieldsValue();

        Object.keys(queryValue).forEach((v) => {
          if (queryValue[v]) searchQuery.push([v] + "=" + queryValue[v]);
        });
        if (router?.query?.s) {
          searchQuery.push("s=" + router.query.s);
        }
        router.push("/employee?" + searchQuery.join("&"));
      }}
      initialValues={initialValues}
    >
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item style={{ marginBottom: 10 }} name="unit" label="អង្គភាព">
            <Select
              placeholder="ជ្រើសរើស"
              allowClear
              disabled={session?.user?.role == "moderator"}
            >
              {Object.keys(structureMOJ).map((v) => (
                <Option value={v}>{v}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="generalDepartment"
            label="​អគ្គនាយកដ្ឋាន"
          >
            <Select
              placeholder="ជ្រើសរើស"
              allowClear
              //   onChange={(v) => {
              //     setChoiceGeneralDepartment(v);
              //     form.resetFields(["department"]);
              //   }}
              disabled={
                isDisabledGeneralDepartment ||
                session?.user?.role == "moderator"
              }
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
        <Col span={4}>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="department"
            label="នាយកដ្ឋាន"
          >
            <Select
              placeholder="ជ្រើសរើស"
              allowClear
              disabled={
                isDisabledDepartment ||
                (session?.user?.role == "moderator" &&
                  session?.user?.moderatorType == "department")
              }
            >
              {Object.keys(
                structureMOJ[selectedUnit]?.[selectedGeneralDepartment] || {}
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
        <Col span={4}>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="office"
            label="ការិយាល័យ"
          >
            <Select
              placeholder="ជ្រើសរើស"
              disabled={isDisabledOffice}
              allowClear
            >
              {[
                ...(structureMOJ[selectedUnit]?.[selectedGeneralDepartment]?.[
                  selectedDepartment
                ] || []),
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
        <Col span={4}>
          <Form.Item
            style={{ marginBottom: 10 }}
            name="rank"
            label="ប្រភេទមន្រ្ដី"
          >
            <Select placeholder="ជ្រើសរើស" allowClear>
              {rankListData.map((v, i) => {
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
