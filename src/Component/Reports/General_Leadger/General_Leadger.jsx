import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot } from "mdbreact";
import { Button, Row, Col, Form } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import Header from "../../MainComponent/Header/Header";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Footer from "../../MainComponent/Footer/Footer";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
// import "../Complaint_Report/Complaint_Report.css";
import PDF from "../../../image/pdf.png";
import XLS from "../../../image/xls.png";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import ReactHtmlExcel from "react-html-table-to-excel";
import * as XLSX from "xlsx";
// import "../../Table.css";

const General_Leadger = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(
    dayjs("2024-01-01")
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(
    dayjs().startOf("day")
  );
  const [isCalendarOpen2, setIsCalendarOpen2] = useState(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const { id } = useParams();
  const [alertData, setAlertData] = useState(null);
  const [rowNumber, setRowNumber] = useState(0);
  const { primaryColor, secondaryColor } = useTheme(); // Make sure to import useTheme from your theme context
  const { apiLinks } = useTheme(); // Make sure to import useTheme from your theme context
  const [detailItem, setDetailItem] = useState([]);
  const [selectedTechId, setSelectedTechId] = useState("ALI COOLING CENTER");
  const [data, setData] = useState([]);
  const [Length, setLength] = useState("");

  //////////////////////////////// TECHNICIAN CODE //////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetAccount.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);

        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchMenuItems = async () => {
    const startDate = selectedStartDate.format("DD-MM-YYYY");
    const endDate = selectedEndDate.format("DD-MM-YYYY");
    const accountt = selectedTechId;

    try {
      const formData = new FormData();
      formData.append("fromDate", startDate);
      formData.append("toDate", endDate);
      formData.append("account", accountt);

      const response = await axios.post(
        `${apiLinks}/GeneralLedger.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data, "Data received successfully");
      setDetailItem(response.data);
      setLength(response.data.length);

      if (response.data.error === 200) {
        console.log(response.data, "Data received successfully");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };




  useEffect(() => {
    fetchMenuItems();
  }, [selectedStartDate, selectedEndDate]);
  // useEffect(() => {
  //   fetchMenuItems();
  // });
  //////////////////////// PDF ////////////////////////////////
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the header text
    const companyName = "CRYSTAL SOLUTION";
    const reportTitle = "GENERAL LEDGER";

    // Set font size and color for the company name
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255); // Blue color
    doc.text(companyName, 80, 10);

    // Calculate the center position for the report title
    const textWidth =
      doc.getStringUnitWidth(reportTitle) * doc.internal.getFontSize();
    const centerPosition = (doc.internal.pageSize.width - textWidth) / 2;

    // Set font size and color for the report title
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(reportTitle, 90, 25);

    // Get the table data
    const tableData = detailItem.map((item) => [
      item.torddat,
      item.ttrndsc,
      item.netamt,
      item.colamt,
      item.balance,
    
    ]);

    // Set up the table headers
    const tableHeaders = [
      "Order Date",
      "Description",
      "Net Amt",
      "Collector Amt",
      "Balance",
      
    ];

    // Set configuration options for the table
    const tableConfig = {
      head: [tableHeaders],
      body: tableData,
      startY: 40, // Adjust the starting position as needed
      theme: "plain", // or 'striped' or 'grid'
      styles: {
        fontSize: 9,
        lineWidth: 0.1, // Set the line width for the table border
        lineColor: [0, 0, 0], // Black color for the table border
      },
      headStyles: {
        fillColor: [0, 0, 255],
        textColor: [255, 255, 255],
        halign: "center",
      },
      columnStyles: {
        0: {
          // ID column
          cellWidth: "auto",
          align: "right",
        },
        1: {
          // Customer Name column
          cellWidth: "auto",
          align: "left",
        },
        2: {
          // Email column
          cellWidth: "auto",
          align: "left",
        },
        3: {
          // Mobile column
          cellWidth: "auto",
          align: "right",
        },
        4: {
          // Ref_id column
          cellWidth: "auto",
          align: "right",
        },
        5: {
          // Prod_id column
          cellWidth: "auto",
          align: "right",
        },
        6: {
          // Date column
          cellWidth: "auto",
          align: "center",
        },
        7: {
          // Warranty column
          cellWidth: "auto",
          align: "center",
        },
        8: {
          // Status column
          cellWidth: "auto",
          align: "center",
        },
      },
    };

    // Add the table to the PDF
    doc.autoTable(tableConfig);

    // Save the PDF
    doc.save("complaint_report.pdf");
  };

  //////////////////////// Excell ////////////////////////////////

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(detailItem);

    XLSX.utils.book_append_sheet(wb, ws, "ComplaintReport");
    XLSX.writeFile(wb, "complaint_report.xlsx");
  };
  /////////////////////// PRESS ENTER AND THEN MOVE TO NEXT WIDGET//////////////////////////////
  // Create refs for each input field
  const ENTER1 = useRef(null);
  const ENTER2 = useRef(null);
  const ENTER3 = useRef(null);
  const ENTER4 = useRef(null);
  const ENTER5 = useRef(null);
  const ENTER6 = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref && ref.current) {
      // Check if the ref has a 'input' property (for DatePicker)
      const nextInput = ref.current.input || ref.current;

      if (nextInput && nextInput.focus) {
        console.log("Focusing on the next input:", nextInput);
        nextInput.focus();
      } else {
        console.error(
          "Error: Could not focus on the next input. Invalid input element."
        );
      }
    } else {
      console.error("Error: Invalid ref or ref.current is undefined.");
    }
  };

  //////////////////// HERE WE TELL THAT YOU NEED TO DEFAULT ON START D
  useEffect(() => {
    if (ENTER1.current) {
      // Assuming the DatePicker exposes the input element via ref
      const inputElement = ENTER1.current.input;

      if (inputElement && inputElement.focus) {
        inputElement.focus();
      }
    }
  }, []);

  // Function to handle Enter key press
  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key press
      focusNextInput(ref);
    }
  };



  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const rowHeight = 34; // Set this value based on your actual row height

// Calculate the number of rows based on 70% of the viewport height
const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

// Generate the rows dynamically
const customScrollbarStyle = `
::-webkit-scrollbar {
  width: 0px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 6px;
}
`;
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {alertData && (
          <Alert
            severity={alertData.type}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "30%",
              marginLeft: "35%",
              zIndex: 1000,
              textAlign: "center",
            }}
          >
            {alertData.message}
          </Alert>
        )}
        <Header id={id} />
        <PathHead
          pageName="Report > General Ledger"
          screen="Item"
          pageLink="/MainPage"
        />
<div  style={{  marginLeft:'10%',marginTop: "1%",padding:'10px',backgroundColor: "white",border:'1px solid black', maxWidth: "80%" }}>
          <Row>
            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <div className="d-flex align-items-left">
                <div>Start Date:</div>
                <div className="position-relative">
                  <DatePicker
                    selected={selectedStartDate.toDate()}
                    onChange={(date) => setSelectedStartDate(dayjs(date))}
                    dateFormat="dd-MM-yyyy"
                    className="custom-datepicker form-control"
                    onKeyDown={(e) => {
                      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                        // Allow arrow keys
                        // You can add specific handling for arrow keys here if needed
                        return;
                      }
                    
                      if (
                        e.target.value.length >= 10 &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    
                      if (
                        !/[0-9-]/.test(e.key) &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    
                      handleEnterKeyPress(ENTER2, e);
                    }}
                    onFocus={() => setIsCalendarOpen(false)}
                    onBlur={() => setIsCalendarOpen(false)}
                    open={isCalendarOpen}
                    ref={ENTER1}
                    maxLength={10}
                  />

                  <span
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // Toggle the calendar visibility when the icon is clicked
                      setIsCalendarOpen(!isCalendarOpen);
                    }}
                  >
                    {/* 📅 */}
                    🗓️
                  </span>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <div className="d-flex align-items-left">
                <div>End Date:</div>
                <div className="position-relative">
                  <DatePicker
                    selected={selectedEndDate.toDate()}
                    onChange={(date) => setSelectedEndDate(dayjs(date))}
                    dateFormat="dd-MM-yyyy"
                    className="custom-datepicker form-control"
                    onKeyDown={(e) => {
                      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                        // Allow arrow keys
                        // You can add specific handling for arrow keys here if needed
                        return;
                      }
                    
                      if (
                        e.target.value.length >= 10 &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    
                      if (
                        !/[0-9-]/.test(e.key) &&
                        e.key !== "Backspace"
                      ) {
                        e.preventDefault();
                      }
                    
                      handleEnterKeyPress(ENTER3, e);
                    }}
                    
                    ref={ENTER2}
                    onFocus={() => setIsCalendarOpen2(false)}
                    onBlur={() => setIsCalendarOpen2(false)}
                    open={isCalendarOpen2}
                    maxLength={10}
                  />
                  <span
                    className="position-absolute top-50 end-0 translate-middle-y"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      // Toggle the calendar visibility when the icon is clicked
                      setIsCalendarOpen2(!isCalendarOpen2);
                    }}
                  >
                    {/* 📅 */}
                    🗓️
                  </span>
                </div>
              </div>
            </Col>

            <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Group
                controlId="status"
                className="d-flex align-items-center"
              >
                <Form.Control
                  as="select"
                  name="typee"
                  onChange={(e) => {
                    setSelectedTechId(e.target.value);
                    fetchMenuItems();
                  }}
                  onKeyDown={(e) => handleEnterKeyPress(ENTER4, e)}
                  ref={ENTER3}
                  onClick={() => {
                    // Add additional logic here if needed
                    fetchMenuItems();
                  }}
                  id="typee"
                  className="custom-select form-control"
                >
                    <option >Select the Crediter</option>
                  {data.map((item) => (
                    <option key={item.acccode} value={item.acccode}>
                      {item.accdsc}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>

            {/* <Col xs={12} sm={6} md={4} lg={3} xl={3}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                className="form-control"
                onKeyDown={(e) => handleEnterKeyPress(ENTER5, e)}
                ref={ENTER4}
              />
            </Col> */}
          </Row>

          <div className="col-12" style={{ color: secondaryColor }}>
          <div
              style={{
                fontSize: "12px",
                width: "100%",
                overflowX: "auto",
                color: secondaryColor,
                
              }}
            >
              <div >
              <style>{customScrollbarStyle}</style>

                <MDBTable striped bordered small responsive style={{maxHeight: "68vh",
                        overflowY: "scroll",
                        display: "block",}}>
                  <MDBTableHead>
                    <tr style={{ textAlign: "center", position: "sticky", bottom: 0, zIndex: 2}}>
                      <th
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            position: "sticky",
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                        ID
                      </th>
                      <th
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            position: "sticky",
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                         Date
                      </th>
                      <th
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            position: "sticky",
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                        Description
                      </th>
                      <th
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            position: "sticky",
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                        Net Amt{" "}
                      </th>

                      <th
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            position: "sticky",
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                        Collection Amt
                      </th>
                      <th
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: "bold",
                            position: "sticky",
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                        Balance
                      </th>
                      
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody 
>
                  {detailItem.map((item, index) => (
        <tr key={index}>
                      <td style={{ width: "1%",textAlign: "center" }}>{index+1}</td>

          <td style={{ width: "15%", textAlign: "center" }}>{item.ttrndat}</td>
          <td style={{ width: "40%", textAlign: "left" }}>{item.tcstnam}</td>
          <td style={{ width: "15%", textAlign: "right" }}>{item.netamt}</td>
          <td style={{ width: "15%", textAlign: "right" }}>{item.colamt}</td>
          <td style={{ width: "15%", textAlign: "right" }}>{item.balance}</td>
        </tr>
      ))}
      
      {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 50
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 6,
                        }).map((_, colIndex) => (
                          <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                        ))}
                      </tr>
                    ))}
                  </MDBTableBody>

                  <MDBTableFoot 
                    style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                  >
                    <tr>
                      <th
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                        }}
                      ></th>
                      <th
                        colSpan={4}
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "left",
                        }}
                      >
                        {Length}
                      </th>
                      <th style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "center",
                        }}>
                        <img
                src={PDF}
                alt="PDF Image"
                style={{ width: "30%", height: "20px" }}
                onClick={generatePDF}
                onKeyDown={(e) => handleEnterKeyPress(ENTER6, e)}
                ref={ENTER5}
              />
              <img
                src={XLS}
                alt="PDF Image"
                style={{ width: "30%", height: "20px" }}
                onClick={generateExcel}
                onKeyDown={(e) => handleEnterKeyPress(ENTER1, e)}
                ref={ENTER6}
              />
              </th>
              
                    </tr>
                  </MDBTableFoot>
                </MDBTable>
              </div>
            </div>
        </div>
        </div>
       

      

        <Footer />
      </div>
    </>
  );
};

export default General_Leadger;
