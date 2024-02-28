import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead ,MDBTableFoot} from "mdbreact";
import Header from "../../../../../MainComponent/Header/Header";
import Footer from "../../../../../MainComponent/Footer/Footer";
import PathHead from "../../../../../MainComponent/PathHead/PathHead";
import Edit from '../../../../../../image/edit1.png';
import Invoice from '../../../../../../image/invoice.png';
import Order from '../../../../../../image/order.png';
import Pending from '../../../../../../image/progress.png';
import '../OrderNo/OrderNumber.css';
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useData } from "../../../../../../DataContext";
import { useParams } from "react-router-dom";

import {
    Card,
    Row,
    Col,
    Button,
    FormControl,
    InputGroup,
  } from "react-bootstrap";
  import { Form } from 'react-bootstrap';
import { useTheme } from "../../../../../../ThemeContext";
import { useLocation } from 'react-router-dom';


const Order_Number = () => {
  const location = useLocation();
  const cartItems = location.state ? location.state.cartItems : [];
 const { updateOrderData } = useData(); 
 const { id } = useParams();
 const [getOrderNum, setOrderdatainto] = useState();

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor ,secondaryColor} = useTheme();
  const { apiLinks } = useTheme();
  const [alertData, setAlertData] = useState(null);


  const handleMenuItemClick = () => {
    navigate("/Item");
  };
  const [getUser, setUser] = useState();
  const [Length, setLength] = useState("");

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);   
  const imageurl = `${apiLinks}/itemimage/`;
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch(`${apiLinks}/OrderList.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
            id : item.id,
            torddat : item.torddat,
            tordtim : item.tordtim,

            tcstnam : item.tcstnam,
            
            tordadd : item.tordadd,
            tmobnum : item.tmobnum,
            tordamt : item.tordamt,

            // titmqnt : item.titmqnt,
            tordsts : item.tordsts,
            
            // tcuteml : item.tcuteml,
        
        }));
        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "Date", field: "torddat", sort: "asc" },
          { label: "Time", field: "tordtim", sort: "asc" },

          { label: "Customer Name", field: "tcstnam", sort: "asc" },
          { label: "Order Address", field: "tordadd", sort: "asc" },
          { label: "Mobile#", field: "tmobnum", sort: "asc" },
          { label: "Amount", field: "tordamt", sort: "asc" },

          // { label: "Quantity", field: "titmqnt", sort: "asc" },
          { label: "Status", field: "tordsts", sort: "asc" },
          // { label: "Email", field: "tcuteml", sort: "asc" },
          { label: "Edit ", field: "tedtdat", sort: "asc" },
          { label: "Invoice ", field: "tedtdat", sort: "asc" },

        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);
        setDataFetched(true);
        if (apiData.length > 0) {
          const lastId = apiData[apiData.length - 1].id; // Increment the last ID by 1
          console.log('Last ID:', lastId);
          setOrderdatainto(lastId);
        }
         else {
          console.log('apiData is empty');
        }
        console.log('dsfsdfsd',apiData.length); 
        updateOrderData(apiData.length);

      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our Search Function
  const filteredRows = data.rows.filter((row) =>
  (row.tcstnam && row.tcstnam.toLowerCase().includes(searchText.toLowerCase())) ||
  (row.tmobnum && row.tmobnum.toLowerCase().includes(searchText.toLowerCase())) ||
  (row.tordsts && row.tordsts.toLowerCase().includes(searchText.toLowerCase()))
);


   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////New ORder id generate ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 const [Orderid, setOrderId] = useState(""); 
 const [refreshKey, setRefreshKey] = useState(0);



/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

const [newOrderData, setNewOrderData] = useState(null);


const handleNewOrderClick = () => {
  // Your code to generate a new order, similar to your existing code
  const apiUrl = `${apiLinks}/NewOrder.php`;
  const formData = new URLSearchParams().toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {
      if (response.data.error === 200) {
        // Log the entire response data
        console.log('Response Data:', response.data);

        const newOrder = {
          id: response.data.message,
        };
        const jsonString = JSON.stringify(newOrder);

        // Log the new order data
        console.log('this is or JSON variable:', jsonString);
        console.log('New Order Data:', newOrder);

        setNewOrderData(newOrder); // Store the new order data
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        
        // Do not navigate here

        // Update the DataContext with the new row.id value
        updateOrderData(response.data.orderid);
      } else {
        console.log(response.data.message);
        setAlertData({
          type: "error",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
        }, 2000);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Use useEffect to listen for changes in newOrderData and navigate when it's updated
useEffect(() => {
  if (newOrderData) {
    navigate(`/Order_Category/${newOrderData.id}`);
  }
}, [newOrderData]);


// Log newOrderData outside the function
console.log('Outside handleNewOrderClick:', newOrderData);
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
function formatCurrency(amount) {
  // Format the amount as a currency with thousands separator
  return new Intl.NumberFormat('en-US').format(amount);
}
return (
  <>
    <div style={{
      position: "relative",
      width: "100%",
      height: "100vh",
      overflow: "hidden",
    }}>
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

      <Header Orderid={Orderid}/>
      <PathHead pageName="Transaction > Order List" screen='Get_Item' pageLink="/MainPage"/>
<br />

      <div className="col-12 Order-List" style={{ color: secondaryColor, border:'1px solid black' ,padding:'10px',backgroundColor:'white'}}>
        <div 
        // style={{ marginLeft: "15%", marginRight: "15%", maxWidth: "70%" }}
        >
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={3}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "100%",
                  marginBottom: "10px",
                }}
                onClick={handleNewOrderClick} // Call the function on button click
              >
                New Order
              </Button>
            </Col>
              
              
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 6 }}>
    <Form.Control
      type="text"
      placeholder="Name & Phone"
      value={searchText}
      onChange={handleSearchChange}
    />
  </Col>

            </Row>
          <div style={{ fontSize: '12px', width: '100%', overflowX: 'auto' }}>
          <MDBTable scrollY maxHeight="65vh" striped bordered small responsive>
  <MDBTableHead>
    <tr>
     
      {data.columns.map((column, columnIndex) => (
        <th
          key={columnIndex}
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
            fontWeight: "bold",
            position: "sticky",
            top: -1,
            zIndex: 1,
          }}
        >
          {column.label}
        </th>
      ))}
    </tr>
  </MDBTableHead>
  <MDBTableBody>
    {filteredRows.map((row, index) => (
      <tr key={index}>
        {Object.keys(row).map((key, columnIndex) => {
          if (columnIndex !== 7) { // Skip rendering the 7th column
            return (
              <td
                key={key}
                style={{
                  textAlign: columnIndex === 3 || columnIndex === 4
  ? "left"
  : columnIndex === 5
  ? 'right'
  : 'center', 
                  
                    width:
                    columnIndex === 0
                      ? "1%"
                      : columnIndex === 1
                      ? "5%"
                      : columnIndex === 2
                      ? "3%"
                      : "auto",
                }}
              >
                {columnIndex === 1 && row[key]
                  ? formatDate(row[key])
                  : columnIndex === 6
                  ? formatCurrency(row[key])
                  : row[key] || '' /* Render a dash if data is not available */}
              </td>
            );
          }
          return null; // Return null for the 7th column
        })}
        <td>
          <div>
            {row.tordsts === "Pending" ? (
              <img
                src={Pending}
                alt="Pending"
                className="login-image"
                style={{ height: "1.5rem", width: "75%" }}
              />
            ) : row.tordsts === "Order" ? (
              <img
                src={Order}
                alt="Order"
                className="login-image"
                style={{ height: "1.5rem", width: "75%" }}
              />
            ) : null}
          </div>
        </td>

        <td>
          <div>
            {row.torddat ? (
              <Link >
              <img
                src={Edit}
                alt="Login"
                className="login-image"
                style={{ height: "1.5rem", width: "75%" }}
              />
            </Link>
            ) : (
              <Link to={`/Cart_Item/${row.id}`} state={{ cartItems }}>
              <img
                src={Edit}
                alt="Login"
                className="login-image"
                style={{ height: "1.5rem", width: "75%" }}
              />
            </Link>
            )}
          </div>
        </td>
        {/* <td>
          <div>
            <Link to={`/Cart_Item/${row.id}`} state={{ cartItems }}>
              <img
                src={Edit}
                alt="Login"
                className="login-image"
                style={{ height: "1.5rem", width: "75%" }}
              />
            </Link>
          </div>
        </td> */}
        <td>
          <div>
            {row.torddat ? (
              <Link to={`/Invoice/${row.id}` } replace>
                <img
                  src={Invoice}
                  alt="Login"
                  className="login-image"
                  style={{ height: "1.5rem", width: "75%" }}
                />
              </Link>
            ) : (
              <Link>
                <img
                  src={Invoice}
                  alt="Login"
                  className="login-image"
                  style={{ height: "1.5rem", width: "75%" }}
                />
              </Link>
            )}
          </div>
        </td>
      </tr>
    ))}

{Array.from({ length: Math.max(0, 10 - filteredRows.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 10 }).map((_, colIndex) => (
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
                    colSpan={9}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,

                      textAlign: "left",
                    }}
                  >
                    {Length}
                  </th>
                </tr>
              </MDBTableFoot>

          </MDBTable>


          </div>
        </div>

        <Footer />
      </div>
      </div>
    </>
  );
};

export default Order_Number;




