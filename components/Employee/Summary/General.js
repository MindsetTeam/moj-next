import styles from "@/styles/Employee.module.css";

import { Row, Col, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { placeFormat } from "@/utils/formalFormat";

const General = ({ userData }) => {
   return (
      <div className={styles.generalInfoContainer}>
         <div className={styles.topSection}>
            <Row gutter={30} style={{ marginBottom: 20 }}>
               <Col span={6}>អត្តលេខមន្រ្ដីរាជការ</Col>
               <Col span={6} className={styles.greyText}>
                  {userData?.civilID}
               </Col>

               <Col span={6}>ឋានន្តរសកិ្ត និងថ្នាក់</Col>
               <Col span={6} className={styles.greyText}>
                  ...
               </Col>
            </Row>
            <Row gutter={30} style={{ marginBottom: 20 }}>
               <Col span={6}>តួនាទី</Col>
               <Col span={6} className={styles.greyText}>
                  ...
               </Col>

               <Col span={6}>អគ្គនាយកដ្ឋាន</Col>
               <Col span={6} className={styles.greyText}>
                  ...
               </Col>
            </Row>
            <Row gutter={30} style={{ marginBottom: 20 }}>
               <Col span={6}>នាយកដ្ឋាន</Col>
               <Col span={6} className={styles.greyText}>
                  ...
               </Col>

               <Col span={6}>លេខប័ណ្ណមន្រ្ដីរាជការ</Col>
               <Col span={6} className={styles.greyText}>
                  {userData.officerID}
               </Col>
            </Row>
         </div>
         <hr style={{ border: "2px solid #eee" }} />
         <div className={styles.bottomSection}>
            <Row gutter={30} style={{ marginBottom: 20 }}>
               <Col span={6}>លេខទូរស័ព្ទ</Col>
               <Col span={6} className={styles.greyText}>
                  {userData.contactInfo?.phoneNumber1}
               </Col>

               <Col span={6}>អ៊ីម៉ែល</Col>
               <Col span={6} className={styles.greyText}>
                  {userData.contactInfo?.email}
               </Col>
            </Row>

            <Row gutter={30} style={{ marginBottom: 20 }}>
               <Col span={6}>ទីកន្លែងកំណើត</Col>
               <Col span={18} className={styles.greyText}>
                  {userData.birthPlace && placeFormat(userData.birthPlace)}
               </Col>
            </Row>

            <Row gutter={30} style={{ marginBottom: 20 }}>
               <Col span={6}>អាស័យដ្ឋាន</Col>
               <Col span={18} className={styles.greyText}>
                  {userData.currentResidence &&
                     placeFormat(userData.currentResidence)}
               </Col>
            </Row>
         </div>
      </div>
   );
};

export default General;
