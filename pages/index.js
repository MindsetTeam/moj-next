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
  const {
    data: overviewData,
    error,
  } = useSWR(session?.user.role != "user" ? "/api/users/overview" : null);

  const statusOfficer = (
    <div className={styles.statusOfficerContainer}>
      <div>
        <TeamOutlined
          style={{ fontSize: "1.4rem", marginRight: 10 }}
        ></TeamOutlined>
        <span>ស្ថានភាពមន្ត្រីរាជការ គិតត្រឹមឆ្នាំ 2021</span>
      </div>
      <div>
        {overviewData?.data?.totalEmployee || 0} នាក់
        {/* <DownOutlined></DownOutlined> */}
      </div>
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
      {/* <div>
            0 នាក់ <DownOutlined></DownOutlined>
         </div> */}
    </div>
  );

  return (
    <div className={styles.container}>
      {!overviewData && !error && <p>loading</p>}
      {session?.user.role !== "admin" && <p>Home Page</p>}
      {session?.user.role === "admin" && (
        <>
          <div className={styles.topSection}>
            <Row gutter={50}>
              <Col span={12}>{statusOfficer}</Col>
              <Col span={12}>{civilOfficer}</Col>
            </Row>
          </div>
          <div className={styles.middleSection}>
            <Row gutter={50}>
              <Col span={12}>
                <div className={styles.pieChart}>
                  {/* <p>1</p> */}
                  <Chart
                    centerInstitution={overviewData?.data?.centerInstitution}
                  ></Chart>
                </div>
              </Col>
              <Col span={12}>
                <Row gutter={50} style={{ marginBottom: 15 }}>
                  <Col span={12}>
                    <HomeCard
                      number={
                        overviewData?.data?.officerStatusList?.[
                          "មន្ត្រីពេញសិទ្ធ/មន្រ្តីក្រប​ខណ្ឌ"
                        ] || 0
                      }
                      title="មន្រ្ដីក្របខ័ណ្ឌ"
                      color="red"
                    ></HomeCard>
                  </Col>
                  <Col span={12}>
                    <HomeCard
                      number={
                        overviewData?.data?.officerStatusList?.[
                          "មន្រ្តីកម្មសិក្សា"
                        ] || 0
                      }
                      title="មន្ត្រីកំពុងកម្មសិក្សា"
                      color="green"
                    ></HomeCard>
                  </Col>
                </Row>
                <Row gutter={50}>
                  <Col span={12}>
                    <HomeCard
                      number={
                        overviewData?.data?.officerStatusList?.[
                          "គ្មានក្រប​ខណ្ឌ"
                        ] || 0
                      }
                      title="មន្ត្រីកិច្ចសន្យា"
                      color="lightblue"
                    ></HomeCard>
                  </Col>
                  <Col span={12}>
                    <HomeCard
                      number={overviewData?.data?.retiredEmployee || 0}
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
                      <td>
                        {overviewData?.data?.generalDepartmentList?.[
                          "អគ្គលេខាធិការដ្ឋាន"
                        ] || 0}{" "}
                        នាក់
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Dot color="blue"></Dot>
                        អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋបាលតុលាការ
                      </td>
                      <td>
                        {overviewData?.data?.generalDepartmentList?.[
                          "អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋបាលតុលាការ"
                        ] || 0}{" "}
                        នាក់
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Dot color="purple"></Dot>
                        អគ្គនាយកកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ
                      </td>
                      <td>
                        {overviewData?.data?.generalDepartmentList?.[
                          "អគ្គនាយកកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ"
                        ] || 0}{" "}
                        នាក់
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Dot color="pink"></Dot>
                        អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋប្បវេណី
                      </td>
                      <td>
                        {overviewData?.data?.generalDepartmentList?.[
                          "អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋប្បវេណី"
                        ] || 0}{" "}
                        នាក់
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Dot color="brown"></Dot>
                        អគ្គនាយកដ្ឋានអភិវឌ្ឍន៍វិស័យយុត្តិធម៌
                      </td>
                      <td>
                        {overviewData?.data?.generalDepartmentList?.[
                          "អគ្គនាយកដ្ឋានអភិវឌ្ឍន៍វិស័យយុត្តិធម៌"
                        ] || 0}{" "}
                        នាក់
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Dot color="yellow"></Dot>
                        អគ្គធិការដ្ឋានកិច្ចការតុលាការ
                      </td>
                      <td>
                        {overviewData?.data?.generalDepartmentList?.[
                          "អគ្គធិការដ្ឋានកិច្ចការតុលាការ"
                        ] || 0}{" "}
                        នាក់
                      </td>
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
        </>
      )}
    </div>
  );
};

export default Index;
