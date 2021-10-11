import { Row, Col, Collapse, Tabs } from "antd";
import moment from "moment";

import styles from "@/styles/Employee.module.css";

import General from "@/components/Employee/Summary/General";
import Rank from "@/components/Employee/Summary/Rank";
import Family from "@/components/Employee/Summary/Family";
import Education from "@/components/Employee/Summary/Education";
import WorkHistory from "@/components/Employee/Summary/WorkHistory";
import Status from "@/components/Employee/Summary/Status";
import Attachment from "@/components/Employee/Summary/Attachment";

const { TabPane } = Tabs;

const SummaryInfo = ({
   userData,
   ministryStructure,
   statusOfficer,
   ministryList,
   letterTypes,
   rankList,
}) => {
   return (
      <div className={`${styles.summaryInfoContainer} summary`}>
         <Row gutter={50}>
            <Col span={6}>
               <div className={styles.leftSection}>
                  <div className={styles.userImg}>
                     <img
                        src={userData?.photo}
                        alt=""
                        width="230"
                        height="250"
                     />
                  </div>
                  <div>
                     <table>
                        <tr>
                           <td>លេខអត្តសញ្ជាតិខ្មែរ</td>
                           <td className={styles.greyText}>
                              {userData.nationalityIDNum}
                           </td>
                        </tr>
                        <tr>
                           <td>គោត្តនាម និង​នាម</td>
                           <td className={styles.greyText}>
                              {userData.firstName + " " + userData.lastName}
                           </td>
                        </tr>
                        <tr>
                           <td>គោត្តនាម និង​នាម ឡាតាំង</td>
                           <td className={styles.greyText}>
                              {userData.firstNameLatin +
                                 " " +
                                 userData.lastNameLatin}
                           </td>
                        </tr>
                        <tr>
                           <td>ភេទ</td>
                           <td className={styles.greyText}>
                              {userData.gender}
                           </td>
                        </tr>
                        <tr>
                           <td>ថ្ងៃខែឆ្នាំកំណើត</td>
                           <td className={styles.greyText}>
                              {moment(userData.birthDate)
                                 .local(true)
                                 .format("DD/MM/YYYY")}
                           </td>
                        </tr>
                     </table>
                  </div>
               </div>
            </Col>
            <Col span={18}>
               <div className={styles.rightSection}>
                  <Tabs
                     defaultActiveKey="1"
                     size="small"
                     className={styles.specificInfo}
                     centered
                  >
                     <TabPane
                        tab={
                           <span>
                              <img src="/user.png" width="30" height="30" />
                              ព័ត៌មានទូទៅ
                           </span>
                        }
                        key="1"
                     >
                        <General userData={userData}></General>
                     </TabPane>
                     <TabPane
                        tab={
                           <span>
                              <img src="/rank.png" width="30" height="30" />
                              ឋានន្តរសកិ្ត និងថ្នាក់
                           </span>
                        }
                        key="2"
                     >
                        <Rank userData={userData}></Rank>
                     </TabPane>
                     <TabPane
                        tab={
                           <span>
                              <img src="/family.png" width="30" height="30" />
                              គ្រួសារ
                           </span>
                        }
                        key="3"
                     >
                        <Family userData={userData}></Family>
                     </TabPane>
                     <TabPane
                        tab={
                           <span>
                              <img
                                 src="/education.png"
                                 width="30"
                                 height="30"
                              />
                              កម្រិតវប្បធម៌
                           </span>
                        }
                        key="4"
                     >
                        <Education userData={userData}></Education>
                     </TabPane>
                     <TabPane
                        tab={
                           <span>
                              <img src="/work.png" width="30" height="30" />
                              ប្រវត្តិការងារ
                           </span>
                        }
                        key="5"
                     >
                        <WorkHistory
                           userData={userData}
                           ministryStructure={ministryStructure}
                        ></WorkHistory>
                     </TabPane>
                     <TabPane
                        tab={
                           <span>
                              <img src="/status.png" width="30" height="30" />
                              ស្ថានភាពមន្រ្ដី
                           </span>
                        }
                        key="6"
                     >
                        <Status
                           userData={userData}
                           rankList={rankList}
                           letterTypes={letterTypes}
                           ministryList={ministryList}
                           statusOfficer={statusOfficer}
                        ></Status>
                     </TabPane>

                     <TabPane
                        tab={
                           <span>
                              <img
                                 src="/attachment.png"
                                 width="30"
                                 height="30"
                              />
                              ឯកសារយោង
                           </span>
                        }
                        key="7"
                     >
                        <Attachment></Attachment>
                     </TabPane>
                  </Tabs>
               </div>
            </Col>
         </Row>
         <style global jsx>{`
            .summary .ant-tabs-tab-btn span {
               display: flex;
               flex-direction: column;
               align-items: center;
               gap: 1rem;
            }
            .summary .ant-tabs-tab-btn .anticon {
               margin-right: 0;
            }

            .summary .ant-tabs-tab > div {
               position: relative;
               top: 0;
               transition: top 0.2s;
            }
            .summary .ant-tabs-tab:hover > div {
               top: -4px;
            }
         `}</style>
      </div>
   );
};

export default SummaryInfo;
