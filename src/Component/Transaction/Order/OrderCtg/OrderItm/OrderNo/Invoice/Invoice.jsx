

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import Header from "../../../../../../MainComponent/Header/Header";
import Footer from "../../../../../../MainComponent/Footer/Footer";
import PathHead from "../../../../../../MainComponent/PathHead/PathHead";
// import Edit from '../../../../image/edit.png';
import { Form } from 'react-bootstrap'; 
import Empty from '../../../../../../../image/empty.png';
// import Bin from '../../../../../../../image/bin.png';
import Alert from "@mui/material/Alert";

import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../../../../ThemeContext";

const Invoice = () => {
  
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { id } = useParams();
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);

  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const [menuItems, setMenuItems] = useState([]);
  const imageurl = `${apiLinks}/itemimage/`;

  const handleMenuItemClick = () => {
    navigate(`/Order_Category/${id}`);
  };
  const handleMenuItemClick1 = () => {
    navigate("/CheckOut", {
      state: {
        tamtItems,
        totalItem,
        detailItem,
        itemPictures, // Pass the itemPictures array as part of the state

      },
    });
  };
  const [getUser, setUser] = useState();
  const [orderdate, setOrderDate] = useState();
  
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
    const apiUrl = `${apiLinks}/Cart_Item.php`;
    const formData = new URLSearchParams({ orderid: id }).toString();
  
    axios
      .post(apiUrl, formData)
      .then((response) => {
        setTableData({
          columns: [], // Update with your columns data
          rows: response.data.detail, // Update with your rows data
        });
  
        settamtItems(response.data.totalAmt);
        settotalItem(response.data.totalitem);
        setDetailItem(response.data.detail);
        setOrderDate(detailItem)
        console.log("orddeer ddate ",detailItem[0].tordid);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }
  
  
  const [itemPictures, setItemPictures] = useState([]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Filtered Rows
  const filteredRows = detailItem
    ? detailItem.filter((item) =>
        item.titmdsc.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const [data1, setData1] = useState({ columns: [], rows: [] });


// Define a function to fetch item data
function fetchItemData() {
  fetch(`${apiLinks}/get_item.php`)
    .then((response) => response.json())
    .then((apiData) => {
      // Now you need to map 'TItmPic' from apiData and store it in 'itemPictures' state
      const transformedData = apiData.map((item) => ({
        TItmId: item.TItmId,
        TItmPic: item.TItmPic, // Assuming 'TItmPic' is a property in your API response
      }));

      setItemPictures(transformedData);
      console.log(apiData); // Log the fetched data
    })
    .catch((error) => console.error(error));
}

// Use the fetchItemData function within a useEffect
useEffect(() => {
  fetchItemData();
}, []);

// You can also call fetchItemData elsewhere in your component as needed


const [values, setValues] = useState({
  itmIdd: "",
  itemCodd: "", // Initialize itemCodd here or set it to a default value
  itemDscc: "",
  itemRmkss: "",
  typee: "",
  pic: "",
  loading: false,
});

  ///////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////
  //////////////////// DELETE ITEM api ////////////////////////
  ///////////////////////////////////////////////////////////
  const [tableData, setTableData] = useState({ columns: [], rows: [] });

  const [refreshKey, setRefreshKey] = useState(0);

  const DeleteItem = async (item) => {
    try {
      const formData = new FormData();
      formData.append("id", item);
  
      const response = await axios.post(
        `${apiLinks}/DeleteItem.php`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.error === 200) {
        setTableData((prevData) => ({
          ...prevData,
          rows: prevData.rows.filter((row) => row.id !== item.id),
        }));
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          window.location.reload();

        }, 1000);
  
        // Change the key to trigger a component refresh
        // setRefreshKey((prevKey) => prevKey + 1);
  
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
  
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
      setAlert("Error deleting item.");
    }
  };
  const handleInputChange2 = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
        <Header />
        <PathHead pageName="Transaction > Order > Invoice" screen='Get_Item' pageLink="/Order_Number"/>

      <div className="col-12" >
        
      
        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div
            className="col-md-12"
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "1%",
              width: "100%",
              maxWidth: "74%",
              margin: "2% 0",
              border:'1px solid black',
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
          >
            <form
              style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',height:'25rem'}}
            >
              <div className="form-group" >


               <div className="row">


                <div className="col-9">
                  
                  <table>
                    <tbody>
                      <tr>
                        <td style={{ display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: '10px',  }}> <label htmlFor="code">Invoice# :</label></td>
                        <td> <input
            type="text"
            id="code"
            placeholder=" Id"
            name="itmIdd"
            className="form-control"
            style={{ height: '24px', width: '60px' }}
            readOnly 
          /></td>
                      </tr>
                      <tr>
                        <td style={{ display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: '10px',  }}> <label htmlFor="code">Code :</label></td>
                        <td><input
                      type="text"
                      id="code"
                      placeholder="Cash / Supplier"
                      name="itemCodd"
                      className="form-control"
                      value={values.itemCodd}

                      style={{height:'24px'}}
                      onChange={handleInputChange2}
                    /></td>
                    <td><input
                      type="text"
                      id="code"
                      placeholder="Code Description"
                      name="itemDscc"
                      className="form-control"
                      value={values.itemDscc}
                      style={{height:'24px'}}
                      onChange={handleInputChange2}
                    /></td>
                      </tr>
                      <tr>
                        <td style={{ display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: '10px',  }}> <label htmlFor="code" >Remarks :</label></td>
                        <td> <input
                      type="text"
                      id="code"
                      placeholder="Remarks  "
                      name="itemRmkss"
                      className="form-control"
                      value={values.itemRmkss }
                      style={{height:'24px' ,fontSize:'12px'}}
                      onChange={handleInputChange2}
                    /></td>
                      </tr>
                    </tbody>
                  </table>
                
                </div>
                <div className="col-3" >
                  <tr>
                    <td>Order Date:</td>
                    <td style={{ fontSize: '14px', color: '#ac1e1e' }}>{detailItem[0]?.torddat}</td>
                  </tr>
                  <tr>
                    <td>Order ID:</td>
                    <td style={{ fontSize: '14px', color: '#ac1e1e' }}>{detailItem[0]?.tordid}</td>
                  </tr>
 
</div>



               </div>
                <div className="row">
                <div style={{fontSize: "12px", width: "120%", color: secondaryColor }}>
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
            <div style={{ maxHeight: "61vh", overflowY: "scroll" }} >
              <MDBTable
               
                striped
                bordered
                small
                responsive
              >
                <MDBTableHead>
                  <tr>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Sr.</th>
                    
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Item Id</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Item Description</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Quantity</th>
                    
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Sale Rate</th>
               
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>Sale Amount</th>
                    <th style={{
                      backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
                      top: 0,
                      zIndex: 1,
                    }}>User Id</th>
                    
                    
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                {tableData.rows.map((item, index) => {
                    const filteredItemPictures = itemPictures ? itemPictures.filter((apiItem) => apiItem.TItmId === item.titmid) : [];
                  
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                    
                        <td>{item.titmid}</td>
                        <td style={{ textAlign: "left" }}>{item.titmdsc}</td>
                        <td>{item.titmqnt}</td>
                        <td>{item.tsalrat}</td>
                        <td>{item.salamt}</td>
                        <td>{item.tuserid}</td>
                        
                        

                      </tr>
                    );
                  })}

{Array.from({ length: Math.max(0, 11 - tableData.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 4 }).map((_, colIndex) => (
            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
          ))}
        </tr>
      ))}
                </MDBTableBody>
              </MDBTable>
            </div>
            <div >
  <Card>
    <Card.Body>
      <Row>
      
     
      <Col xs={3} sm={3} md={3} lg={3} xl={3}>
        <Button
                className="btn btn-primary"
                // onClick={() => navigate('/Order_Number')}
                style={{
                  backgroundColor: primaryColor,
                  fontSize: '11px',
                  color: secondaryColor,
                  width: '70%',
                }}
              >
                Invoice Generate
              </Button>
        </Col>
        
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <h6>Total Quantity: {totalItem}</h6>
        </Col>
        <Col xs={3} sm={3} md={3} lg={3} xl={3}>
          <h6>Total Amount: {tamtItems}</h6>
        </Col>
       
      </Row>
    </Card.Body>
  </Card>
       </div>
          </div>
                </div>
               
<br />
                
              </div>
            </form>



           




            
          </div>
        </div>
        <br />
      </div>
      </div>
      <Footer/>







    </>
  );
};

export default Invoice;



// <form
// style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',marginLeft:'-12%',height:'25rem'}}
// >
// <div className="form-group" >


//  <div className="row">


//   <div className="col-8">
    
//   <div>
// <div className="row">
// <div className="col-md-4">
// <label htmlFor="code">Invoice# :</label>
// </div>
// <div className="col-md-8">
// <input
// type="text"
// id="code"
// placeholder=" Id"
// name="itmIdd"
// className="form-control"
// style={{ height: '20px', width: '60px', marginLeft: '-3%', textAlign: 'right' }}
// readOnly // Make the input read-only to prevent user edits
// />
// </div>
// </div>


// </div>
//   <div className="row">
//     <div className="col-md-4" >
//       <label htmlFor="code">Code :</label>
//     </div>
//     <div className="col-md-4">
//       <input
//         type="text"
//         id="code"
//         placeholder="Cash / Supplier"
//         name="itemCodd"
//         className="form-control"
//         value={values.itemCodd}

//         style={{height:'20px', width:'170px' ,marginLeft: "-7%"}}
//         onChange={handleInputChange2}
//       />
//     </div>
//     <div className="col-md-4">
//       <input
//         type="text"
//         id="code"
//         placeholder="Code Description"
//         name="itemDscc"
//         className="form-control"
//         value={values.itemDscc}
//         style={{height:'20px', width:'170px',marginLeft: "-35%" }}
//         onChange={handleInputChange2}
//       />
//     </div>
//   </div>

  
 
  


//   <div className="row">
//     <div className="col-md-4" >
//       <label htmlFor="code" >Remarks :</label>
//     </div>
//     <div className="col-md-8">
//       <input
//         type="text"
//         id="code"
//         placeholder="Remarks  "
//         name="itemRmkss"
//         className="form-control"
//         value={values.itemRmkss }
//         style={{height:'20px', width:'200px' ,fontSize:'12px',marginLeft: "-3%"}}
//         onChange={handleInputChange2}
//       />
//     </div>

    
//   </div>

// <br />

  
//   {filteredRows.length > 0 ? (
// <>
// <div style={{ marginLeft:'20%',fontSize: "12px", width: "120%", color: secondaryColor }}>
// <Row>

// <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 9 }}>
// <Form.Control
//   type="text"
//   placeholder="Search..."
//   value={searchText}
//   onChange={handleSearchChange}
// />
// </Col>
// </Row>
// <div style={{ maxHeight: "300px", overflowY: "scroll" }} >
// <MDBTable
 
//   striped
//   bordered
//   small
//   responsive
// >
//   <MDBTableHead>
//     <tr>
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Sr.</th>
//       {/* <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Order Id</th> */}
//       {/* <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Order Date</th> */}
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Item Id</th>
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Item Description</th>
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Quantity</th>
      
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Sale Rate</th>
 
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>Sale Amount</th>
//       <th style={{
//         backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky",
//         top: 0,
//         zIndex: 1,
//       }}>User Id</th>
      
      
//     </tr>
//   </MDBTableHead>
//   <MDBTableBody>
//   {tableData.rows.map((item, index) => {
//       // Find the corresponding item picture in itemPictures
//       // const filteredItemPictures = itemPictures.filter((apiItem) => apiItem.TItmId === item.titmid);
//       const filteredItemPictures = itemPictures ? itemPictures.filter((apiItem) => apiItem.TItmId === item.titmid) : [];

//       return (
//         <tr key={index}>
//           <td>{index + 1}</td>
//           {/* <td>{item.tordid}</td> */}
//           {/* <td>{item.torddat}</td> */}
//           <td>{item.titmid}</td>
//           <td style={{ textAlign: "left" }}>{item.titmdsc}</td>
//           <td>{item.titmqnt}</td>
//           <td>{item.tsalrat}</td>
//           <td>{item.salamt}</td>
//           <td>{item.tuserid}</td>
          
          

//         </tr>
//       );
//     })}
//   </MDBTableBody>
// </MDBTable>
// </div>
// <div >
// <Card>
// <Card.Body>
// <Row>


// <Col xs={3} sm={3} md={3} lg={3} xl={3}>
// <Button
//   className="btn btn-primary"
//   // onClick={() => navigate('/Order_Number')}
//   style={{
//     backgroundColor: primaryColor,
//     fontSize: '11px',
//     color: secondaryColor,
//     width: '70%',
//   }}
// >
//   Invoice Generate
// </Button>
// </Col>
// <Col xs={3} sm={3} md={3} lg={3} xl={3}>
// <Button
//   className="btn btn-primary"
//   onClick={() => navigate('/Order_Number')}
//   style={{
//     backgroundColor: primaryColor,
//     fontSize: '11px',
//     color: secondaryColor,
//     width: '80%',
//     marginBottom: '10px',
//   }}
// >
//   Return
// </Button>
// </Col>
// <Col xs={3} sm={3} md={3} lg={3} xl={3}>
// <h6>Total Quantity: {totalItem}</h6>
// </Col>
// <Col xs={3} sm={3} md={3} lg={3} xl={3}>
// <h6>Total Amount: {tamtItems}</h6>
// </Col>

// </Row>
// </Card.Body>
// </Card>
// </div>
// </div>

// </>
// ) : (
// <>
// <div style={{ marginLeft:'10%',fontSize: "12px", width: "180%", color: secondaryColor }}>
// <Row>

// <Col xs={12} sm={4} md={4} lg={4} xl={3}>
// <Button
//   className="btn btn-primary"
//   onClick={() => navigate('/Order_Number')}
//   style={{
//     backgroundColor: primaryColor,
//     fontSize: '11px',
//     color: secondaryColor,
//     width: '100%',
//     marginBottom: '10px',
//   }}
// >
//   Return
// </Button>
// </Col>
// <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 6 }}>
// <Form.Control
//   type="text"
//   placeholder="Search..."
//   value={searchText}
//   onChange={handleSearchChange}
// />
// </Col>
// </Row>

// <div >

// </div>
// </div>
// <div style={{marginLeft:'40%',marginTop:'14%'}}>  
// <img
//   src={Empty}
//   onClick={() => navigate(`/Order_Category/${id}`)}
//   style={{ height: "24%", width: "25%", marginRight: "5%" }}
// />
// </div>
// </>
// )}


      

  


//   </div>
//   <div className="col-4">
// <div className="row">
// <div className="col-md-8">
// <h6 style={{ fontWeight: 'bold' }}>Order Date:</h6>
// </div>
// <div className="col-md-4">
// <p style={{ fontSize: '14px', color: '#ac1e1e' }}>{detailItem[0]?.torddat}</p>
// </div>
// </div>
// <div className="row">
// <div className="col-md-8">
// <h6 style={{ fontWeight: 'bold' }}>Order ID:</h6>
// </div>
// <div className="col-md-4">
// <p style={{ fontSize: '14px', color: '#ac1e1e' }}>{detailItem[0]?.tordid}</p>
// </div>
// </div>
// </div>

//  </div>

 
// <br />
  
// </div>
// </form>