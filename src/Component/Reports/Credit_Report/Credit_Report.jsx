import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead ,MDBTableFoot} from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
// import Edit from '../../../../image/edit.png';
import { Form } from 'react-bootstrap'; 
import Empty from '../../../image/empty.png';
// import Bin from '../../../../../../../image/bin.png';
import Alert from "@mui/material/Alert";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../DailySaleReport/DailySaleReports.css';
import "react-calendar/dist/Calendar.css"; // Import the CSS for styling
import PDF from "../../../image/pdf.png";
import XLS from "../../../image/xls.png";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { useParams } from "react-router-dom";
// import axios from 'axios';
import "jspdf-autotable";
import jsPDF from 'jspdf'; // Import jsPDF
import * as XLSX from 'xlsx'; // Import XLSX
const Credit_Report = () => {
    const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with today's date

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { id } = useParams();
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [rowNumber, setRowNumber] = useState(0); // Initialize row number

  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [menuItems, setMenuItems] = useState([]);
  const imageurl = `${apiLinks}/itemimage/`;


  const [getUser, setUser] = useState();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      fetchMenuItems(); // Fetch menu items based on user ID from userData
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);



  const [tamtItems, settamtItems] = useState([]);
  const [totalItem, settotalItem] = useState([]);
  const [detailItem, setDetailItem] = useState([]);

  function fetchMenuItems() {
    const formattedDate = selectedDate.toISOString().split("T")[0]; // Convert selected date to 'yyyy-MM-dd' format
    const apiUrl = `${apiLinks}/Credit-Report.php`;
    // const formData = new URLSearchParams({ date: formattedDate }).toString();
  
    axios
      .post(apiUrl)
      .then((response) => {
        
  
        // settamtItems(response.data.totalamt);
        // settotalItem(response.data.totalitem);
        setDetailItem(response.data);
        console.log("titm total amt ", response.data.detail);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  
  
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };


  const filteredRows = detailItem ? detailItem.filter((item) =>
  item.accdsc.toLowerCase().includes(searchText.toLowerCase())
) : [];






  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  //////////////////// DELETE ITEM api ////////////////////////
  ///////////////////////////////////////////////////////////
  const [tableData, setTableData] = useState({ columns: [], rows: [] });



  
  
  useEffect(() => {
    fetchMenuItems(); // Call fetchMenuItems when selectedDate changes
  }, [selectedDate]);







  //////////////////////// PDF ////////////////////////////////
  const generatePDF = () => {
    const doc = new jsPDF();

    // Set the header text
    const companyName = "CRYSTAL SOLUTION";
    const reportTitle = "CREDIT REPORT";

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
    const tableData = filteredRows.map((item) => [
      item.acccode,
      item.accdsc,
      item.accmobile,
      item.netamt,
      item.colamt,
      item.balance,
    
    ]);

    // Set up the table headers
    const tableHeaders = [
      "Account Code",
      "Description",
      "Mobile",
      "Net Amt",
      "Collect Amt",
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
    doc.save("Credit_Report.pdf");
  };

  //////////////////////// Excell ////////////////////////////////

  const generateExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(filteredRows);

    XLSX.utils.book_append_sheet(wb, ws, "Credit Report");
    XLSX.writeFile(wb, "Credit_Report.xlsx");
  };






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
      <PathHead pageName="Reports > Credit Report " screen='Get_Item' pageLink="/MainPage"/>

      


    <div style={{marginLeft:'16%',marginRight:'16%',marginTop:'3%'}}>
    <Row>
   

            
            
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
    </div >
      {filteredRows.length > 0 ? (
            <>
          <div className="col-12" style={{ color: secondaryColor }} >
        <div style={{ marginLeft: "15%", marginRight: "15%", maxWidth: "70%" }}>
         
          <div style={{ fontSize: "12px", width: "100%", overflowX: "auto", color: secondaryColor }}>
            <div style={{ maxHeight: "70vh", overflowY: "scroll" }} >
              <MDBTable
               
                striped
                bordered
                small
                responsive
              >
                <MDBTableHead>
                  <tr>
                  <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}
                    >Sr. </th>
                    {/* <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Id</th> */}
                    <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}>Code</th>
                    <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}>Description</th>
                    <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}>Mobile Number</th>
                    <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}>Debit Amt</th>
                    <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}>Credit Amt</th>
                    
                    <th style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      fontWeight: 'bold',
                      position: 'sticky',
                      top: -1,
                      zIndex: 1,
                    }}>Balance</th>
                    
                    
                    
                  
                  
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
            {filteredRows.map((item, index) => {
              const row = {
                rowNumber: rowNumber + index + 1, // Calculate row number
                ...item, // Include other row data
              };


              return (
                <tr key={index}>
                  <td style={{ width: "1%" }}>{row.rowNumber}</td>
                        <td style={{ width: "7%" }}>{item.acccode}</td>
                        <td style={{ textAlign: "left" }}>{item.accdsc}</td>
                        <td style={{ textAlign: "right",width:'15%' }}>{item.accmobile}</td>
                        <td style={{ textAlign: "right",width:'10%' }}>{item.netamt}</td>
                        <td style={{ textAlign: "right",width:'10%' }}>{item.colamt}</td>
                        <td style={{ textAlign: "right",width:'10%' }}>{item.balance}</td>
                  
                  
                </tr>
              );
            })}
                     {Array.from({
                      length: Math.max(
                        0,
                        Math.floor((100 * window.innerHeight) / 100) / 55
                      ),
                    }).map((_, index) => (
                      <tr key={`blank-${index}`}>
                        {Array.from({
                          length: 7,
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
                            fontWeight: 'bold',
                            position: 'sticky',
                            top: -1,
                            zIndex: 1,
                          }}
                      ></th>
                      <th
                        colSpan={5}
                        style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                            fontWeight: 'bold',
                            position: 'sticky',
                            top: -1,
                            zIndex: 1,
                          }}
                      >
                      </th>
                      <th style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,

                          textAlign: "center",
                        }}>
                        <img
                src={PDF}
                alt="PDF Image"
                style={{ width: "40%", height: "20px" }}
                onClick={generatePDF}
               
              />
              <img
                src={XLS}
                alt="PDF Image"
                style={{ width: "40%", height: "20px" }}
                onClick={generateExcel}
               
              />
              </th>
              
                    </tr>
                  </MDBTableFoot>
              </MDBTable>
            </div>
           
          </div>
        </div>
        
      </div>
      
          </>
        ) : (
          <>
            
            <div style={{marginLeft:'40%',marginTop:'14%'}}>  
              <img
                src={Empty}
                // onClick={() => navigate(`/Order_Category/${id}`)}
                style={{ height: "24%", width: "25%", marginRight: "5%" }}
              />
            </div>
          </>
        )}






















      
        <Footer />
        </div>
    </>
  );
};

export default Credit_Report;







