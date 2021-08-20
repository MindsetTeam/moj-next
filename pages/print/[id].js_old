import { Checkbox, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import privateRoutes from "hoc/withAuth";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const options = [
   { label: "ព័ត៌មានទូទៅ", value: "General" },
   { label: "គ្រួសារ", value: "Family" },
   { label: "ឋានន្តរសកិ្តនិងថ្នាក់", value: "Rank" },
   { label: "ស្ថានភាពមន្រ្ដី", value: "Status" },
   { label: "ប្រវត្តិការងារ", value: "WorkHistory" },
   { label: "ការលើកសសើរ", value: "Praise" },
   { label: "ការដាក់ពិន័យ", value: "Penalty" },
   { label: "កម្រិតវប្បធម៌", value: "Education" },
];

const userPrint = () => {
   const [printOptions, setPrintOptions] = useState(["General"]);
   const router =useRouter()
   const [user, setUser] = useState(null);

   useEffect(async () => {
      const user = await fetch(`/api/users/${router.query.id}`).then((res) =>
         res.json()
      );
      setUser(user);
   }, []);
   const onChange = (checkedValues) => {
      setPrintOptions(checkedValues);
   };

   const onPrint = () => {
      const printWindow = window.frames["printContainer"];
      printWindow.document.write(`
   <body onload="window.print()" >
   ${printOptions
      .map((v) => `<span style="font-size:20px;">${v}</span>`)
      .join(" | ")}
   ${document.getElementById("printContent").innerHTML}</body>
   `);
      printWindow.document.close();
   };
   return (
      <div style={{ backgroundColor: "#fff", padding: "20px 10px" }}>
         <p>បោះពុម្ព</p>
         <Checkbox.Group
            style={{ margin: "20px 0px", display: "flex" }}
            options={options}
            defaultValue={["General"]}
            onChange={onChange}
         />
         <Button icon={<PrinterOutlined />} onClick={onPrint}>
            បោះពុម្ព
         </Button>
         <iframe
            id="printContainer"
            name="printContainer"
            style={{ display: "none" }}
         />
         <div id="printContent" style={{ display: "none" }}>
            <h1 style={{ color: "red" }}>Print Sample</h1>
            {printOptions.map((v) => {
               let returnContentJSX;
               let displayFields;
               if (!user) {
                  return null;
               }
               if (v === "General") {
                  displayFields = [
                     "birthDate",
                     "photo",
                     "nationalityIDNum",
                     "nationality",
                     "lastName",
                     "firstName",
                     "gender",
                     "ethnicity",
                     "civilID",
                  ];
               }
               if (v === "Family") {
                  displayFields = [
                     "children",
                     "fatherInfo",
                     "motherInfo",
                     "partnerInfo",
                  ];
               }
               if (v === "Rank") {
                  displayFields = ["rank"];
               }
               if (v === "Status") {
                  displayFields = ["officerStatus"];
               }
               if (v === "WorkHistory") {
                  displayFields = ["experience"];
               }
               if (v === "Praise") {
                  displayFields = ["praised"];
               }
               if (v === "Penalty") {
                  displayFields = ["penalty"];
               }
               if (v === "Education") {
                  displayFields = ["education"];
               }

               returnContentJSX = displayFields.map((field) => {
                  return (
                     <>
                        <span>
                           <strong>{field}</strong>:
                           {user[field]
                              ? Array.isArray(user[field])
                                 ? user[field].map((v) => (
                                      <li>{JSON.stringify(v)}</li>
                                   ))
                                 : JSON.stringify(user[field])
                              : null}
                        </span>
                        <br />
                     </>
                  );
               });
               return (
                  <>
                     <h2>
                        <i>{v}</i>
                     </h2>
                     {returnContentJSX}
                     <hr />
                  </>
               );
            })}
         </div>
      </div>
   );
};

export default userPrint;
