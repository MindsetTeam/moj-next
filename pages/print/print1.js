const index = () => {
  window.print();
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
          height: 100%;
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
            <img
              src="https://storage.googleapis.com/user_file_upload/img-profile/60f64eed3f7bc2000a945504.jpg"
              style={{ width: "100%" }}
            />
          </div>
        </section>
        <section id="personalInfo" className="text-center">
          <h1 className="font-bold">ជីវប្រវត្តិសង្ខេបមន្ត្រីរាជការ</h1>
          <h1 className="tacteng">3</h1>
        </section>
        <section>
          <h1>ក. ព័ត៌មានផ្ទាល់ខ្លួន</h1>
          <div style={{ marginLeft: 25 }}>
            <p>- គោត្តនាម និងនាម ភេទ : </p>
            <p>- អក្សរឡាតាំង</p>
            <p>- ថ្ថៃ ខែ ឆ្នាំកំណើត</p>
            <p>- ទីកន្លែងកំណើត </p>
            <p>- អាសយដ្ឋានបច្ចុប្បន្ន</p>
            <p>- លេខទូរស័ព្ទ</p>
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
              <p>លេខ</p>
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
              <p>លេខ</p>
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
              <p>លេខ</p>
            </div>
          </div>
        </section>
        <section id="familyInfo">
          <h1>ខ. ព័ត៌មានគ្រួសារ (រៀបការ)</h1>
          <div style={{ marginLeft: 25 }}>
            <h1>ក.ព័ត៌មានប្តី ឬប្រពន្ធ</h1>
            <p>- ប្រពន្ធ ឬ ប្តីឈ្មោះ ស្ថានភាព: កើតថ្ងៃទី ខែ ឆ្នាំ</p>
            <p>- លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</p>
            <p>- ទីកន្លែងកំណើត</p>
            <p>- មុខ​របរ​បច្ចុប្បន្ន</p>
            <p>- អង្គភាព</p>
          </div>
          <div style={{ marginLeft: 25 }}>
            <h1>ខ.ព័ត៌មានកូន</h1>
            <p>មានកូនចំនួន នាក់ ស្រីចំនួន នាក់</p>
            <p>- ឈ្មោះ : ភេទ : ឆ្នាំកំណើត :</p>
          </div>
          <div style={{ marginLeft: 25 }}>
            <h1>គ.ព័ត៌មានឪពុក និងម្តាយបង្កើត</h1>
            <p>- ឪពុកឈ្មោះ ស្ថានភាព កើតថ្ងៃទី ខែ ឆ្នាំ</p>
            <p>- ទីកន្លែងកំណើត </p>
            <p>- មុខ​របរ</p>
            <p>- ម្តាយឈ្មោះ ស្ថានភាព កើតថ្ងៃទី ខែ ឆ្នាំ</p>
            <p>- ទីកន្លែងកំណើត </p>
            <p>- មុខ​របរ</p>
          </div>
        </section>
        <section>
          <h1>
            គ កម្រិតវប្បធម៍ទូទៅ ការបណ្តុះបណ្តាលវជ្ចាជីវៈ និងការបណ្តុះបណ្តាលបន្តៈ
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
              <tr>
                <td>មធ្យមសិក្សា</td>
                <td>វិ.ព្រះស៊ីសុវត្តី</td>
                <td>ភ្នំពេញ</td>
                <td>មធ្យមសិក្សាទុតិយភូមិ</td>
                <td>១៩៩៧</td>
                <td>២០០០</td>
              </tr>
              <tr>
                <th colSpan="6">
                  ២-កម្រិតបណ្តុះបណ្តាលវិជ្ជាជីវៈមួលដ្ឋាន និងក្រោមូលដ្ឋាន
                </th>
              </tr>
              <tr>
                <td>មធ្យមសិក្សា</td>
                <td>វិ.ព្រះស៊ីសុវត្តី</td>
                <td>ភ្នំពេញ</td>
                <td>មធ្យមសិក្សាទុតិយភូមិ</td>
                <td>១៩៩៧</td>
                <td>២០០០</td>
              </tr>
              <tr>
                <th colSpan="6">៣-វគ្គបណ្តុះបណ្តាលផ្សេងៗ</th>
              </tr>
              <tr>
                <th colSpan="2">វគ្គបណ្តុះបណ្តាល</th>
                <th>ទីកន្លែងកំណើត</th>
                <th>សញ្ញាបត្រទទួលបាន</th>
                <th colSpan="2">ថ្ងៃខែឆ្នាំសិក្សា</th>
              </tr>
              <tr>
                <td colSpan="2">វិ.ព្រះស៊ីសុវត្តី</td>
                <td>ភ្នំពេញ</td>
                <td>មធ្យមសិក្សាទុតិយភូមិ</td>
                <td colSpan="2">១៩៩៧</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section>
          <h1>ឃ. ប្រវត្តការងារ</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              justifyItems: "start",
            }}
          >
            <span>- ថ្ថៃខែឆ្នាំចូលបម្រើក្របខ័ណ្ឌរដ្ឋ:</span>
            <span>- ថ្ថៃខែឆ្នាំតាំងស៊ប់ក្នុងក្របខ័ណ្ឌ:</span>
            <span>- ប្រភេទក្របខ័ណ្ឌ ឋានន្តរស័ក្តិនិងថ្នាក់:</span>
            <span>- ថ្ងៃខែឆ្នាំឡើងឋានន្តរស័ក្តិនិងថ្នាក់ចុងក្រោយ:</span>
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
              <tr>
                <td>១១/ធ្នូ/២០១៧</td>
                <td>បច្ចុប្បន្ន</td>
                <td>មុខងារសាធារណៈ</td>
                <td>
                  អគ្គនាយកដ្ឋាន គោលនោបាយ​ | នាយកដ្ឋាន សម្របសម្រួលការ​
                  កែទម្រង់អន្តរវិស័យ
                </td>
                <td>ប្រធាននាយកដ្ឋាន</td>
              </tr>
            </tbody>
          </table>
        </section>
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
                លោកលោកស្រី <bold>សុខ សំណាង</bold> ពិតប្រាកដមែន។
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

export default index;
