import Dot from "@/components/Home/Dot";
import { useSession } from "next-auth/client";
import router from "next/router";
import React from "react";
import FullStructureMOJ from "/data/FullStructureMOJ.json";

const SummaryList = ({ overviewData }) => {
  // generate random color
  const [session, loading] = useSession();
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  //   const [colors, setColors] = useState([
  //     "green",
  //     "blue",
  //     "purple",
  //     "pink",
  //     "brown",
  //     "yellow",
  //     "red",
  //   ]);

  // return session?.user?.role !== "moderator" ? (
  //   <table>
  //     <tr>
  //       <td>
  //         <Dot color="green"></Dot>
  //         អគ្គលេខាធិការដ្ឋាន
  //       </td>
  //       <td>
  //         {overviewData?.data?.generalDepartmentList?.["អគ្គលេខាធិការដ្ឋាន"] ||
  //           0}{" "}
  //         នាក់
  //       </td>
  //     </tr>
  //     <tr>
  //       <td>
  //         <Dot color="blue"></Dot>
  //         អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋបាលតុលាការ
  //       </td>
  //       <td>
  //         {overviewData?.data?.generalDepartmentList?.[
  //           "អគ្គនាយកដ្ឋានកិច្ចការរដ្ឋបាលតុលាការ"
  //         ] || 0}{" "}
  //         នាក់
  //       </td>
  //     </tr>
  //     <tr>
  //       <td>
  //         <Dot color="purple"></Dot>
  //         អគ្គនាយកដ្ធានកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ
  //       </td>
  //       <td>
  //         {overviewData?.data?.generalDepartmentList?.[
  //           "អគ្គនាយកដ្ធានកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ"
  //         ] || 0}{" "}
  //         នាក់
  //       </td>
  //     </tr>
  //     <tr>
  //       <td>
  //         <Dot color="pink"></Dot>
  //         អគ្គនាយកដ្ធានកិច្ចការរដ្ធប្បវេណី
  //       </td>
  //       <td>
  //         {overviewData?.data?.generalDepartmentList?.[
  //           "អគ្គនាយកដ្ធានកិច្ចការរដ្ធប្បវេណី"
  //         ] || 0}{" "}
  //         នាក់
  //       </td>
  //     </tr>
  //     <tr>
  //       <td>
  //         <Dot color="brown"></Dot>
  //         អគ្គនាយកដ្ធានអភិវឌ្ឈន៏វិស័យយុត្តិធម៌
  //       </td>
  //       <td>
  //         {overviewData?.data?.generalDepartmentList?.[
  //           "អគ្គនាយកដ្ធានអភិវឌ្ឈន៏វិស័យយុត្តិធម៌"
  //         ] || 0}{" "}
  //         នាក់
  //       </td>
  //     </tr>
  //     <tr>
  //       <td>
  //         <Dot color="yellow"></Dot>
  //         អគ្គនាយកដ្ធានកិច្ចការតុលាការ
  //       </td>
  //       <td>
  //         {overviewData?.data?.generalDepartmentList?.[
  //           "អគ្គនាយកដ្ធានកិច្ចការតុលាការ"
  //         ] || 0}{" "}
  //         នាក់
  //       </td>
  //     </tr>
  //   </table>
  // ) : (
  //   <table>
  //     {Object.keys(overviewData?.data?.generalDepartmentList || {}).map(
  //       (item, index) => (
  //         <tr key={index}>
  //           <td>
  //             <Dot color={getRandomColor()}></Dot>
  //             {item}
  //           </td>
  //           <td>
  //             {overviewData?.data?.generalDepartmentList?.[item] || 0} នាក់
  //           </td>
  //         </tr>
  //       )
  //     )}
  //   </table>
  // );
  return (
    <table>
      {Object.keys(FullStructureMOJ).map((item, index) => (
        <tr
          key={index}
          onClick={() =>
            router.push({
              pathname: "/employee",
              query: {
                unit: item,
              },
            })
          }
          style={{ cursor: "pointer" }}
        >
          <td>
            <Dot color={getRandomColor()}></Dot>
            {item}
          </td>
          <td>{overviewData?.data?.generalDepartmentList?.[item] || 0} នាក់</td>
        </tr>
      ))}
      {/* {Object.keys(overviewData?.data?.generalDepartmentList || {}).map(
        (item, index) => (
          <tr
            key={index}
            onClick={() =>
              router.push({
                pathname: "/employee",
                query: {
                  unit: item,
                },
              })
            }
            style={{ cursor: "pointer" }}
          >
            <td>
              <Dot color={getRandomColor()}></Dot>
              {item}
            </td>
            <td>
              {overviewData?.data?.generalDepartmentList?.[item] || 0} នាក់
            </td>
          </tr>
        )
      )} */}
    </table>
  );
};

export default SummaryList;
