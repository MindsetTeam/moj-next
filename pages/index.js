import styles from "@/styles/Home.module.css";
import HomeCard from "@/components/Home/HomeCard";
import Chart from "@/components/Home/Chart";
import SummaryList from "@/components/Home/SummaryList";

import { useRouter } from "next/router";

import { Row, Col } from "antd";
import { TeamOutlined } from "@ant-design/icons";

import { useSession } from "next-auth/client";
import useSWR from "swr";

const Index = (props) => {
  const [session, loading] = useSession();
  const router = useRouter();
  console.log(session);
  if (session.user && session.user.role == "user") {
    router.push("/me");
  }
  const { data: overviewData, error } = useSWR(
    ["admin", "editor", "moderator"].includes(session?.user?.role)
      ? "/api/users/overview"
      : null
  );

  const statusOfficer = (
    <div className={styles.statusOfficerContainer}>
      <div>
        <TeamOutlined
          style={{ fontSize: "1.4rem", marginRight: 10 }}
        ></TeamOutlined>
        <span>ទិន្នន័យមន្ត្រីរាជការ គិតត្រឹមឆ្នាំ 2021</span>
      </div>
      <div>{overviewData?.data?.totalEmployee || 0} នាក់</div>
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
      {/* {!overviewData && !error && <p>loading</p>} */}
      {/* {!["admin", "editor"].includes(session?.user?.role) && <p>Home Page</p>} */}
      {["admin", "editor", "moderator"].includes(session?.user?.role) && (
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
                  <Col span={12}
                  onClick={() =>
                    router.push({
                      pathname: "/employee",
                      query: {
                        rank: "មន្ត្រីពេញសិទ្ធ/មន្រ្តីក្រប​ខណ្ឌ",
                      },
                    })
                  }>
                    <HomeCard
                      number={
                        overviewData?.data?.officerStatusList?.[
                          "មន្ត្រីពេញសិទ្ធ/មន្រ្តីក្រប​ខណ្ឌ"
                        ] || 0
                      }
                      title="ថ្នាក់ដឹកនាំ​ និងមន្រ្ដីរាជការ"
                      color="red"
                    ></HomeCard>
                  </Col>
                  <Col
                    span={12}
                    onClick={() =>
                      router.push({
                        pathname: "/employee",
                        query: {
                          rank: "មន្រ្តីកម្មសិក្សា",
                        },
                      })
                    }
                  >
                    <HomeCard
                      number={
                        overviewData?.data?.officerStatusList?.[
                          "មន្រ្តីកម្មសិក្សា"
                        ] || 0
                      }
                      title="មន្ត្រីកម្មសិក្សា"
                      color="green"
                    ></HomeCard>
                  </Col>
                </Row>
                <Row gutter={50}>
                  <Col
                    span={12}
                    onClick={() =>
                      router.push({
                        pathname: "/employee",
                        query: {
                          rank: "មន្ត្រីកិច្ចសន្យា",
                        },
                      })
                    }
                  >
                    <HomeCard
                      number={
                        overviewData?.data?.officerStatusList?.[
                          "មន្ត្រីកិច្ចសន្យា"
                        ] || 0
                      }
                      title="មន្ត្រីកិច្ចសន្យា"
                      color="lightblue"
                    ></HomeCard>
                  </Col>
                  <Col
                    span={12}
                    onClick={() =>
                      router.push({
                        pathname: "/employee",
                        query: {
                          retired: true,
                        },
                      })
                    }
                  >
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
                <div style={{ height: 300, backgroundColor: "#FEE5D1" }}>
                  <iframe
                    width="100%"
                    height="300"
                    src="https://www.youtube.com/embed/N3R9QGvjimg"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.summaryContainer}>
                  <SummaryList overviewData={overviewData}></SummaryList>
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
