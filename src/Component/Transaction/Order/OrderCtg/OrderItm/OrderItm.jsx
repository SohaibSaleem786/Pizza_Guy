import Alert from "@mui/material/Alert";
import axios from "axios";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

import {
  // ... other imports ...
  TextField, // Make sure TextField is imported from the correct library
} from "@mui/material";
import Header from "../../../../MainComponent/Header/Header";
import Footer from "../../../../MainComponent/Footer/Footer";
import PathHead from "../../../../MainComponent/PathHead/PathHead";
import Empty from '../../../../../image/empty.png';
// import '../Order/OrderItm.css'
import { Form } from 'react-bootstrap'; 
// import Cart from '../../../image/cart.png'
import { useTheme } from "../../../../../ThemeContext";

const Order_Item = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const [filteredData, setFilteredData] = useState([]);
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();
  const { categoryId } = useParams();
  const [filterValue, setFilterValue] = useState(""); // Define filterValue and setFilterValue
  const [alertData, setAlertData] = useState(null);
  const { id } = useParams();
  const imageurl = `${apiLinks}/itemimage/`;

  const handleMenuItemClick = () => {
    navigate("/Item");
  };
  const [getUser, setUser] = useState();


  // const handleQuantityChange = (itemIndex, newQuantity) => {
  //   const updatedData = [...filteredData];
  //   updatedData[itemIndex].quantity = parseInt(newQuantity, 10); 
  //   setFilteredData(updatedData);
  // };

  const handleQuantityChange = (itemIndex, newValue) => {
    const updatedData = [...filteredData];
    // Parse the new value as a float
    const parsedValue = parseFloat(newValue);
    // Check if the parsed value is a valid number
    if (!isNaN(parsedValue)) {
      updatedData[itemIndex].quantity = parsedValue;
      setFilteredData(updatedData);
    }
  };
  useEffect(() => {
    fetch(`${apiLinks}/get_item.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const filteredData = apiData.filter((item) => item.TCtgId === categoryId);

        const transformedData = filteredData.map((item) => ({
          TItmId: item.TItmId,
          TItmDsc: item.TItmDsc,
          uom:item.uom,
          TItmSts: item.TItmSts,
          TPurRat: item.TPurRat,
          TSalRat: item.TSalRat,
          TCtgId: item.TCtgId,
          TitmTyp: item.TitmTyp,
          TItmPic: item.TItmPic,
          itmdis : item.itmdis,
          quantity: 1.00, // Add a quantity property to each item
        }));

        // const columns = [
        //   { label: "Item ID", field: "TItmId", sort: "asc" },
        //   { label: "Desription ", field: "TItmDsc", sort: "asc" },
        //   { label: "Status", field: "TItmSts", sort: "asc" },
        //   { label: "Pur. Rate", field: "TPurRat", sort: "asc" },
        //   { label: "Sale Rate", field: "TSalRat", sort: "asc" },
        //   { label: "Category", field: "TCtgId", sort: "asc" },
        //   { label: "Item Type", field: "TitmTyp", sort: "asc" },
        //   { label: "Pic ", field: "TItmPic", sort: "asc" },
        //   { label: "Edit ", field: "tedtdat", sort: "asc" },
        // ];
        // setData({ column,  rows: transformedData });

        setData({  rows: transformedData });
        setFilteredData(transformedData); // Set filteredData initially

        console.log(apiData);
      })
      .catch((error) => console.error(error));
  }, [categoryId]);

  const handleSearchChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredItems = data.rows.filter((item) =>
      item.TItmDsc.toLowerCase().includes(searchText)
    );
    setFilteredData(filteredItems);
    setSearchText(searchText);
  };

  const handleDecrement = (itemIndex) => {
    const updatedData = [...filteredData];
    if (updatedData[itemIndex].quantity > 0) {
      updatedData[itemIndex].quantity -= 1;
      setFilteredData(updatedData);
    }
  };

  const handleIncrement = (itemIndex) => {
    const updatedData = [...filteredData];
    updatedData[itemIndex].quantity += 1;
    setFilteredData(updatedData);
  };
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      // handleAddToCart();
      console.log(userData);
      console.log("user id is", userData.id);
    } else {
      console.error("User data not available in local storage.");
    }
  }, []);

  const [OrderItem, settotalItem1] = useState([]);

  useEffect(() => {
    fetch(`${apiLinks}/PendingOrder.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
            id : item.id,
           
        
        }));
  
        const columns = [
          { label: "Order ID", field: "id", sort: "asc" },
          
          { label: "Edit ", field: "tedtdat", sort: "asc" },
  
  
        ];
  
        // setData({ columns, rows: transformedData });
         
        settotalItem1(apiData.length); 
      })
      .catch((error) => console.error(error));
  }, []);


  const [cartItems, setCartItems] = useState({
    detail1: {},
    detail2: [],
  });
  function handleAddToCart(item) {
    const { TItmId, TItmDsc, TPurRat, TSalRat, quantity, itmdis } = item;
  
    // Get the current cart items from state
    const currentCartItems = [...cartItems.detail2];
  
    // Create an object with the new item details
    const newItem = {
      orderid: id,
      id: TItmId,
      description: TItmDsc,
      purchase_rate: TPurRat,
      sale_rate: TSalRat,
      discount_rate: itmdis,
      quantity: quantity,
    };
  console.log(id)
    // Add the new item to the current cart items
    currentCartItems.push(newItem);
  
    // Create a new response with the updated cart items
    const updatedResponse = {
      ...cartItems,
      detail2: currentCartItems,
    };
  
    // Update the cart items in state
    setCartItems(updatedResponse);
  
    const data = {
      itemid   : TItmId,
      itemDec  : TItmDsc,
      purRate  : TPurRat,
      saleRate : TSalRat,
      disRate  : itmdis,
      qty      : quantity,
      orderid  : id,
      userid   : 33,
    };
  
    const formData = new URLSearchParams(data).toString();
  
    axios
      .post(`${apiLinks}/Add_Cart.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            // navigate("/Order_Item");
          }, 1000);
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
        // Handle errors
        console.error("Error:", error);
      });
  }
  

  console.log('response: ',cartItems);
   /////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////
 ///////////////////////////CART ICON KA OPER ITEM NUMBER ///////////////////////////////
 /////////////////////////////////////////////////////////////////////////
 useEffect(() => {
  // Retrieve user data from local storage
  const userData = JSON.parse(localStorage.getItem("user"));

  if (userData) {
    setUser(userData);
    console.log(userData);
    fetchMenuItems(userData.id); // Fetch menu items based on user ID from userData
    console.log("user id is", userData.id);
  } else {
    // Handle cases when user data is not available
    console.error("User data not available in local storage.");
  }
}, []);
const [totalItem, settotalItem] = useState([]);

function fetchMenuItems(userID) {
  const apiUrl = `${apiLinks}/Cart_Item.php`;
  const data = {
    userid: userID,
  };

  const formData = new URLSearchParams(data).toString();

  axios
    .post(apiUrl, formData)
    .then((response) => {

      settotalItem(response.data.totalItem);

      console.log("titm total amt ", response.data.titm);
    })
    .catch((error) => {
      // Handle errors
      console.error("Error:", error);
    });
}


  return (
    <>
      <div style={{
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
      
      
      
      
      {/* <Header id={id}/> */}
      <Header id={id} screen="OrderItem" />

      <PathHead pageName="Transaction > Order > Category > Item" screen='Get_Item' pageLink="/Order_Number"/>

      <div className="col-12" style={{ color: secondaryColor }}>
        <div style={{margin:'20px' , border:'1px solid black',backgroundColor:'white'}}>
        {/* style={{margin:'20px 20px ', padding:'0 20px 20px 20px'}} */}
        
        <Row >
              <Col xs={12} sm={4} md={4} lg={4} xl={2}>
  <Link to={`/Cart_Item/${id}`} state={{ cartItems }}>
    <Button
      className="btn btn-primary"
      style={{
        backgroundColor: primaryColor,
        fontSize: '11px',
        color: secondaryColor,
        width: '100%',
        marginBottom: '10px',
      }}
    >
      CheckOut
    </Button>
  </Link>
</Col>

              {/* <Col xs={12} sm={4} md={4} lg={4} xl={2}>
                <Button
                  className="btn btn-primary"
                  onClick={() => navigate(`/Order_Category/${id}`)}
                  style={{
                    backgroundColor: primaryColor,
                    fontSize: '11px',
                    color: secondaryColor,
                    width: '100%',
                    marginBottom: '10px',
                  }}
                >
                  Return
                </Button>
              </Col> */}
              
              <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 3, offset: 7}}>
    <Form.Control
      type="text"
      placeholder="Search..."
      value={searchText}
      onChange={handleSearchChange}
    />
  </Col>

            </Row>
        <div className={`card-container ${filteredData.length > 0 ? 'cards' : ''}`} 
        style={{
          // Your existing styles for the container div
         
          overflowX: 'hidden', // Hide horizontal overflow
          overflowY: 'auto',
          maxHeight: '67vh',
        }}>
           
          {filteredData.length > 0 ? (
            <>
            
           
            
            <div className={`cards ${filteredData.length > 0 ? "cards-large" : "cards-small"}`}>
              <Row xs={1} md={2} lg={3} xl={4}>
                {filteredData.map((row, index) => (
                  <Col key={index}>
                    <Card style={{ marginBottom:'11px' }}>
                      <Card.Img variant="top" height="140"   src={imageurl + row.TItmPic} />
                      <Card.Body>
                        <Card.Title style={{ fontSize:'17px',fontWeight:'bold' ,height:'40px' }}>{row.TItmDsc}</Card.Title>
                        
                        
                        <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px',marginTop:'-5%' }}>
                        <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            UOM: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.uom}
                          </Typography>
                          
                          
                        </div>
                       

                        <div style={{ display: 'flex', alignItems: 'center',fontSize:'11px' }}>
                         
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            Sale Rate: 
                          </Typography>               
                          <Typography gutterBottom  component="div" style={{ fontSize:'13px' }}>
                            {row.TSalRat}
                          </Typography>
                          
                        </div>
                      </Card.Body>
                      <div style={{ borderTop: '1px solid #e0e0e0', padding: '8px', marginTop: 'auto' }}>
                        <CardActions style={{ justifyContent: 'space-between' }}>
                          <Button
                            variant="contained"    
                            style={{
                              width: '130px',
                              height: '30px',
                              fontSize:'9px',
                              backgroundColor: primaryColor,
                              color: secondaryColor,
                              // borderRadius: '50%',
                              marginRight: '10px',
                              minWidth: '0',
                              padding: '0',
                            }}
                            onClick={() => handleAddToCart(row)}
                          >
                            Add to Cart
                          </Button>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
  <Button
    variant="contained"
    style={{
      width: '25px',
      height: '25px',
      backgroundColor: primaryColor,
      color: secondaryColor,
      borderRadius: '50%',
      marginRight: '10px',
      minWidth: '0',
      padding: '0',
    }}
    onClick={() => handleDecrement(index)}
  >
    -
  </Button>
  {/* <TextField
  value={row.quantity.toFixed(2).toString()} // Format the value to two decimal places and convert to a string
  onChange={(e) => handleQuantityChange(index, e.target.value)}
  style={{ width: '50px', fontSize: '11px', marginRight: '10px' }}
/> */}
<TextField
  value={row.quantity.toFixed(2)} // Format the value to two decimal places
  onChange={(e) => handleQuantityChange(index, e.target.value)}
  style={{ width: '50px', fontSize: '11px', marginRight: '10px' }}
/>

  <Button
    variant="contained"
    style={{
      width: '25px',
      height: '25px',
      backgroundColor: primaryColor,
      color: secondaryColor,
      borderRadius: '50%',
      minWidth: '0',
      padding: '0',
    }}
    onClick={() => handleIncrement(index)}
  >
    +
  </Button>
</div>

                        </CardActions>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        ) : (
          <>
           
            <div style={{marginLeft:'40%',marginTop:'14%'}}>  
              <img
                src={Empty}
                onClick={() => navigate("/Item")}
                style={{ height: "24%", width: "25%", marginRight: "5%" }}
              />
            </div>
          </>
        )}
      </div>
      
    </div>
    <Footer />
    </div>
    </div>
  </>
);
};

export default Order_Item;