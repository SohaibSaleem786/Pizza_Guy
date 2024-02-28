import React, { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import TextField from "@mui/material/TextField";

import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions"; // Add this import
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import { Form } from "react-bootstrap"; // Add this import at the beginning of your file
import axios from "axios";
import "../OrderCtg/OrderCtg.css";
import { Row, Col, FormControl, InputGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Edit from "../../../../image/edit.png";
const Order_Category = () => {
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const imageurl = `${apiLinks}/ctgImg/`;

  const [alertData, setAlertData] = useState(null);
  const { id } = useParams();

  const handleMenuItemClick = () => {
    navigate("/AddCategory");
  };

  const [data, setData] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
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
  const handleCardClick = (item) => {
    // Pass the selected category ID to the Item component
    navigate(`/Order_Item/${item.tctgid}`);
  };

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  ///////////////////////////New ORder id generate ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////
  const [Orderid, setOrderId] = useState("");
  function generateOrderid() {
    const apiUrl = `${apiLinks}/NewOrder.php`;

    // Create an empty form data object
    const formData = new URLSearchParams().toString();

    // Make a POST request to the API
    axios
      .post(apiUrl, formData)
      .then((response) => {
        if (response.data.error === 200) {
          setOrderId(response.data.orderid);

          console.log("New Order id generated:", response.data.orderid);
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
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
        // navigate("/Item");
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });

    // .then((response) => {
    //   // Update your application state using settotalItem
    //   setOrderId(response.data.orderid);

    //   console.log("New Order id generated:", response.data.orderid);
    // })
    // .catch((error) => {
    //   // Handle errors
    //   console.error("Error:", error);
    // });
  }

  const [view, setView] = useState("card"); // Initialize the default view as 'table'

  const handleChangeView = (e) => {
    setView(e.target.value);
  };

  /////////////////////////////////////////////////////////////////////////
  const imageurlitm = `${apiLinks}/itemimage/`;

  const [data1, setData1] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetch(`${apiLinks}/get_item.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          TItmId: item.TItmId,
          TItmDsc: item.TItmDsc,
          itmdscurd: item.itmdscurd,
          itmremarks: item.itmremarks,
          uom: item.uom,
          TItmSts: item.TItmSts,
          TPurRat: item.TPurRat,
          itmdis: item.itmdis,
          TSalRat: item.TSalRat,
          tctgdsc: item.tctgdsc,
          TitmTyp: item.TitmTyp,
          TItmPic: item.TItmPic,
        }));

        const columns = [
          { label: " ID", field: "TItmId", sort: "asc" },
          { label: "Desription ", field: "TItmDsc", sort: "asc" },
          { label: "تفصیل ", field: "itmdscurd", sort: "asc" },
          { label: "Remarks ", field: "itmremarks", sort: "asc" },

          { label: "UOM ", field: "uom", sort: "asc" },

          { label: "Status", field: "TItmSts", sort: "asc" },
          { label: "Coast", field: "TPurRat", sort: "asc" },
          { label: "Sale ", field: "TSalRat", sort: "asc" },
          { label: "Discount", field: "itmdis", sort: "asc" },
          { label: "Category", field: "tctgdsc", sort: "asc" },
          { label: " Type", field: "TitmTyp", sort: "asc" },
          { label: "Pic ", field: "TItmPic", sort: "asc" },
        ];

        setData1({ columns, rows: transformedData });

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const [data2, setData2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.crystalsolutions.com.pk/malikspicy/get_item.php"
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch data from ${response.url}. Status: ${response.status} ${response.statusText}`
          );
        }

        const apiData = await response.json();
        console.log("Item data:", apiData); // Debug statement
        setData2(apiData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  ///////////////////////////category///////////////////////////////

  const tableCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
  };

  const [filteredData, setFilteredData] = useState([]);

  // Handle decrementing the item quantity.
  const handleDecrement = (itemIndex) => {
    const updatedData = [...filteredData];
    if (updatedData[itemIndex].quantity > 0) {
      updatedData[itemIndex].quantity -= 1;
      setFilteredData(updatedData);
    }
  };

  // Handle incrementing the item quantity.
  const handleIncrement = (itemIndex) => {
    const updatedData = [...filteredData];
    console.log("Item Index:", itemIndex);
    console.log("Initial filteredData:", filteredData);

    if (itemIndex >= 0 && itemIndex < updatedData.length) {
      updatedData[itemIndex].quantity += 1;
      console.log("Updated filteredData:", updatedData);
      setFilteredData(updatedData);
    }
  };

  // Handle quantity change directly from the input field.
  const handleQuantityChange = (itemIndex, newValue) => {
    const updatedData = [...filteredData];
    const parsedValue = parseFloat(newValue);
    if (!isNaN(parsedValue)) {
      updatedData[itemIndex].quantity = parsedValue;
      setFilteredData(updatedData);
    }
  };

  // const [filteredData, setFilteredData] = useState([]);

  ///////////////////////////////////////////////////////////
  // const handleQuantityChange = (itemIndex, newValue) => {
  //   const updatedData = [...filteredData];
  //   // Parse the new value as a float
  //   const parsedValue = parseFloat(newValue);
  //   // Check if the parsed value is a valid number
  //   if (!isNaN(parsedValue)) {
  //     updatedData[itemIndex].quantity = parsedValue;
  //     setFilteredData(updatedData);
  //   }
  // };

  // const handleIncrement = (itemIndex) => {
  //   const updatedData = [...filteredData];
  //   if (itemIndex >= 0 && itemIndex < updatedData.length) {
  //     updatedData[itemIndex].quantity += 1;
  //     setFilteredData(updatedData);
  //   }
  // };

  // const handleDecrement = (itemIndex) => {
  //   const updatedData = [...filteredData];
  //   if (updatedData[itemIndex].quantity > 0) {
  //     updatedData[itemIndex].quantity -= 1;
  //     setFilteredData(updatedData);
  //   }
  // };
  const [cartItems, setCartItems] = useState({
    detail1: {},
    detail2: [],
  });
  // const handleIncrement = (itemIndex) => {
  //   const updatedData = [...filteredData];
  //   updatedData[itemIndex].quantity += 1;
  //   setFilteredData(updatedData);
  // };

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
    console.log(id);
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
      itemid: TItmId,
      itemDec: TItmDsc,
      purRate: TPurRat,
      saleRate: TSalRat,
      disRate: itmdis,
      qty: quantity,
      orderid: id,
      userid: 33,
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
  return (
    // <div className="col-12">
    <>
      {/* <Header id={id}/> */}
      <Header id={id} screen="OrderCategory" />

      <PathHead
        pageName="Transaction > Order > Category"
        screen="Get_Item"
        pageLink="/Order_Number"
      />

      <br />
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          backgroundColor: "white",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <Row>
          {/* <Col xs={12} sm={4} md={4} lg={4} xl={2}>
                <Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: primaryColor,
                    fontSize: '11px',
                    color: secondaryColor,
                    width: '100%',
                    marginBottom: '10px',
                  }}
                  onClick={handleMenuItemClick}
                >
                  ADD
                </Button>
              </Col> */}

          <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 8 }}>
            <Form.Control
              type="text"
              placeholder="Search..."
              className="form-control"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              // value={filterValue}
              // onChange={(e) => setFilterValue(e.target.value)}
            />
          </Col>
          <Col xs={12} sm={3} md={3} lg={3} xl={{ span: 2 }}>
            <Form.Control
              as="select"
              name="FCtgStss"
              style={{ height: "35px", width: "130px", fontWeight: "bold" }}
              onChange={handleChangeView}
            >
              <option value="card">Category Card</option>

              <option value="table">Category List</option>
              <option value="Item_tbl">Item List</option>
              <option value="Item_card">Item Card</option>
            </Form.Control>
          </Col>
        </Row>

          {view === "card" ? (
          <div
            className="card-container" // Add this class to the container div
            style={{
              // Your existing styles for the container div

              overflowX: "hidden", // Hide horizontal overflow
              overflowY: "auto",
              maxHeight: "61vh",
            }}
          >
            <div>
              <div
                className="cards" // Add this class to the cards container
                style={{
                  fontSize: "12px",
                  width: "100%",

                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {data
                  .filter((item) =>
                    item.tctgdsc
                      .toLowerCase()
                      .includes(filterValue.toLowerCase())
                  )
                  .filter((item) => item.tctgsts === "Yes") // Filter based on tctgsts
                  .map((item) => (
                    <Card
                      key={item.tctgid}
                      sx={{
                        maxWidth: 345,
                        margin: "8px",
                        width: "15%", // Set the width of each card
                        height: "190px", // Set the height of each card
                      }}
                    >
                      <CardContent
                        style={{
                          backgroundColor: primaryColor,
                          color: secondaryColor,
                          height: "49px",
                        }}
                      >
                        <Typography
                          gutterBottom
                          component="div"
                          style={{
                            fontSize: "18px",
                            textAlign: "center",
                            fontWeight: "bold",
                          }}
                        >
                          {item.tctgdsc}
                        </Typography>
                      </CardContent>
                      <Link to={`/Order_Item/${item.tctgid}/${id}`}>
                        <CardMedia
                          component="img"
                          height="140"
                          image={imageurl + item.tctgpic}
                          alt="Category"
                        />
                      </Link>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        ) : view === "table" ? (
          <div
            style={{
              fontSize: "12px",
              width: "50%",
              overflowX: "auto",
              marginLeft: "25%",
              marginRight: "25%",
            }}
          >
            <MDBTable
              scrollY
              maxHeight="400px"
              striped
              bordered
              small
              responsive
            >
              <MDBTableHead>
                <tr>
                  <th style={tableCellStyle}>ID</th>
                  <th style={tableCellStyle}>Index</th>
                  <th style={tableCellStyle}>Description</th>
                  <th style={tableCellStyle}>Remarks</th>
                  <th style={tableCellStyle}>Status</th>
                  <th style={tableCellStyle}>Picture</th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {data
                  .filter((item) =>
                    item.tctgdsc
                      .toLowerCase()
                      .includes(filterValue.toLowerCase())
                  )

                  .map((item) => (
                    <tr key={item.tctgid}>
                      <td>{item.tctgid}</td>
                      <td>{item.ctindexs}</td>
                      <td style={{ textAlign: "left" }}>{item.tctgdsc}</td>
                      <td style={{ textAlign: "left" }}>{item.remarks}</td>
                      <td>{item.tctgsts}</td>
                      <td style={{ width: "15%" }}>
                        <img
                          src={`${apiLinks}/ctgImg/${item.tctgpic}`}
                          alt="Category"
                          style={{ width: "50px", height: "auto" }}
                        />
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        ) : view === "Item_tbl" ? (
          <div
            style={{
              fontSize: "12px",
              width: "80%",
              overflowX: "auto",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <MDBTable
              scrollY
              maxHeight="25rem"
              striped
              bordered
              small
              responsive
            >
              {/* <MDBTableHead columns={data.columns} /> */}
              <MDBTableHead>
                <tr>
                  {data1.columns.map((column, columnIndex) => (
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
                {data1.rows

                  .filter((item) =>
                    item.TItmDsc.toLowerCase().includes(
                      filterValue.toLowerCase()
                    )
                  )

                  .map((row, index) => (
                    <tr key={index}>
                      {Object.keys(row).map((key, columnIndex) => {
                        if (columnIndex === 11) {
                          // Skip rendering these columns
                          return null;
                        }

                        return (
                          <td
                            key={key}
                            style={{
                              textAlign:
                                columnIndex === 1 || columnIndex === 3
                                  ? "left"
                                  : columnIndex === 2
                                  ? "right"
                                  : "center",

                              width: columnIndex === 1 ? "17%" : "auto",
                            }}
                          >
                            {key === "tusrpwd" ? "*****" : row[key]}
                          </td>
                        );
                      })}
                      <td>
                        <img
                          src={imageurlitm + row.TItmPic}
                          alt="Category"
                          style={{ width: "50px", height: "auto" }}
                        />
                      </td>
                    </tr>
                  ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        ) : view === "Item_card" ? (
          <div
            className="container"
            style={{
              marginLeft: "5%",
              marginRight: "5%",
              overflowX: "hidden", // Hide horizontal overflow
              overflowY: "auto",
              maxHeight: "67vh",
            }}
          >
            <div className="row">
              {data1.rows
                .filter((item) =>
                  item.TItmDsc.toLowerCase().includes(filterValue.toLowerCase())
                )
                .map((row, index) => (
                  <div className="col-md-3" key={index}>
                    <div className="card mb-3">
                      <img
                        style={{ variant: "top", height: "150px" }}
                        src={imageurlitm + row.TItmPic}
                        className="card-img-top"
                        alt="Category"
                      />
                      <div className="card-body">
                        {/* <Card.Title style={{ fontSize: '17px', fontWeight: 'bold', height: '40px' }}>{row.TItmDsc}</Card.Title> */}
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "bold",
                            height: "40px",
                          }}
                        >
                          {row.TItmDsc}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "11px",
                          }}
                        >
                          <Typography
                            gutterBottom
                            component="div"
                            style={{ fontSize: "13px" }}
                          >
                            UOM:
                          </Typography>
                          <Typography
                            gutterBottom
                            component="div"
                            style={{ fontSize: "13px" }}
                          >
                            {row.uom}
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontSize: "11px",
                          }}
                        >
                          <Typography
                            gutterBottom
                            component="div"
                            style={{ fontSize: "13px" }}
                          >
                            Sale Rate:
                          </Typography>
                          <Typography
                            gutterBottom
                            component="div"
                            style={{ fontSize: "13px" }}
                          >
                            {row.TSalRat}
                          </Typography>
                        </div>
                        <div
                          style={{
                            borderTop: "1px solid #e0e0e0",
                            padding: "8px",
                            marginTop: "auto",
                            height: "60px",
                          }}
                        >
                          <CardActions
                            style={{ justifyContent: "space-between" }}
                          >
                            <Button
                              variant="contained"
                              style={{
                                width: "130px",
                                height: "30px",
                                fontSize: "9px",
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                marginRight: "10px",
                                minWidth: "0",
                                padding: "0",
                              }}
                              onClick={() => handleAddToCart(row)}
                            >
                              Add to Cart
                            </Button>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Button
                                variant="contained"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                  minWidth: "0",
                                  padding: "0",
                                }}
                                onClick={() => handleDecrement(index)}
                              >
                                -
                              </Button>
                              <TextField
                                value={
                                  row.quantity !== undefined
                                    ? row.quantity
                                    : 1.0
                                } // Display the current quantity
                                style={{
                                  width: "50px",
                                  fontSize: "11px",
                                  marginRight: "10px",
                                }}
                                onChange={(e) =>
                                  handleQuantityChange(index, e.target.value)
                                }
                              />
                              <Button
                                variant="contained"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                  minWidth: "0",
                                  padding: "0",
                                }}
                                onClick={() => {
                                  if (row.quantity !== undefined) {
                                    handleIncrement(index);
                                  }
                                }}
                              >
                                +
                              </Button>
                            </div>
                          </CardActions>
                        </div>

                        {/* <div style={{ borderTop: '1px solid #e0e0e0', padding: '8px', marginTop: 'auto' ,height:'60px'}}>
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
  <TextField
  value={row.quantity !== undefined ? row.quantity.toFixed(2).toString() : ''} // Format the value to two decimal places and convert to a string
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
                      </div> */}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </div>

      <Footer />
    </>
  );
};

export default Order_Category;
