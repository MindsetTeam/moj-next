import styles from "@/styles/Edit.module.css";
import { AlertDispatch } from "contexts/alert.context";
import Image from "next/image";
import { useState, useContext } from "react";
import { UserOutlined, PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";

import {
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Radio,
  InputNumber,
  Select,
  Button,
  Upload,
} from "antd";

import { SaveOutlined } from "@ant-design/icons";
import api from "@/utils/api";

const genderOptions = [
  { label: "ប្រុស", value: "ប្រុស" },
  { label: "ស្រី", value: "ស្រី" },
];

const { Option } = Select;

const SelfInfo = ({ userData }) => {
  const dispatch = useContext(AlertDispatch);
  const [form] = Form.useForm();
  const [selfInfo, setSelfInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(userData.photo);
  const [fileList, setFileList] = useState([]);

  const onSave = () => {
    const dataInput = form.getFieldsValue(true);
    form.validateFields().then(async () => {
      if (fileList.length > 0) {
        const formData = new FormData();
        formData.append("img-profile", fileList[0]);
        const { data } = await api.post(
          `/api/users/profile-picture?employeeId=${userData.id}`,
          formData
        );
        dataInput.photo = data.data.photo;
      }

      const res = await api.put(`/api/users/${userData.id}`, dataInput);
      console.log(res);
      dispatch({
        type: "SUCCESS",
        payload: {
          message: "hello1",
          description: "kok dara",
        },
      });
    });
  };
  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  return (
    <div>
      <Form
        layout="vertical"
        hideRequiredMark
        form={form}
        initialValues={{
          ...userData,
          birthDate: userData.birthDate ? moment(userData.birthDate) : null,
        }}
      >
        {/* General Info  */}
        <div className={styles.generalInfoContainer}>
          <h1 className={styles.title}>
            <UserOutlined></UserOutlined>ព័ត៌មានទូទៅ
          </h1>
          <div style={{ display: "flex", marginTop: 15 }}>
            <div
              className={styles.imgContainer}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "10px",
                justifyItems: "center",
              }}
            >
              <img src={imageUrl} alt="" width="160" height="180" />
              <div className="">
                <Upload
                  name="img-profile"
                  accept="image/*"
                  maxCount={1}
                  showUploadList={false}
                  // onRemove={ file => {
                  //   setFileList(fileList => {
                  //     const index = fileList.indexOf(file);
                  //     const newFileList = fileList.slice();
                  //     newFileList.splice(index, 1);
                  //     return newFileList
                  //   });
                  // }}
                  // beforeUpload={file => {
                  //   console.log(file);
                  //   setFileList(fileList => ([...fileList, file]));
                  //   return true
                  // }}
                  fileList={fileList}
                  onChange={(info) => {
                    if (info.file.status === "done") {
                      getBase64(info.file.originFileObj, (imageUrl) => {
                        setImageUrl(imageUrl);
                      });
                      setFileList((fileList) => [
                        ...fileList,
                        info.file.originFileObj,
                      ]);
                    }
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload Profile Pic</Button>
                </Upload>
              </div>
            </div>

            <div className={styles.generalInfo}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="birthCertificateNum"
                    label="លេខសំបុត្រកំណើត"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញលេខសំបុត្រកំណើត",
                      },
                    ]}
                  >
                    <Input placeholder="លេខសំបុត្រកំណើត" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="nationalityIDNum"
                    label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="passportNumber"
                    label="លេខលិខិតឆ្លងដែន"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញលេខលិខិតឆ្លងដែន",
                      },
                    ]}
                  >
                    <Input placeholder="លេខលិខិតឆ្លងដែន" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="otherNum"
                    label="ផ្សេងៗ"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញផ្សេងៗ",
                      },
                    ]}
                  >
                    <Input placeholder="ផ្សេងៗ" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="lastName"
                    label="គោត្តនាម"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញគោត្តនាម",
                      },
                    ]}
                  >
                    <Input placeholder="គោត្តនាម" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="firstName"
                    label="នាម"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញនាម",
                      },
                    ]}
                  >
                    <Input placeholder="នាម" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="nationality"
                    label="សញ្ជាតិ"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញសញ្ជាតិ",
                      },
                    ]}
                  >
                    <Input placeholder="សញ្ជាតិ" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="lastNameLatin"
                    label="គោត្តនាមឡាតាំង"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញគោត្តនាមឡាតាំង",
                      },
                    ]}
                  >
                    <Input placeholder="គោត្តនាមឡាតាំង" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="firstNameLatin"
                    label="នាមឡាតាំង"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញនាមឡាតាំង",
                      },
                    ]}
                  >
                    <Input placeholder="នាមឡាតាំង" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="ethnicity"
                    label="ជនជាតិ"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញជនជាតិ",
                      },
                    ]}
                  >
                    <Input placeholder="ជនជាតិ" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="gender"
                    label="ភេទ"
                    rules={[
                      {
                        required: true,
                        message: "សូមជ្រើសរើសភេទ",
                      },
                    ]}
                  >
                    <Radio.Group options={genderOptions}></Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="birthDate"
                    label="ថ្ងៃខែឆ្នាំកំណើត"
                    rules={[
                      {
                        required: true,
                        message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="ថ្ងៃខែឆ្នាំកំណើត"
                      format='DD/MM/YYYY'
                      style={{ width: "100%" }}
                      //  onChange={onStartDateChange}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="bloodType"
                    label="ប្រភេទឈាម"
                  >
                    <Select placeholder="ជ្រើសរើស">
                      <Option value="O-">O-</Option>
                      <Option value="O+">O+</Option>
                      <Option value="A-">A-</Option>
                      <Option value="A+">A+</Option>
                      <Option value="B-">B-</Option>
                      <Option value="B+">B+</Option>
                      <Option value="AB-">AB-</Option>
                      <Option value="AB+">AB+</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="familyStatus"
                    label="ស្ថានភាពគ្រួសារ"
                    rules={[
                      {
                        required: true,
                        message: "សូមជ្រើសរើសស្ថានភាពគ្រួសារ",
                      },
                    ]}
                  >
                    <Select placeholder="ជ្រើសរើស">
                      <Option value="នៅលីវ">នៅលីវ</Option>
                      <Option value="រៀបការ">រៀបការ</Option>
                      <Option value="ពោះម៉ាយ">ពោះម៉ាយ</Option>
                      <Option value="មេម៉ាយ">មេម៉ាយ</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="physical"
                    label="កាយសម្បទា"
                    rules={[
                      {
                        required: true,
                        message: "សូមជ្រើសរើសកាយសម្បទា",
                      },
                    ]}
                  >
                    <Select placeholder="ជ្រើសរើស">
                      <Option value="គ្រប់គ្រាន់">គ្រប់គ្រាន់</Option>
                      <Option value="ពិការភាព">ពិការភាព</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    name="disabilityNum"
                    label="បញ្ជាក់ពិការភាព"
                  >
                    <Input placeholder="កំណត់សំគាល់" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </div>

        {/* Birth Place */}
        <div className={styles.birthPlaceContainer}>
          <h1 className={styles.title}>
            <UserOutlined></UserOutlined>ទីកន្លែងកំណើត
          </h1>
          <div style={{ marginTop: 15 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["birthPlace", "village"]}
                  label="ភូមិ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញភូមិ",
                    },
                  ]}
                >
                  <Input placeholder="ភូមិ" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["birthPlace", "commune"]}
                  label="ឃុំ/សង្កាត់"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញឃុំ/សង្កាត់",
                    },
                  ]}
                >
                  <Input placeholder="ឃុំ/សង្កាត់" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["birthPlace", "district"]}
                  label="ស្រុក/ខណ្ឌ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញស្រុក/ខណ្ឌ",
                    },
                  ]}
                >
                  <Input placeholder="ស្រុក/ខណ្ឌ" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["birthPlace", "province"]}
                  label="រាជធានី/ខេត្ត"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញរាជធានី/ខេត្ត",
                    },
                  ]}
                >
                  <Input placeholder="រាជធានី/ខេត្ត" />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row>
              <Col span={24}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["birthPlace", "other"]}
                  label="ទីកន្លែងកំណើតផ្សេងៗ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញទីកន្លែងកំណើតផ្សេងៗ",
                    },
                  ]}
                >
                  <Input placeholder="ទីកន្លែងកំណើតផ្សេងៗ" />
                </Form.Item>
              </Col>
            </Row> */}
          </div>
        </div>

        {/* Address */}
        <div className={styles.addressContainer}>
          <h1 className={styles.title}>
            <UserOutlined></UserOutlined>ទីលំនៅបច្ចុប្បន្ន
          </h1>
          <div style={{ marginTop: 15 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "province"]}
                  label="រាជធានី/ខេត្ត"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញរាជធានី/ខេត្ត",
                    },
                  ]}
                >
                  <Input placeholder="រាជធានី/ខេត្ត" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "district"]}
                  label="ស្រុក/ខណ្ឌ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញស្រុក/ខណ្ឌ",
                    },
                  ]}
                >
                  <Input placeholder="ស្រុក/ខណ្ឌ" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "commune"]}
                  label="ឃុំ/សង្កាត់"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញឃុំ/សង្កាត់",
                    },
                  ]}
                >
                  <Input placeholder="ឃុំ/សង្កាត់" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "village"]}
                  label="ភូមិ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញភូមិ",
                    },
                  ]}
                >
                  <Input placeholder="ភូមិ" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "houseNum"]}
                  label="ផ្ទះលេខ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញផ្ទះលេខ",
                    },
                  ]}
                >
                  <Input placeholder="ផ្ទះលេខ" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "streetNum"]}
                  label="ផ្លូវលេខ"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញផ្លូវលេខ",
                    },
                  ]}
                >
                  <Input placeholder="ផ្លូវលេខ" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["currentResidence", "other"]}
                  label="ទីលំនៅបច្ចុប្បន្នផ្សេងៗ"
                 
                >
                  <Input placeholder="ទីលំនៅបច្ចុប្បន្នផ្សេងៗ" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>

        {/* Contact */}
        <div className={styles.contactContainer}>
          <h1 className={styles.title}>
            <PhoneOutlined></PhoneOutlined>ទំនាក់ទំនង
          </h1>
          <div style={{ marginTop: 15 }}>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["contactInfo", "phoneNumber1"]}
                  label="លេខទូរស័ព្ទទី១"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញលេខទូរស័ព្ទទី១",
                    },
                  ]}
                >
                  <Input placeholder="លេខទូរស័ព្ទទី១" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["contactInfo", "phoneNumber2"]}
                  label="លេខទូរស័ព្ទទី២"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញលេខទូរស័ព្ទទី២",
                    },
                  ]}
                >
                  <Input placeholder="លេខទូរស័ព្ទទី២" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["contactInfo", "email"]}
                  label="អ៊ីម៉ែល"
                  rules={[
                    {
                      required: true,
                      message: "សូមបំពេញអ៊ីម៉ែល",
                    },
                  ]}
                >
                  <Input placeholder="អ៊ីម៉ែល" />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  style={{ marginBottom: 10 }}
                  name={["contactInfo", "other"]}
                  label="ព័ត៌មានផ្សេងៗ"
                 
                >
                  <Input placeholder="ព័ត៌មានផ្សេងៗ" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
      <div className={styles.btnContainer}>
        <Button icon={<SaveOutlined />} onClick={onSave}>
          រក្សាទុក
        </Button>
      </div>
    </div>
  );
};

export default SelfInfo;
