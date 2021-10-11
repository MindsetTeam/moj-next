import { Card, Divider } from "antd";
import { TeamOutlined } from "@ant-design/icons";

const HomeCard = ({ number, title, color }) => {
   return (
      <>
         <Card
            hoverable
            style={{
               textAlign: "center",
               paddingTop: 5,
            }}
         >
            <TeamOutlined
               style={{ fontSize: "1.4rem", color: color }}
            ></TeamOutlined>
            <span
               style={{
                  color: "#800808",
                  fontSize: "1.1rem",
                  margin: "-20px 5px",
               }}
            >
               {title}
            </span>
            <Divider
               style={{
                  borderColor: color,
                  borderWidth: "2px",
               }}
            ></Divider>
            <p
               style={{
                  color: "#800808",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
               }}
            >
               {number} នាក់
            </p>
         </Card>

         <style global jsx>{`
            .ant-card-body {
               padding: 13px 8px;
            }
         `}</style>
      </>
   );
};

export default HomeCard;
