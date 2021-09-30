import styles from "@/styles/Home.module.css";
import HomeCard from "@/components/Home/HomeCard";
import Chart from "@/components/Home/Chart";
import Dot from "@/components/Home/Dot";

import { Row, Col, Collapse } from "antd";
import { TeamOutlined, DownOutlined } from "@ant-design/icons";

import { useSession } from "next-auth/client";
import useSWR from "swr";

const { Panel } = Collapse;

const Index = (props) => {
   const [session, loading] = useSession();
   const { data: displayData } = useSWR(
      session?.user.role != "user" ? "/api/users/overview" : null
   );

   const statusOfficer = (
      <div className={styles.statusOfficerContainer}>
         <div>
            <TeamOutlined
               style={{ fontSize: "1.4rem", marginRight: 10 }}
            ></TeamOutlined>
            <span>ស្ថានភាពមន្ត្រីរាជការ គិតត្រឹមឆ្នាំ2021</span>
         </div>
         <div>1000000 នាក់</div>
      </div>
   );

   const civilOfficer = (
      <div className={styles.civilOfficerContainer}>
         <div>
            <TeamOutlined
               style={{ fontSize: "1.4rem", marginRight: 10 }}
            ></TeamOutlined>
            <span>មន្ត្រីរាជការតាមស៊ីវិល តាមប្រភេទក្របខ័ណ្ឌ</span>
         </div>
         <div>1000000 នាក់</div>
      </div>
   );

   return (
      <div className={styles.container}>
         <div className={styles.topSection}>
            <Row gutter={50}>
               <Col span={12}>
                  <Collapse
                     accordion
                     expandIconPosition="right"
                     expandIcon={({ isActive }) => (
                        <DownOutlined rotate={isActive ? 180 : 0} />
                     )}
                  >
                     <Panel header={statusOfficer} key="1">
                        <p>Nothing to see here</p>
                     </Panel>
                  </Collapse>
               </Col>
               <Col span={12}>
                  <Collapse
                     accordion
                     expandIconPosition="right"
                     expandIcon={({ isActive }) => (
                        <DownOutlined rotate={isActive ? 180 : 0} />
                     )}
                  >
                     <Panel header={civilOfficer} key="1">
                        <p>Nothing to see here</p>
                     </Panel>
                  </Collapse>
               </Col>
            </Row>
         </div>
         <div className={styles.middleSection}>
            <Row gutter={50}>
               <Col span={12}>
                  <div className={styles.pieChart}>
                     <p>1</p>
                     <Chart></Chart>
                  </div>
               </Col>
               <Col span={12}>
                  <Row gutter={50} style={{ marginBottom: 15 }}>
                     <Col span={12}>
                        <HomeCard
                           number={10}
                           title="មន្រ្ដីកំពុងកម្មសិក្សា"
                           color="red"
                        ></HomeCard>
                     </Col>
                     <Col span={12}>
                        <HomeCard
                           number={20}
                           title="មន្ត្រីកំពុងកម្មសិក្សា"
                           color="green"
                        ></HomeCard>
                     </Col>
                  </Row>
                  <Row gutter={50}>
                     <Col span={12}>
                        <HomeCard
                           number={30}
                           title="មន្ត្រីកិច្ចសន្យា"
                           color="lightblue"
                        ></HomeCard>
                     </Col>
                     <Col span={12}>
                        <HomeCard
                           number={40}
                           title="មន្ត្រីចូលនិវត្តន៍"
                           color="teal"
                        ></HomeCard>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </div>
         <div className={styles.bottomSection}>
            <Row gutter={50}>
               <Col span={12}>
                  <div className={styles.summaryContainer}>
                     <table>
                        <tr>
                           <td>
                              <Dot color="green"></Dot>
                              អគ្គលេខាធិការដ្ឋាន
                           </td>
                           <td>0 នាក់</td>
                        </tr>
                        <tr>
                           <td>
                              <Dot color="blue"></Dot>
                              អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋបាលតុលាការ
                           </td>
                           <td>0 នាក់</td>
                        </tr>
                        <tr>
                           <td>
                              <Dot color="purple"></Dot>
                              អគ្គនាយកកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ
                           </td>
                           <td>0 នាក់</td>
                        </tr>
                        <tr>
                           <td>
                              <Dot color="pink"></Dot>
                              អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋប្បវេណី
                           </td>
                           <td>0 នាក់</td>
                        </tr>
                        <tr>
                           <td>
                              <Dot color="brown"></Dot>
                              អគ្គនាយកដ្ឋានអភិវឌ្ឍន៍វិស័យយុត្តិធម៌
                           </td>
                           <td>0 នាក់</td>
                        </tr>
                        <tr>
                           <td>
                              <Dot color="yellow"></Dot>
                              អគ្គធិការដ្ឋានកិច្ចការតុលាការ
                           </td>
                           <td>0 នាក់</td>
                        </tr>
                     </table>
                  </div>
               </Col>
               <Col span={12}>
                  <div style={{ height: 300, backgroundColor: "#FEE5D1" }}>
                     <iframe
                        width="100%"
                        height="300"
                        src="https://www.youtube.com/embed/KODKSNiVd7E"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                     ></iframe>
                  </div>
               </Col>
            </Row>
         </div>

         <style global jsx>{`
            .ant-collapse-icon-position-right
               > .ant-collapse-item
               > .ant-collapse-header
               .ant-collapse-arrow {
               margin-top: 5px;
            }
         `}</style>
      </div>
   );
};

export default Index;
