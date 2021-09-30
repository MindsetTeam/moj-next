import styles from "@/styles/Print.module.css";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import { Checkbox, Button, Divider } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import PrintInfo from "@/components/Print/Info";

const options = [
   { label: "ព័ត៌មានទូទៅ", value: "General" },
   { label: "គ្រួសារ", value: "Family" },
   // { label: "ស្ថានភាពមន្រ្ដី", value: "Status" },
   // { label: "ការលើកសសើរ", value: "Praise" },
   { label: "កម្រិតវប្បធម៌", value: "Education" },
   { label: "ប្រវត្តិការងារ", value: "WorkHistory" },
   { label: "PDF", value: "Pdf" },
];

const index = () => {
   const [printData, setPrintData] = useState({});
   const [session, loading] = useSession();
   const [user, setUser] = useState(null);
   const [indeterminate, setIndeterminate] = useState(false);
   const [checkAll, setCheckAll] = useState(false);
   const [checkedList, setCheckedList] = useState([]);

   useEffect(async () => {
      const user = await fetch(`/api/users/${session?.user.id}`).then((res) =>
         res.json()
      );
      setPrintData({
         defaultInfo: {
            photo: user?.photo,
            fullName: user?.firstName + " " + user?.lastName,
         },
      });
      setUser(user);
   }, [session]);

   const setPrintDataFn = (checkListData) => {
      if (user) {
         const printDataBySelection = {};
         checkListData.forEach((v) => {
            let displayFields = [];
            if (v === "General") {
               displayFields = [
                  "birthDate",
                  "birthPlace",
                  "currentResidence",
                  "nationalityIDNum",
                  "nationality",
                  "lastName",
                  "firstName",
                  "firstNameLatin",
                  "lastNameLatin",
                  "gender",
                  "ethnicity",
                  "officerID",
                  "civilID",
                  "contactInfo",
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
               displayFields = [
                  "experience",
                  "employmentDate",
                  "fullyEmploymentDate",
               ];
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

            printDataBySelection[v] = {
               ...displayFields.reduce((init, field) => {
                  init[field] = user[field] || "";
                  return init;
               }, {}),
            };
         });
         setPrintData({
            defaultInfo: {
               photo: user.photo,
               fullName: user?.firstName + " " + user?.lastName,
            },
            ...printDataBySelection,
         });
      }
   };

   const onChange = (checkedValues) => {
      setCheckedList(checkedValues);
      setIndeterminate(
         !!checkedValues.length && checkedValues.length < options.length
      );
      setCheckAll(checkedValues.length === options.length);
   };
   const onPrint = (params) => {
      window.print();
   };

   useEffect(() => {
      setPrintDataFn(checkedList);
   }, [checkedList]);

   return (
      <>
         <div className={styles.printContainer}>
            <p>បោះពុម្ព</p>
            <Checkbox
               style={{ marginTop: "20px" }}
               indeterminate={indeterminate}
               onChange={(e) => {
                  setCheckedList(
                     e.target.checked ? options.map((v) => v.value) : []
                  );
                  setIndeterminate(false);
                  setCheckAll(e.target.checked);
               }}
               checked={checkAll}
            >
               ទាំងអស់
            </Checkbox>
            <Divider />
            <Checkbox.Group
               style={{ marginBottom: "20px", display: "flex" }}
               options={options}
               value={checkedList}
               onChange={onChange}
            />
            <Button icon={<PrinterOutlined />} onClick={onPrint}>
               បោះពុម្ព
            </Button>
         </div>
         {user && <PrintInfo data={printData} />}
      </>
   );
};

export default index;
