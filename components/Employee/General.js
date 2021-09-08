import styles from "@/styles/Employee.module.css";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";

import { Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { placeFormat } from "@/utils/formalFormat";

const General = ({ userData }) => {
   return (
      <div className={styles.generalInfoContainer}>
         <Row gutter={24} justify="start">
            <Col span={6}>
               <div className={styles.userImg}>
                  <img src={userData?.photo} alt="" width="160" height="180" />
                  <Link href={`/employee/${userData.id}/edit`}>
                     <Button danger style={{ marginRight: 8 }}>
                        កែប្រែព័ត៌មានបុគ្គល
                     </Button>
                  </Link>
               </div>
            </Col>
            <Col span={18}>
               <div className={styles.generalInfo}>
                  <h1>
                     <UserOutlined style={{ fontSize: 23, marginRight: 5 }} />
                     ព័ត៌មានទូទៅ
                  </h1>
                  <Row style={{ marginTop: 15 }}>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>គោត្តនាម និង​នាម</span>
                        <span className={styles.hightLightInfo}>
                           {userData.firstName + " " + userData.lastName}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>លេខសំបុត្រកំណើត</span>
                        <span className={styles.hightLightInfo}>
                           {userData.birthCertificateNum}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>គោត្តនាម និង​នាម ឡាតាំង</span>
                        <span className={styles.hightLightInfo}>
                           {userData.firstNameLatin +
                              " " +
                              userData.lastNameLatin}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>លេខអត្តសញ្ជាតិខ្មែរ</span>
                        <span className={styles.hightLightInfo}>
                           {userData.nationalityIDNum}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>ភេទ</span>
                        <span className={styles.hightLightInfo}>
                           {userData.gender}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>លេខលិខិតឆ្លងដែន</span>
                        <span className={styles.hightLightInfo}>
                           {userData.passportNumber}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>ថ្ងៃខែឆ្នាំកំណើត</span>
                        <span className={styles.hightLightInfo}>
                           {moment(userData.birthDate)
                              .local(true)
                              .format("DD/MM/YYYY")}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>លេខទូរស័ព្ទ</span>
                        <span className={styles.hightLightInfo}>
                           {userData.contactInfo?.phoneNumber1}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>អត្តលេខមន្រ្ដីរាជការ</span>
                        <span className={styles.hightLightInfo}>
                           {userData?.civilID}
                        </span>
                     </Col>
                     <Col span={12} className={styles.singleGeneralInfo}>
                        <span>អ៊ីម៉ែល</span>
                        <span className={styles.hightLightInfo}>
                           {userData.contactInfo?.email}
                        </span>
                     </Col>
                     <Col span={24} className={styles.singleGeneralInfo}>
                        <span style={{ flex: 1 }}>ទីកន្លែងកំណើត</span>
                        <span
                           className={styles.hightLightInfo}
                           style={{ flex: 6 }}
                        >
                           {userData.birthPlace &&
                              placeFormat(userData.birthPlace)}
                        </span>
                     </Col>
                     <Col span={24} className={styles.singleGeneralInfo}>
                        <span style={{ flex: 1 }}>អាស័យដ្ឋាន</span>
                        <span
                           className={styles.hightLightInfo}
                           style={{ flex: 6 }}
                        >
                           {userData.currentResidence &&
                              placeFormat(userData.currentResidence)}
                        </span>
                     </Col>
                  </Row>
               </div>
            </Col>
         </Row>
      </div>
   );
};

export default General;
