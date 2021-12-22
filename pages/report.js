import PrintReport from "@/components/Report/PrintReport";
import styles from "@/styles/Print.module.css";
import structureMinistryData from "/data/Structure.json";
import structureMOJ from "/data/FullStructureMOJ.json";

import React, { useState } from "react";
import { Col, Row, Select, Form, Button, Checkbox, Divider } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { fetcher } from "@/lib/fetch";

const { Option } = Select;

const Report = () => {
  const [form] = Form.useForm();

  const [choiceGeneralDepartment, setChoiceGeneralDepartment] = useState("");
  const [choiceDepartment, setChoiceDepartment] = useState("");
  const [printEmployees, setPrintEmployees] = useState([]);

  const onPrint = () => {
    window.print();
  };
  const fetchEmployees = async (query) => {
    // if (!query.generalDepartment) {
    //   return setPrintEmployees([]);
    // }
    console.log({query});
    let searchQuery = new URLSearchParams();
    Object.keys(query).forEach((v) => {
      console.log(query[v]);
      if (query[v]) {
        searchQuery.append(v, query[v]);
      }
    });
    console.log(searchQuery.toString());
    const { data } = await fetcher("/api/users?" + searchQuery.toString());
    setPrintEmployees(data);
  };
  const options = [
    { label: "លរ", value: "no" },
    { label: "ឈ្មោះ", value: "name" },
    { label: "ភេទ", value: "sex" },
    { label: "ថ្ងៃខែឆ្នាំកំណើត", value: "birthDate" },
    { label: "មុខតំណែង", value: "position" },
    { label: "ស្ថានភាព", value: "status" },
  ];
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedGeneralDepartment, setSelectedGeneralDepartment] =
    useState("");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
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
    <div className={styles.printReportContainer}>
      <Checkbox
        style={{ marginTop: "20px" }}
        indeterminate={indeterminate}
        onChange={(e) => {
          setCheckedList(e.target.checked ? options.map((v) => v.value) : []);
          setIndeterminate(false);
          setCheckAll(e.target.checked);
        }}
        checked={checkAll}
      >
        ទាំងអស់
      </Checkbox>
      {/* <Divider /> */}
      <Checkbox.Group
        style={{ marginBottom: "20px", display: "flex" }}
        options={options}
        value={checkedList}
        onChange={(checkedValues) => {
          setCheckedList(checkedValues);
          setIndeterminate(
            !!checkedValues.length && checkedValues.length < options.length
          );
          setCheckAll(checkedValues.length === options.length);
        }}
      />
      <Form
        form={form}
        onValuesChange={(changed, allValues) => {
          // setChoiceDepartment(allValues.department);
          // if (changed.generalDepartment) {
          //   delete allValues.department;
          // }
          let resetFields = {};
          if (changed.unit) {
            setSelectedUnit(changed.unit);
            if (structureMOJ[changed.unit][""]) {
              setSelectedGeneralDepartment("");
              resetFields.generalDepartment = "";
              //   allValues.generalDepartment = "";
            } else {
              resetFields.generalDepartment = null;
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

          fetchEmployees(queryValue);
        }}
      >
        <Row gutter={16}>
          <Col span={5}>
            <Form.Item style={{ marginBottom: 10 }} name="unit" label="អង្គភាព">
              <Select placeholder="ជ្រើសរើស" allowClear>
                {Object.keys(structureMOJ).map((v) => (
                  <Option value={v}>{v}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              style={{ marginBottom: 10 }}
              name="generalDepartment"
              label="អគ្គនាយកដ្ឋាន"
            >
              <Select
                placeholder="ជ្រើសរើស"
                allowClear
                // disabled={
                //   isDisabledGeneralDepartment ||
                //   session?.user?.role == "moderator"
                // }
                disabled={
                  isDisabledGeneralDepartment
                  // session?.user?.role == "moderator"
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
          <Col span={5}>
            <Form.Item
              style={{ marginBottom: 10 }}
              name="department"
              label="នាយកដ្ឋាន"
            >
              <Select
                placeholder="ជ្រើសរើស"
                allowClear
                disabled={isDisabledDepartment}
                // disabled={
                //   isDisabledDepartment ||
                //   (session?.user?.role == "moderator" &&
                //     session?.user?.moderatorType == "department")
                // }
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
          <Col span={5}>
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
            <Button icon={<PrinterOutlined />} onClick={onPrint}>
              បោះពុម្ព
            </Button>
          </Col>
        </Row>
      </Form>
      <PrintReport
        checkedList={checkedList}
        printEmployees={printEmployees}
        generalDepartment={choiceGeneralDepartment}
        department={choiceDepartment}
      />
    </div>
  );
};

export default Report;
