// import { Card, Row, Col, Divider, Table, Tag } from "antd";
import { Card, Row, Col, Divider, Tag } from "antd";
// import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { TeamOutlined } from "@ant-design/icons";
import Image from "next/image";
import TyperPNG from "@/public/home/typer.png";
// import { useEffect, useState } from "react";
// import api from "@/utils/api";

// import General from "@/components/Employee/General";
import { useSession } from "next-auth/client";
import useSWR from "swr";

// const { Meta } = Card;

const Index = (props) => {
   const [session, loading] = useSession();
   const { data: displayData } = useSWR(
      session?.user.role != "user" ? "/api/users/overview" : null
   );

   return (
      <div>
         <div className="top-section">
            <Row gutter={16}>
               <Col span={16}>
                  <div
                     style={{
                        height: 230,
                        backgroundColor: "#FEE5D1",
                        borderRadius: 10,
                        padding: 10,
                        paddingLeft: 20,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                     }}
                  >
                     <Image
                        src={TyperPNG}
                        alt="Typer"
                        placeholder="blur"
                        width={200}
                        height={190}
                     />
                     <section
                        style={{
                           marginTop: -50,
                        }}
                     >
                        <h1 style={{ color: "orange", fontSize: "1.5rem" }}>
                           សូមស្វាគមន៏មកកាន់ប្រព័ន្ធគ្រប់គ្រង khambodiaHR
                        </h1>
                        <div
                           style={{
                              marginTop: 30,
                              marginLeft: 50,
                              fontSize: "1rem",
                           }}
                        >
                           <p>
                              <span style={{ fontWeight: "bold" }}>+</span>
                              ប្រកាសស្ដីពីការប្រើប្រាស់ប្រព័ន្ធគ្រប់គ្រង
                              khambodiaHR
                           </p>
                           <p>
                              <span style={{ fontWeight: "bold" }}>+</span>{" "}
                              សេចក្ដីណែនាំ របៀបការប្រើប្រាស់ប្រព័ន្ធគ្រប់គ្រង
                              khambodiaHR
                           </p>
                        </div>
                     </section>
                  </div>
               </Col>
               <Col span={8}>
                  <div style={{ height: 230, backgroundColor: "#FEE5D1" }}>
                     <iframe
                        width="100%"
                        height="230"
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

         {/* General Info */}
         {/* {session?.user.role === "user" && <General userData={user}></General>} */}

         {/* List User */}
         {/* {session?.user.role === "editor" && (
            <div style={{ marginTop: 20 }}>
               <Table columns={columns} dataSource={employees}></Table>
            </div>
         )} */}
         {session?.user.role === "editor" && (
            <div style={{ width: "50%", margin: "auto", marginTop: 30 }}>
               <h1
                  style={{
                     textAlign: "center",
                     fontSize: "22px",
                     color: "#E6C155",
                  }}
               >
                  ចំនួនមន្ត្រីរាជការដែលបានបញ្ចូល
               </h1>
               <div
                  style={{
                     backgroundColor: "#fff",
                     padding: "10px 0px",
                     borderRadius: 10,
                  }}
               >
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "1.1em",
                        padding: "0px 10px",
                     }}
                  >
                     <div>
                        <TeamOutlined
                           style={{
                              fontSize: "2em",
                              color: "#E6C155",
                           }}
                        ></TeamOutlined>
                        <span style={{ marginTop: -30 }}>
                           មន្រ្ដីដែលបានបញ្ចូល
                        </span>
                     </div>
                     <div>{displayData?.data.total || 0} នាក់</div>
                  </div>
                  <Divider style={{ borderWidth: 2 }}></Divider>
                  <div
                     style={{
                        display: "flex",
                        justifyContent: "space-around",
                        paddingTop: 20,
                        paddingBottom: 25,
                     }}
                  >
                     <Card
                        hoverable
                        style={{
                           width: 200,
                           textAlign: "center",
                           borderRadius: 10,
                        }}
                     >
                        <TeamOutlined
                           style={{
                              fontSize: "2em",
                              color: "#E6C155",
                           }}
                        ></TeamOutlined>
                        <span
                           style={{
                              fontSize: "1.1em",
                              margin: "-20px 5px",
                           }}
                        >
                           មន្រ្ដីប្រុស
                        </span>
                        <Divider
                           style={{
                              borderColor: "#E6C155",
                              borderWidth: "2px",
                           }}
                        ></Divider>
                        <p
                           style={{
                              fontWeight: "bold",
                              fontSize: "1.4em",
                              paddingTop: 10,
                           }}
                        >
                           {displayData?.data.ប្រុស || 0} នាក់
                        </p>
                     </Card>
                     <Card
                        hoverable
                        style={{
                           width: 200,
                           textAlign: "center",
                           borderRadius: 10,
                        }}
                     >
                        <TeamOutlined
                           style={{
                              fontSize: "2em",
                              color: "#E6C155",
                           }}
                        ></TeamOutlined>
                        <span
                           style={{
                              fontSize: "1.1em",
                              margin: "-20px 5px",
                           }}
                        >
                           មន្រ្ដីស្រី
                        </span>
                        <Divider
                           style={{
                              borderColor: "#E6C155",
                              borderWidth: "2px",
                           }}
                        ></Divider>
                        <p
                           style={{
                              fontWeight: "bold",
                              fontSize: "1.4em",
                              paddingTop: 10,
                           }}
                        >
                           {displayData?.data.ស្រី || 0} នាក់
                        </p>
                     </Card>
                  </div>
               </div>
            </div>
         )}

         {/* Admin */}
         {session?.user.role === "admin" && (
            <>
               <div style={{ margin: "30px 0px" }}>
                  <h1
                     style={{
                        textAlign: "center",
                        fontSize: "22px",
                        color: "#E6C155",
                     }}
                  >
                     ចំនួនមន្ត្រីរាជការស៊ីវិល តាមប្រភេទក្របខ័ណ្ឌ
                  </h1>
                  <div
                     style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                     }}
                  >
                     <Card
                        hoverable
                        style={{
                           width: 290,
                           textAlign: "center",
                           borderRadius: 10,
                        }}
                     >
                        <TeamOutlined
                           style={{ fontSize: "2em", color: "#E6C155" }}
                        ></TeamOutlined>
                        <span
                           style={{
                              color: "#4B5E9B",
                              fontSize: "1.1em",
                              margin: "-20px 5px",
                           }}
                        >
                           មន្រ្ដីក្របខ័ណ្ឌ
                        </span>
                        <Divider
                           style={{
                              borderColor: "#E6C155",
                              borderWidth: "2px",
                           }}
                        ></Divider>
                        <p
                           style={{
                              color: "#4B5E9B",
                              fontWeight: "bold",
                              fontSize: "1.4em",
                           }}
                        >
                           {displayData?.data?.centerInstitution
                              ? displayData?.data?.centerInstitution.total +
                                displayData?.data?.provinceInstitution.total
                              : 0}
                        </p>
                        <p>នាក់ ក្នុងឆ្នាំ2021</p>
                     </Card>

                     <Card
                        hoverable
                        style={{
                           width: 290,
                           textAlign: "center",
                           borderRadius: 10,
                           margin: "0px 30px",
                        }}
                     >
                        <TeamOutlined
                           style={{ fontSize: "2em", color: "#683131" }}
                        ></TeamOutlined>
                        <span
                           style={{
                              color: "#4B5E9B",
                              fontSize: "1.1em",
                              margin: "-20px 5px",
                           }}
                        >
                           មន្រ្ដីកំពុងកម្មសិក្សា
                        </span>
                        <Divider
                           style={{
                              borderColor: "#683131",
                              borderWidth: "2px",
                           }}
                        ></Divider>
                        <p
                           style={{
                              color: "#4B5E9B",
                              fontWeight: "bold",
                              fontSize: "1.4em",
                           }}
                        >
                           {displayData?.data?.officerStatusList[
                              "មន្រ្តីកម្មសិក្សា"
                           ] || 0}
                        </p>
                        <p>នាក់ ក្នុងឆ្នាំ2021</p>
                     </Card>

                     <Card
                        hoverable
                        style={{
                           width: 290,
                           textAlign: "center",
                           borderRadius: 10,
                        }}
                     >
                        <TeamOutlined
                           style={{ fontSize: "2em", color: "#4B5E9B" }}
                        ></TeamOutlined>
                        <span
                           style={{
                              color: "#4B5E9B",
                              fontSize: "1.1em",
                              margin: "-20px 5px",
                           }}
                        >
                           មន្រ្ដីគ្មានក្របខ័ណ្ឌ
                        </span>
                        <Divider
                           style={{
                              borderColor: "#4B5E9B",
                              borderWidth: "2px",
                           }}
                        ></Divider>
                        <p
                           style={{
                              color: "#4B5E9B",
                              fontWeight: "bold",
                              fontSize: "1.4em",
                           }}
                        >
                           {displayData?.data?.officerStatusList[
                              "គ្មានក្រប​ខណ្ឌ"
                           ] || 0}
                        </p>
                        <p>នាក់ ក្នុងឆ្នាំ2021</p>
                     </Card>

                     <Card
                        hoverable
                        style={{
                           width: 290,
                           textAlign: "center",
                           borderRadius: 10,
                           marginLeft: 30,
                        }}
                     >
                        <TeamOutlined
                           style={{ fontSize: "2em", color: "#486E6C" }}
                        ></TeamOutlined>
                        <span
                           style={{
                              color: "#4B5E9B",
                              fontSize: "1.1em",
                              margin: "-20px 5px",
                           }}
                        >
                           មន្រ្ដីចូលនិវត្តន៏
                        </span>
                        <Divider
                           style={{
                              borderColor: "#4B5E9B",
                              borderWidth: "2px",
                           }}
                        ></Divider>
                        <p
                           style={{
                              color: "#486E6C",
                              fontWeight: "bold",
                              fontSize: "1.4em",
                           }}
                        >
                           {displayData?.data?.retiredUsers}
                        </p>
                        <p>នាក់ ក្នុងឆ្នាំ2021</p>
                     </Card>
                  </div>
               </div>

               <div style={{ margin: "50px 0px" }}>
                  <h1
                     style={{
                        textAlign: "center",
                        fontSize: "22px",
                        color: "#E6C155",
                     }}
                  >
                     ស្ថានភាពមន្រ្ដីរាជការ គិតត្រឹមឆ្នាំ2021
                  </h1>
                  <div style={{ width: "80%", margin: "auto" }}>
                     <Row gutter={10}>
                        <Col span={12}>
                           <div
                              style={{
                                 backgroundColor: "#fff",
                                 padding: "10px 0px",
                                 borderRadius: 10,
                              }}
                           >
                              <div
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "1.1em",
                                    padding: "0px 10px",
                                 }}
                              >
                                 <div>
                                    <TeamOutlined
                                       style={{
                                          fontSize: "2em",
                                          color: "#E6C155",
                                       }}
                                    ></TeamOutlined>
                                    <span style={{ marginTop: -30 }}>
                                       មន្រ្ដីរាជការថ្នាក់ជាតិ
                                    </span>
                                 </div>
                                 <div>
                                    {displayData?.data?.centerInstitution
                                       ? +(
                                            displayData?.data
                                               ?.centerInstitution["ស្រី"] || 0
                                         ) +
                                         +(
                                            displayData?.data
                                               ?.centerInstitution["ប្រុស"] || 0
                                         )
                                       : 0}{" "}
                                    នាក់
                                 </div>
                              </div>
                              <Divider style={{ borderWidth: 2 }}></Divider>
                              <div
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    paddingTop: 20,
                                    paddingBottom: 25,
                                 }}
                              >
                                 <Card
                                    hoverable
                                    style={{
                                       width: 200,
                                       textAlign: "center",
                                       borderRadius: 10,
                                    }}
                                 >
                                    <TeamOutlined
                                       style={{
                                          fontSize: "2em",
                                          color: "#E6C155",
                                       }}
                                    ></TeamOutlined>
                                    <span
                                       style={{
                                          fontSize: "1.1em",
                                          margin: "-20px 5px",
                                       }}
                                    >
                                       ថ្នាក់ជាតិប្រុស
                                    </span>
                                    <Divider
                                       style={{
                                          borderColor: "#E6C155",
                                          borderWidth: "2px",
                                       }}
                                    ></Divider>
                                    <p
                                       style={{
                                          fontWeight: "bold",
                                          fontSize: "1.4em",
                                          paddingTop: 10,
                                       }}
                                    >
                                       {displayData?.data?.centerInstitution
                                          ? displayData?.data
                                               ?.centerInstitution["ប្រុស"]
                                          : 0}{" "}
                                       នាក់
                                    </p>
                                 </Card>
                                 <Card
                                    hoverable
                                    style={{
                                       width: 200,
                                       textAlign: "center",
                                       borderRadius: 10,
                                    }}
                                 >
                                    <TeamOutlined
                                       style={{
                                          fontSize: "2em",
                                          color: "#E6C155",
                                       }}
                                    ></TeamOutlined>
                                    <span
                                       style={{
                                          fontSize: "1.1em",
                                          margin: "-20px 5px",
                                       }}
                                    >
                                       ថ្នាក់ជាតិស្រី
                                    </span>
                                    <Divider
                                       style={{
                                          borderColor: "#E6C155",
                                          borderWidth: "2px",
                                       }}
                                    ></Divider>
                                    <p
                                       style={{
                                          fontWeight: "bold",
                                          fontSize: "1.4em",
                                          paddingTop: 10,
                                       }}
                                    >
                                       {displayData?.data?.centerInstitution
                                          ? displayData?.data
                                               ?.centerInstitution["ស្រី"]
                                          : 0}{" "}
                                       នាក់
                                    </p>
                                 </Card>
                              </div>
                           </div>
                        </Col>
                        <Col span={12}>
                           <div
                              style={{
                                 backgroundColor: "#fff",
                                 padding: "10px 0px",
                                 borderRadius: 10,
                              }}
                           >
                              <div
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "1.1em",
                                    padding: "0px 10px",
                                 }}
                              >
                                 <div>
                                    <TeamOutlined
                                       style={{
                                          fontSize: "2em",
                                          color: "#E6C155",
                                       }}
                                    ></TeamOutlined>
                                    <span style={{ marginTop: -30 }}>
                                       មន្រ្ដីរាជការថ្នាក់ក្រោមជាតិ
                                    </span>
                                 </div>
                                 <div>
                                    {displayData?.data?.provinceInstitution
                                       ? +(
                                            displayData?.data
                                               ?.provinceInstitution["ស្រី"] ||
                                            0
                                         ) +
                                         +(
                                            displayData?.data
                                               ?.provinceInstitution["ប្រុស"] ||
                                            0
                                         )
                                       : 0}{" "}
                                    នាក់
                                 </div>
                              </div>
                              <Divider style={{ borderWidth: 2 }}></Divider>
                              <div
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-around",
                                    paddingTop: 20,
                                    paddingBottom: 25,
                                 }}
                              >
                                 <Card
                                    hoverable
                                    style={{
                                       width: 200,
                                       textAlign: "center",
                                       borderRadius: 10,
                                    }}
                                 >
                                    <TeamOutlined
                                       style={{
                                          fontSize: "2em",
                                          color: "#E6C155",
                                       }}
                                    ></TeamOutlined>
                                    <span
                                       style={{
                                          fontSize: "1.1em",
                                          margin: "-20px 5px",
                                       }}
                                    >
                                       ថ្នាក់ក្រោមជាតិប្រុស
                                    </span>
                                    <Divider
                                       style={{
                                          borderColor: "#E6C155",
                                          borderWidth: "2px",
                                       }}
                                    ></Divider>
                                    <p
                                       style={{
                                          fontWeight: "bold",
                                          fontSize: "1.4em",
                                          paddingTop: 10,
                                       }}
                                    >
                                       {displayData?.data?.provinceInstitution
                                          ? displayData?.data
                                               ?.provinceInstitution["ប្រុស"]
                                          : 0}{" "}
                                       នាក់
                                    </p>
                                 </Card>
                                 <Card
                                    hoverable
                                    style={{
                                       width: 200,
                                       textAlign: "center",
                                       borderRadius: 10,
                                    }}
                                 >
                                    <TeamOutlined
                                       style={{
                                          fontSize: "2em",
                                          color: "#E6C155",
                                       }}
                                    ></TeamOutlined>
                                    <span
                                       style={{
                                          fontSize: "1.1em",
                                          margin: "-20px 5px",
                                       }}
                                    >
                                       ថ្នាក់ក្រោមជាតិស្រី
                                    </span>
                                    <Divider
                                       style={{
                                          borderColor: "#E6C155",
                                          borderWidth: "2px",
                                       }}
                                    ></Divider>
                                    <p
                                       style={{
                                          fontWeight: "bold",
                                          fontSize: "1.4em",
                                          paddingTop: 10,
                                       }}
                                    >
                                       {displayData?.data?.provinceInstitution
                                          ? displayData?.data
                                               ?.provinceInstitution["ស្រី"]
                                          : 0}{" "}
                                       នាក់
                                    </p>
                                 </Card>
                              </div>
                           </div>
                        </Col>
                     </Row>
                  </div>
               </div>
            </>
         )}
      </div>
   );
};

export default Index;
