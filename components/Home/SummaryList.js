import Dot from "@/components/Home/Dot";
import React, { useState } from "react";

const SummaryList = ({ overviewData }) => {
   const [colors, setColors] = useState([
      "green",
      "blue",
      "purple",
      "pink",
      "brown",
      "yellow",
      "red",
   ]);

   return (
      <table>
         {/* {list.map((v, i) => {
            return (
               <tr>
                  <td>
                     <Dot color={colors[i]}></Dot>
                     អគ្គលេខាធិការដ្ឋាន
                  </td>
                  <td>
                     {overviewData?.data?.generalDepartmentList?.[
                        "អគ្គលេខាធិការដ្ឋាន"
                     ] || 0}{" "}
                     នាក់
                  </td>
               </tr>
            );
         })} */}
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
               អគ្គនាយកដ្ធានកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ
            </td>
            <td>
               {overviewData?.data?.generalDepartmentList?.[
                  "អគ្គនាយកដ្ធានកិច្ចការអយ្យការនិងព្រហ្មទណ្ឌ"
               ] || 0}{" "}
               នាក់
            </td>
         </tr>
         <tr>
            <td>
               <Dot color="pink"></Dot>
               អគ្គនាយកដ្ធានកិច្ចការរដ្ធប្បវេណី
            </td>
            <td>
               {overviewData?.data?.generalDepartmentList?.[
                  "អគ្គនាយកដ្ធានកិច្ចការរដ្ធប្បវេណី"
               ] || 0}{" "}
               នាក់
            </td>
         </tr>
         <tr>
            <td>
               <Dot color="brown"></Dot>
               អគ្គនាយកដ្ធានអភិវឌ្ឈន៏វិស័យយុត្តិធម៌
            </td>
            <td>
               {overviewData?.data?.generalDepartmentList?.[
                  "អគ្គនាយកដ្ធានអភិវឌ្ឈន៏វិស័យយុត្តិធម៌"
               ] || 0}{" "}
               នាក់
            </td>
         </tr>
         <tr>
            <td>
               <Dot color="yellow"></Dot>
               អគ្គនាយកដ្ធានកិច្ចការតុលាការ
            </td>
            <td>
               {overviewData?.data?.generalDepartmentList?.[
                  "អគ្គនាយកដ្ធានកិច្ចការតុលាការ"
               ] || 0}{" "}
               នាក់
            </td>
         </tr>
      </table>
   );
};

export default SummaryList;
