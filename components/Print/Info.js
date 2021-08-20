import { placeFormat } from "@/utils/formalFormat";
import moment from "moment";
import "moment/locale/km";

const PrintInfo = ({
  data: {
    defaultInfo,
    General,
    Family,
    Rank,
    Status,
    WorkHistory,
    Praise,
    Penalty,
    Education,
  },
}) => {
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
          padding: 10px 50px;
        }
        #section-to-print h1 {
          font-size: 1.2em;
          margin: 0;
          font-weight: bold;
        }
        #section-to-print .tacteng {
          font-family: tacteng;
          font-size: 2.2em;
          margin-top: -20px;
        }

        .text-center {
          text-align: center;
        }
        .printTable {
          width: 100%;
        }
        .printTable th:not([colSpan="6"]),
        .printTable td {
          text-align: center;
        }
        .printTable,
        .printTable th,
        .printTable td {
          border: 1px solid black;
          border-collapse: collapse;
        }

        svg {
          vertical-align: baseline;
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
        <section style={{ textAlign: "center", fontWeight: "bold" }}>
          <h1 style={{ fontWeight: "bold" }}>ព្រះរាជាណាចក្រកម្ពុជា</h1>
          <h1 style={{ fontWeight: "bold" }}>ជាតិ សាសនា ព្រះមាហាក្សត្រ</h1>
          <h1 className="tacteng">3</h1>
        </section>
        <section
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "-105px 0 -20px",
          }}
        >
          <div>
            <h1 className="font-bold">ក្រសួងយុត្តិធម៍</h1>
            <p>អង្គភាព អគ្គនាយកដ្ឋាន គោលនយោបាយ</p>
            <p>ក្រសួងយុត្តិធម៏</p>
          </div>
          <div style={{ width: "17%" }}>
            <img src={defaultInfo.photo} style={{ width: "100%" }} />
          </div>
        </section>
        <section id="personalInfo" className="text-center">
          <h1 className="font-bold">ជីវប្រវត្តិសង្ខេបមន្ត្រីរាជការ</h1>
          <h1 className="tacteng">3</h1>
        </section>
        {General && (
          <section>
            <h1>ក. ព័ត៌មានផ្ទាល់ខ្លួន</h1>
            <div style={{ marginLeft: 25 }}>
              <p>
                - គោត្តនាម និងនាម {General.firstName + General.lastName} ភេទ :{" "}
                {General.gender}{" "}
              </p>
              <p>
                - អក្សរឡាតាំង {General.firstNameLatin + General.lastNameLatin}
              </p>
              <p>- ថ្ថៃ ខែ ឆ្នាំកំណើត {General.birthDate}</p>
              <p>- ទីកន្លែងកំណើត {placeFormat(General.birthPlace)}</p>
              <p>
                - អាសយដ្ឋានបច្ចុប្បន្ន {placeFormat(General.currentResidence)}
              </p>
              <p>
                - លេខទូរស័ព្ទ{" "}
                {[
                  General.contactInfo?.phoneNumber1,
                  General.contactInfo?.phoneNumber2,
                ]
                  .filter((v) => v)
                  .join(" , ")}{" "}
                អ៊ីម៉ែល {General.contactInfo?.email}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "center",
                  borderRadius: "7px",
                  width: "31%",
                }}
              >
                <p>អត្តលេខមន្ត្រីរាជការ</p>
                <p>លេខ: {General.civilID}</p>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "center",
                  borderRadius: "7px",
                  width: "31%",
                }}
              >
                <p>អត្តលេខសញ្ញាណប័ណ្ណមន្ត្រីរាជការ</p>
                <p>លេខ: {General.officerID}</p>
              </div>
              <div
                style={{
                  border: "1px solid black",
                  padding: "10px",
                  textAlign: "center",
                  borderRadius: "7px",
                  width: "31%",
                }}
              >
                <p>លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</p>
                <p>លេខ: {General.nationalityIDNum}</p>
              </div>
            </div>
          </section>
        )}
        {Family && (
          <section id="familyInfo">
            <h1>
              ខ. ព័ត៌មានគ្រួសារ {Family?.partnerInfo.fullName ? "(រៀបការ)" : ""}
            </h1>
            {Family?.partnerInfo.fullName && (
              <>
                <div style={{ marginLeft: 25 }}>
                  <h1>ក.ព័ត៌មានប្តី ឬប្រពន្ធ</h1>
                  <p>
                    - ប្រពន្ធ ឬ ប្តីឈ្មោះ {Family.partnerInfo.fullName}{" "}
                    ស្ថានភាព: {Family.partnerInfo.statusLive} កើតថ្ងៃទី ខែ ឆ្នាំ{" "}
                    {Family.partnerInfo.birthDate}
                  </p>
                  <p>
                    - លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ{" "}
                    {Family.partnerInfo.nationalityIDNum}
                  </p>
                  <p>
                    - ទីកន្លែងកំណើត {placeFormat(Family.partnerInfo.birthPlace)}
                  </p>
                  <p>- មុខ​របរ​បច្ចុប្បន្ន {Family.partnerInfo.occupation}</p>
                  <p>- អង្គភាព {Family.partnerInfo.workPlace}</p>
                  <p>
                    - អាសយដ្ឋានបច្ចុប្បន្ន{" "}
                    {placeFormat(Family.partnerInfo.currentResidence)}
                  </p>
                </div>
                {Family.children.length > 0 && (
                  <div style={{ marginLeft: 25 }}>
                    <h1>ខ.ព័ត៌មានកូន</h1>
                    <p>
                      មានកូនចំនួន {Family.children.length} នាក់ ស្រីចំនួន:{" "}
                      {Family.children.reduce((init, v) => {
                        if (v.gender === "ស្រី") {
                          init++;
                        }
                        return init;
                      }, 0)}{" "}
                      នាក់
                    </p>
                    {Family.children.map((v) => {
                      return (
                        <p>
                          - ឈ្មោះ : {v.fullName} ភេទ : {v.gender} ឆ្នាំកំណើត :{" "}
                          {v.birthDate} មុខរបរ : {v.occupation}
                        </p>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            <div style={{ marginLeft: 25 }}>
              <h1>គ.ព័ត៌មានឪពុក និងម្តាយបង្កើត</h1>
              <p>
                - ឪពុកឈ្មោះ {Family?.fatherInfo.fullName} ស្ថានភាព{" "}
                {Family?.fatherInfo.livingStatus} កើតថ្ងៃទី ខែ ឆ្នាំ{" "}
                {Family?.fatherInfo.birthDate}
              </p>
              <p>
                - ទីកន្លែងកំណើត {placeFormat(Family?.fatherInfo.birthPlace)}
              </p>
              <p>- មុខ​របរ {Family?.fatherInfo.occupation}</p>
              <p>
                - ម្តាយឈ្មោះ {Family?.motherInfo.fullName} ស្ថានភាព{" "}
                {Family?.motherInfo.livingStatus} កើតថ្ងៃទី ខែ ឆ្នាំ{" "}
                {Family?.motherInfo.birthDate}
              </p>
              <p>
                - ទីកន្លែងកំណើត {placeFormat(Family?.motherInfo.birthPlace)}
              </p>
              <p>- មុខ​របរ {Family?.motherInfo.occupation}</p>
            </div>
          </section>
        )}
        {Education && (
          <section>
            <h1>
              គ កម្រិតវប្បធម៍ទូទៅ ការបណ្តុះបណ្តាលវជ្ចាជីវៈ
              និងការបណ្តុះបណ្តាលបន្តៈ
            </h1>
            <table className="printTable">
              <thead>
                <tr>
                  <th>វគ្គឬ​កម្រិតការសិក្សា</th>
                  <th>គ្រឺះស្ថានសិក្សាបណ្តុះបណ្តាល</th>
                  <th>ទីកន្លែងសិក្សា</th>
                  <th>សញ្ញាបត្រទទួលបាន</th>
                  <th>ឆ្នាំចូល</th>
                  <th>ឆ្នាំបញ្ចប់</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th colSpan="6">១-កម្រិតវប្បធម៌ទូទៅ</th>
                </tr>
                {Education?.education
                  .filter((v) => v.course === "កម្រិតវប្បធម៌ទូទៅ")
                  .map((v) => {
                    return (
                      <tr>
                        <td>{v.level}</td>
                        <td>{v.institution}</td>
                        <td>{v.place}</td>
                        <td>{v.degreeType}</td>
                        <td>{v.startYear}</td>
                        <td>{v.endYear}</td>
                      </tr>
                    );
                  })}
                <tr>
                  <th colSpan="6">
                    ២-កម្រិតបណ្តុះបណ្តាលវិជ្ជាជីវៈមួលដ្ឋាន និងក្រោមូលដ្ឋាន
                  </th>
                </tr>
                {Education?.education
                  .filter(
                    (v) =>
                      v.course ===
                      "កំរិតបណ្ដុះបណ្ដាលមុខវិជ្ជាជីវៈមូលដ្ឋាននិងក្រោយមូលដ្ឋាន"
                  )
                  .map((v) => {
                    return (
                      <tr>
                        <td>{v.level}</td>
                        <td>{v.institution}</td>
                        <td>{v.place}</td>
                        <td>{v.degreeType}</td>
                        <td>{v.startYear}</td>
                        <td>{v.endYear}</td>
                      </tr>
                    );
                  })}
                <tr>
                  <th colSpan="6">៣-វគ្គបណ្តុះបណ្តាលផ្សេងៗ</th>
                </tr>
                <tr>
                  <th colSpan="2">វគ្គបណ្តុះបណ្តាល</th>
                  <th>ទីកន្លែងកំណើត</th>
                  <th>សញ្ញាបត្រទទួលបាន</th>
                  <th colSpan="2">ថ្ងៃខែឆ្នាំសិក្សា</th>
                </tr>
                {Education?.education
                  .filter((v) => v.course === "វគ្គបណ្ដុះបណ្ដាលផ្សេងៗ")
                  .map((v) => {
                    return (
                      <tr>
                        <td colSpan="2">{v.other}</td>
                        <td>{v.institution}</td>
                        <td>{v.degreeType}</td>
                        <td colSpan="2">{v.startYear}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
        )}
        {WorkHistory && (
          <section>
            <h1>ឃ. ប្រវត្តការងារ</h1>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                justifyItems: "start",
              }}
            >
              <span>
                - ថ្ថៃខែឆ្នាំចូលបម្រើក្របខ័ណ្ឌរដ្ឋ:{" "}
                {WorkHistory?.employmentDate
                  ? moment(WorkHistory.employmentDate).format("DD MMMM YYYY")
                  : ""}
              </span>
              <span>
                - ថ្ថៃខែឆ្នាំតាំងស៊ប់ក្នុងក្របខ័ណ្ឌ:{" "}
                {WorkHistory?.fullyEmploymentDate
                  ? moment(WorkHistory.fullyEmploymentDate).format(
                      "DD MMMM YYYY"
                    )
                  : ""}
              </span>
              {/* <span>- ប្រភេទក្របខ័ណ្ឌ ឋានន្តរស័ក្តិនិងថ្នាក់:</span> */}
              {/* <span>- ថ្ងៃខែឆ្នាំឡើងឋានន្តរស័ក្តិនិងថ្នាក់ចុងក្រោយ:</span> */}
            </div>
            <table className="printTable">
              <thead>
                <tr>
                  <th>ថ្ងៃខែឆ្នាំ ចូលបំរើការងារ</th>
                  <th>ថ្ដៃខែឆ្នាំ បញ្ចប់ការងារ</th>
                  <th>ក្រសួង-ស្ថាប័ន</th>
                  <th>នាយកដ្ឋាន-អង្គភាព</th>
                  <th>មុខតំណែង</th>
                </tr>
              </thead>
              <tbody>
                {(WorkHistory?.experience || []).map((v) => {
                  return (
                    <tr>
                      <td>{moment(v.startDate).format("DD/MMMM/YYYY")}</td>
                      <td>
                        {v.endDate
                          ? moment(v.endDate).format("DD/MMMM/YYYY")
                          : "បច្ចុប្បន្ន"}
                      </td>
                      <td>មុខងារសាធារណៈ</td>
                      <td>
                        {[v.department, v.unit]
                          .filter((v) => v)
                          .reduce((acc, v) => {
                            return acc == null ? [v] : [...acc, <br />, v];
                          }, null)}
                      </td>
                      <td>{v.position}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}
        <section className="text-center">
          <p>
            ខ្ងុំសូមធានាទទួលខុសត្រូវចំពោះមុខច្បាប់ថា
            ព័ត៌មានបំពេញក្នុងជីវប្រវត្តិមន្ត្រីរាជការនេះ
            ពិតជាត្រឹមត្រូវប្រាកដមែន។
          </p>
          <div style={{ display: "flex" }}>
            <div style={{ width: "50%" }}>
              <h1>បានឃើញ និងបញ្ចាក់ថា</h1>
              <p>ហត្ថលេខាខាងស្តាំ ពិតជាហត្ថលេខារបស់</p>
              <p>
                លោកលោកស្រី <strong>{defaultInfo.fullName}</strong> ពិតប្រាកដមែន។
              </p>
              <p>
                ថ្ងៃ................ខែ.............ឆ្នាំ...........ទោស័ក
                ព.ស.២៥៦....
              </p>
              <p>
                ............, ថ្ងៃទី...........ខែ..............ឆ្នាំ២០..........
              </p>
              <h1>ប្រធានអង្គភាព</h1>
            </div>
            <div style={{ width: "50%" }}>
              <p>
                ថ្ងៃ................ខែ.............ឆ្នាំ...........ទោស័ក
                ព.ស.២៥៦....
              </p>
              <p>
                ............, ថ្ងៃទី...........ខែ..............ឆ្នាំ២០..........
              </p>
              <p>ហត្ថលេខា (សាមីខ្លួន)</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrintInfo;
