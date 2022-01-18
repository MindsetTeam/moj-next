import moment from "moment";
import "moment/locale/km";

const PrintReport = ({
  checkedList,
  printEmployees,
  generalDepartment,
  unit,
  department,
}) => {
  //
  // if(generalDepartment)
  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: tacteng;
          src: url("/fonts/tacteng.ttf");
        }

        #section-to-print {
          font-size: 18px;
          background-color: white;
          width: 100%;
          min-height: 75vh;
          padding: 10px 50px;
        }

        .tacteng {
          font-family: tacteng;
          font-size: 2.2em;
          margin-top: -20px;
        }

        .top-section {
          display: flex;
          justify-content: space-between;
          font-family: "Moul";
        }

        .logo {
          width: 170px;
        }

        table {
          width: 100%;
          text-align: center;
        }

        table th,
        table td {
          padding: 4px 0px;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          body *:not(#section-to-print *) {
            height: 0px;
          }
          #section-to-print,
          #section-to-print * {
            visibility: visible;
          }
          #section-to-print {
            padding: 0px 45px;
            margin: 0;
            height: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
          }
        }
      `}</style>

      <div id="section-to-print">
        <section className="top-section">
          <div>
            <img src="/card/logo.png" className="logo"></img>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              ក្រសួងយុត្តិធម៌
            </p>
          </div>
          <div style={{ textAlign: "center", fontWeight: "bold" }}>
            <h1 style={{ fontWeight: "bold" }}>ព្រះរាជាណាចក្រកម្ពុជា</h1>
            <h1 style={{ fontWeight: "bold" }}>ជាតិ សាសនា ព្រះមហាក្សត្រ</h1>
            <h1 className="tacteng">3</h1>
          </div>
        </section>
        <section className="body-section">
          <div style={{ textAlign: "center", marginBottom: 20, marginTop: 20 }}>
            <p style={{ fontWeight: "bold", fontFamily: "Moul" }}>
              របាយការណ៏បញ្ជីរាយនាម
            </p>
            <p style={{ fontWeight: "bold", fontFamily: "Moul" }}>
              {department +
              (department ? " នៃ" : "") +
              (generalDepartment && generalDepartment !== "")
                ? generalDepartment
                : unit}
            </p>
          </div>
          <table border="1">
            <tr>
              {checkedList.indexOf("no") >= 0 && <th>ល.រ</th>}
              {checkedList.indexOf("officerID") >= 0 && (
                <th>អត្តលេខមន្រ្តីរាជការ</th>
              )}
              {checkedList.indexOf("name") >= 0 && <th>ឈ្មោះ</th>}
              {checkedList.indexOf("sex") >= 0 && <th>ភេទ</th>}
              {checkedList.indexOf("birthDate") >= 0 && (
                <th>ថ្ងៃខែឆ្នាំកំណើត</th>
              )}
              {checkedList.indexOf("officerStatusStartDate") >= 0 && (
                <th>កាលបរិច្ឆេទតែងតាំង</th>
              )}
              {checkedList.indexOf("position") >= 0 && <th>មុខតំណែង</th>}
              {checkedList.indexOf("salary") >= 0 && <th>កម្មប្រាក់</th>}
              {checkedList.indexOf("status") >= 0 && <th>ស្ថានភាព</th>}
              {checkedList.indexOf("disability") >= 0 && <th>ពិការភាព</th>}
              {/* <th>ឈ្មោះ</th>
              <th>ភេទ</th>
              <th>ថ្ងៃខែឆ្នាំកំណើត</th>
              <th>មុខតំណែង</th>
              <th>ស្ថានភាព</th> */}
              {/* <th>អង្គភាព</th> */}
            </tr>
            {Array.isArray(printEmployees)
              ? printEmployees.map((v, i) => (
                  <tr>
                    {checkedList.indexOf("no") >= 0 && <td>{i + 1}</td>}
                    {checkedList.indexOf("officerID") >= 0 && (
                      <td>{v.officerID}</td>
                    )}
                    {checkedList.indexOf("name") >= 0 && (
                      <td>{(v.firstName || "") + " " + (v.lastName || "")}</td>
                    )}
                    {checkedList.indexOf("sex") >= 0 && <td>{v.gender}</td>}
                    {checkedList.indexOf("birthDate") >= 0 && (
                      <td>
                        {v.birthDate
                          ? moment(v.birthDate).format("DD/MMMM/YYYY")
                          : ""}
                      </td>
                    )}
                    {checkedList.indexOf("officerStatusStartDate") >= 0 && (
                      <td>
                        {v.latestOfficerStatus?.startDate
                          ? moment(v.latestOfficerStatus?.startDate).format(
                              "DD/MMMM/YYYY"
                            )
                          : ""}
                      </td>
                    )}
                    {checkedList.indexOf("position") >= 0 && (
                      <td>{v.latestOfficerStatus?.position}</td>
                    )}
                    {checkedList.indexOf("salary") >= 0 && (
                      <td>
                        {v.rank.length > 0
                          ? v.rank[0].framework +
                            " " +
                            v.rank[0].rankType +
                            " " +
                            v.rank[0].level
                          : ""}
                      </td>
                    )}
                    {checkedList.indexOf("status") >= 0 && (
                      <td>{v.latestOfficerStatus?.status}</td>
                    )}
                    {checkedList.indexOf("disability") >= 0 && (
                      <td>{v.disabilityNum}</td>
                    )}
                  </tr>
                ))
              : Object.keys(printEmployees).map((unit) => (
                  <>
                    <tr style={{ textAlign: "left" }}>
                      <th
                        colSpan={checkedList.length}
                        style={{ paddingLeft: "20px" }}
                      >
                        {unit != "undefined" ? unit : "គ្មានអង្គភាព"}
                      </th>
                    </tr>
                    {printEmployees[unit].map((v, i) => (
                      <tr>
                        {checkedList.indexOf("no") >= 0 && <td>{i + 1}</td>}
                        {checkedList.indexOf("officerID") >= 0 && (
                          <td>{v.officerID}</td>
                        )}
                        {checkedList.indexOf("name") >= 0 && (
                          <td>
                            {(v.firstName || "") + " " + (v.lastName || "")}
                          </td>
                        )}
                        {checkedList.indexOf("sex") >= 0 && <td>{v.gender}</td>}
                        {checkedList.indexOf("birthDate") >= 0 && (
                          <td>
                            {v.birthDate
                              ? moment(v.birthDate).format("DD/MMMM/YYYY")
                              : ""}
                          </td>
                        )}
                        {checkedList.indexOf("officerStatusStartDate") >= 0 && (
                          <td>
                            {v.latestOfficerStatus?.startDate
                              ? moment(v.latestOfficerStatus?.startDate).format(
                                  "DD/MM/YYYY"
                                )
                              : ""}
                          </td>
                        )}
                        {checkedList.indexOf("position") >= 0 && (
                          <td>{v.latestOfficerStatus?.position}</td>
                        )}
                        {checkedList.indexOf("salary") >= 0 && (
                          <td>
                            {v.rank.length > 0
                              ? v.rank[0].framework +
                                " " +
                                v.rank[0].rankType +
                                " " +
                                v.rank[0].level
                              : ""}
                          </td>
                        )}
                        {checkedList.indexOf("status") >= 0 && (
                          <td>{v.latestOfficerStatus?.status}</td>
                        )}
                        {checkedList.indexOf("disability") >= 0 && (
                          <td>{v.disabilityNum}</td>
                        )}
                      </tr>
                    ))}
                  </>
                ))}
          </table>
          <div style={{ float: "right", marginTop: "10px" }}>
            <p>{moment().format("ថ្ងៃDD ខែMMMM ឆ្នាំYYYY")}</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrintReport;
