const PrintReport = () => {
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

            .tacteng {
               font-family: tacteng;
               font-size: 2.2em;
               margin-top: -20px;
            }

            .top-section {
               display: flex;
               justify-content: space-between;
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
                  <h1 style={{ fontWeight: "bold" }}>
                     ជាតិ សាសនា ព្រះមាហាក្សត្រ
                  </h1>
                  <h1 className="tacteng">3</h1>
               </div>
            </section>
            <section className="body-section">
               <div style={{ textAlign: "center" }}>
                  <p>របាយការណ៏</p>
                  <p>Department Name</p>
               </div>
               <table border="1">
                  <tr>
                     <th>លរ</th>
                     <th>ឈ្មោះ</th>
                     <th>ភេទ</th>
                     <th>ថ្ងៃខែឆ្នាំកំណើត</th>
                     <th>មុខតំណែង</th>
                     <th>អង្គភាព</th>
                     <th>ស្ថានភាព</th>
                  </tr>
                  <tr>
                     <td>1</td>
                     <td>ឈ្មោះពេញ</td>
                     <td>ប្រុស</td>
                     <td>17/87/78</td>
                     <td>អនុប្រធាន</td>
                     <td>អគ្គ</td>
                     <td>ក្របខណ្ឌ</td>
                  </tr>
               </table>
               <div style={{ float: "right" }}>
                  <p>ថ្ងៃខែឆ្នាំ</p>
               </div>
            </section>
         </div>
      </>
   );
};

export default PrintReport;
