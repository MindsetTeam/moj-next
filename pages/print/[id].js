import { useEffect, useState } from "react";
import { Checkbox, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import PrintInfo from "@/components/Print/Info";

const options = [
  { label: "ព័ត៌មានទូទៅ", value: "General" },
  { label: "គ្រួសារ", value: "Family" },
  // { label: "ឋានន្តរសកិ្តនិងថ្នាក់", value: "Rank" },
  // { label: "ស្ថានភាពមន្រ្ដី", value: "Status" },
  // { label: "ការលើកសសើរ", value: "Praise" },
  // { label: "ការដាក់ពិន័យ", value: "Penalty" },
  { label: "កម្រិតវប្បធម៌", value: "Education" },
  { label: "ប្រវត្តិការងារ", value: "WorkHistory" },
];

const index = () => {
  const [printData, setPrintData] = useState({});
  const router =useRouter()
  const [user, setUser] = useState(null);

  useEffect(async () => {
     const user = await fetch(`/api/users/${router.query.id}`).then((res) =>
         res.json()
      );
    setPrintData({
      defaultInfo: {
        photo: user?.photo,
        fullName: user?.firstName + " " + user?.lastName,
      },
    });
    setUser(user);
  }, [router]);
  const onChange = (checkedValues) => {
    console.log(checkedValues);
    if (user) {
      const printDataBySelection = {};
      checkedValues.forEach((v) => {
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
    // setPrintOptions(checkedValues);
  };
  const onPrint = (params) => {
    window.print();
  };
  return (
    <>
      <div style={{ backgroundColor: "#fff", padding: "20px 10px" }}>
        <p>បោះពុម្ព</p>
        <Checkbox.Group
          style={{ margin: "20px 0px", display: "flex" }}
          options={options}
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

index.allowed_roles = ["admin", "editor"];

export default index;
