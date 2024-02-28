import React, { useState, useEffect, useRef } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
// import "../Purchase/Purchase.css";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import Bin from "../../../image/bin.png";
function CashReceiptVoucher() {
  const [values, setValues] = useState({
    itmIdd: "",
    itemCodd: "", // Initialize itemCodd here or set it to a default value
    itemDscc: "",
    itemRmkss: "",
    typee: "",
    pic: "",
    loading: false,
  });

  const lastInputRef = useRef(null);

  const navigate = useNavigate();
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();
  const { primaryColor } = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmountt, setTotalAmount] = useState(0);
  const [Length, setLength] = useState("");

  {
    /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
  }
  const responseData = {
    // detail1: [],
    detail1: [],
  };

  const handleInputChange2 = (event) => {
    const { name, value } = event.target;

    // Assuming that 'itemdata' is an array containing your account data
    const selectedAccount = itemdata.find((item) => item.acccode === value);

    // If an account is found, update the state with its description
    if (selectedAccount) {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        itemDscc: selectedAccount.accdsc, // Update the description field
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
        itemDscc: "", // Reset the description if the account is not found
      }));
    }

    // You can add other necessary logic here
  };
  const [getUser, setUser] = useState();

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      setUser(userData);
      console.log(userData);
      console.log("user id is", userData.userid); // Updated to access the 'id' property
    } else {
      const redirectTimer = setTimeout(() => {
        navigate("/login");
      }, 100);

      return () => clearTimeout(redirectTimer);
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  const [selectedMOPId, setSelectedMOPId] = useState();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      // Prepare the data to be sent in the request
      const requestData = {
        // purchaseid: nextItemId,
        modepay: selectedMOPId,
        shift: getUser.shfid,
        userid: getUser.id,
        // codedescription: values.itemDscc,
        remarks: values.itemRmkss,
        // totalAmount: totalAmountt,

        detail1: tableData.map((item) => ({
          acctCode: item.name,
          desc: item.Desctiption,
          amount: item.Amount,
        })),
      };

      const response = await axios.post(
        `${apiLinks}/CashReceiptVoucher.php`,
        JSON.stringify(requestData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log(response);
      console.log(requestData);

      if (response.data.error === 200) {
        // navigate("/MainPage");
        console.log(response.data.message);
        setAlertData({
          type: "success",
          message: `${response.data.message}`,
        });
        setTimeout(() => {
          setAlertData(null);
          // window.location.reload();
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
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  const calculateTotals = () => {
    let quantityTotal = 0;
    let amountTotal = 0;

    tableData.forEach((rowData) => {
      const quantity = parseFloat(rowData.quantity || 0);
      const purchase = parseFloat(rowData.Purchase || 0);
      quantityTotal += quantity;
      amountTotal += quantity * purchase;
    });

    setTotalQuantity(quantityTotal);
    // Format the amount with commas using toLocaleString
    setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
  };

  ////////////////////////get item id show them in inout field//////////////////////////
  const [item, setItem] = useState([]);
  const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetAccount.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setItem(apiData);
        setLength(apiData.length);

        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(...apiData.map((item) => parseInt(item.id)));
        // Set the nextItemId to be one greater than the maximum TItmId
        setNextItemId(maxItemId + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [tableData, setTableData] = useState([
    { name: "", quantity: "", Purchase: "", Amount: "" },
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
    calculateTotals();
    // Calculate the "amount" based on "quantity" and "purchase"
    if (name === "quantity" || name === "purchase") {
      const quantity = parseFloat(newData[index].quantity || 0);
      const purchase = parseFloat(newData[index].Purchase || 0);
      newData[index].Amount = (quantity * purchase).toFixed(2);
    }

    setTableData(newData);
  };

  const calculateAmount = (quantity, Purchase) => {
    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedPurchase = parseFloat(Purchase) || 0;
    return (parsedQuantity * parsedPurchase).toFixed(2);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { name: "", quantity: "", price: "" }]);
  };

  const [itemdata, setitemdata] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);

  useEffect(() => {
    // Filter the itemdata array based on TItmDsc and searchText
    const filteredData = itemdata.filter((item) =>
      item.accdsc.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItemData(filteredData);
  }, [searchText, itemdata]);
  useEffect(() => {
    fetch(`${apiLinks}/GetAccount.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          acccode: item.acccode,
          accdsc: item.accdsc,
        }));

        setitemdata(transformedData);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  // Modify the handleInputChange1 function to handle item selection and update the first row
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];

    if (name === "name") {
      const selectedItem = itemdata.find((item) => item.acccode === value);

      if (selectedItem) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: selectedItem.acccode,
          Desctiption: selectedItem.accdsc,
          Unit: selectedItem.uom,
          Purchase: selectedItem.TPurRat,
          Amount: calculateAmount(
            updatedTableData[rowIndex].quantity,
            selectedItem.TPurRat
          ),
        };
      }
    } else {
      updatedTableData[rowIndex] = {
        ...updatedTableData[rowIndex],
        [name]: value,
      };

      if (name === "quantity" || name === "Purchase") {
        const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
        const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
        updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
      }
    }

    setTableData(updatedTableData);
    calculateTotals();
  };

  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  // Add event listeners to the input fields of the last row
  const addNewRow = () => {
    setTableData([...tableData, { name: "", Purchase: "", Amount: "" }]);
  };

  const handleDeleteRow = (index) => {
    // Create a copy of the tableData array
    const updatedTableData = [...tableData];
    // Remove the row at the specified index
    const deletedRow = updatedTableData.splice(index, 1)[0];

    // Update the state with the modified data
    setTableData(updatedTableData);

    // Recalculate the totalQuantity and totalAmount
    const newTotalQuantity = totalQuantity - deletedRow.quantity;
    const newTotalAmount =
      totalAmountt - deletedRow.quantity * deletedRow.Purchase;
    setTotalQuantity(newTotalQuantity);
    setTotalAmount(newTotalAmount);
  };

  // Create refs for each input field
  const USEREF1 = useRef(null);
  const USEREF2 = useRef(null);
  const USEREF3 = useRef(null);
  const USEREF4 = useRef(null);
  const USEREF5 = useRef(null);
  const USEREF6 = useRef(null);
  const USEREF7 = useRef(null);
  const USEREF8 = useRef(null);
  const USEREF9 = useRef(null);
  const buttonRef = useRef(null);

  // Function to focus on the next input field
  const focusNextInput = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleEnterKeyPress = (ref, e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }

      const jsonData = JSON.stringify(tableData, null, 2);
      console.log(jsonData);
    }
    // addNewRow();
  };

  useEffect(() => {
    const newTotalAmount = tableData.reduce((total, rowData) => {
      return total + (parseFloat(rowData.Amount) || 0);
    }, 0);

    setTotalAmount(newTotalAmount);
  }, [tableData]);
  const handleMOPChange = (e) => {
    setSelectedMOPId(e.target.value);
  };

  const [getMOP, setDataMOP] = useState([]);
  // const [selectedOrder, setSelectedOrderType] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_payment_mode.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setDataMOP(apiData);

        // if (apiData.length > 0) {
        //   setSelectedMOPId(apiData[0].paydsc);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const thStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
    border: "1px solid #000",
  };

  const commonCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    border: "1px solid #000",
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
        <PathHead
          pageName="Transaction > Cash Receive Voucher"
          screen="Get_Item"
          pageLink="/MainPage"
        />

        <div className="col-12">
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
                padding: "5px",
                width: "100%",
                maxWidth: "53%",
                margin: "2% 0",
                border: "1px solid black",
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <form
                onSubmit={handleFormSubmit}
                style={{
                  textAlign: "right",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginLeft: "1%",
                  height: "29rem",
                }}
              >
                <div className="form-group">
                  <div className="row">
                    <div className="col-6">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <Form.Group
                                controlId="description"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                  marginRight: "10px",
                                }}
                              >
                                <Form.Label>Purchase#:</Form.Label>
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group
                                controlId="description"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  type="text"
                                  id="code"
                                  placeholder=" Id"
                                  name="itmIdd"
                                  className="form-control"
                                  value={nextItemId} // Display the nextItemId
                                  style={{
                                    height: "24px",
                                    width: "60px",
                                    textAlign: "right",
                                  }}
                                  readOnly // Make the input read-only to prevent user edits
                                />
                              </Form.Group>
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <label htmlFor="required">MOP :</label>
                            </td>
                            <td>
                              <Form.Group
                                controlId="status"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginRight: "10px",
                                }}
                              >
                                <Form.Control
                                  as="select"
                                  name="categoryIdd"
                                  onChange={handleMOPChange}
                                  id="categoryIdd"
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF2, e)
                                  }
                                  ref={USEREF1}
                                  style={{
                                    height: "27px",
                                    fontSize: "11px",
                                  }}
                                  className="form-control"
                                >
                                  <option value="">Select Payment</option>

                                  {getMOP.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.paydsc}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>
                            </td>

                            <td></td>
                          </tr>
                          <tr>
                            <td>
                              <Form.Group
                                controlId="Remarks"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                  marginRight: "10px",
                                }}
                              >
                                <Form.Label>Remarks:</Form.Label>
                              </Form.Group>
                            </td>
                            <td>
                              {" "}
                              <Form.Group
                                controlId="Remarks"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  type="text"
                                  id="code"
                                  placeholder="Remarks  "
                                  name="itemRmkss"
                                  className="form-control"
                                  value={values.itemRmkss}
                                  style={{ height: "24px", fontSize: "12px" }}
                                  onChange={handleInputChange2}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF3, e)
                                  }
                                  ref={USEREF2}
                                />
                              </Form.Group>{" "}
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-12 firsttable-container"
                      // style={{width:'140%',height:'250px',fontSize:'11px'}}
                    >
                      <br />
                      <br />
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <MDBTable
                          responsive
                          striped
                          bordered
                          hover
                          maxHeight="19rem"
                        >
                          <MDBTableHead>
                            <tr>
                              <th style={{ ...thStyle, width: "1%" }}>Sr.</th>
                              <th style={{ ...thStyle, width: "15%" }}>
                                {" "}
                                Account Code
                              </th>
                              <th style={{ ...thStyle, width: "25%" }}>
                                Description
                              </th>

                              <th style={{ ...thStyle, width: "16%" }}>
                                Credit Amt
                              </th>
                              <th style={{ ...thStyle, width: "6%" }}>
                                Delete
                              </th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            {tableData.map((rowData, index) => (
                              <tr key={index}>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                    textAlign: "center",
                                  }}
                                >
                                  {index + 1}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                    textAlign: "center",
                                  }}
                                >
                                  <input
                                    type="text"
                                    name="name"
                                    placeholder="ID"
                                    onChange={(e) =>
                                      handleInputChange1(e, index)
                                    }
                                    style={{
                                      width: "100%",
                                      border: "none",
                                      backgroundColor: "transparent",
                                      textAlign: "center",
                                    }}
                                    onKeyDown={(e) =>
                                      handleEnterKeyPress(USEREF4, e)
                                    }
                                    ref={USEREF3}
                                  />
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                    textAlign: "center",
                                    width: "33%",
                                  }}
                                >
                                  <input
                                    type="text"
                                    name="Desctiption"
                                    placeholder="Description"
                                    value={rowData.Desctiption}
                                    onChange={(e) =>
                                      handleInputChange1(e, index)
                                    }
                                    style={{
                                      width: "100%",
                                      border: "none",
                                      backgroundColor: "transparent",
                                      textAlign: "left",
                                    }}
                                    onKeyDown={(e) =>
                                      handleEnterKeyPress(USEREF5, e)
                                    }
                                    ref={USEREF4}
                                  />
                                </td>

                                <td
                                  style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                    textAlign: "center",
                                    background: "#f5f5f5",
                                  }}
                                >
                                  <input
                                    type="text"
                                    name="Amount"
                                    placeholder="Amount"
                                    value={rowData.Amount.toLocaleString()}
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                    style={{
                                      width: "100%",
                                      border: "none",
                                      backgroundColor: "transparent",
                                      textAlign: "right",
                                    }}
                                    onKeyDown={(e) => {
                                      handleEnterKeyPress(USEREF4, e);

                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        addNewRow();
                                        if (lastInputRef.current) {
                                          lastInputRef.current.focus();
                                        }
                                      }
                                    }}
                                    ref={USEREF5}
                                  />
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #000",
                                    padding: "8px",
                                    textAlign: "center",
                                    background: "#f5f5f5",
                                  }}
                                >
                                  {/* Ensure the delete button is not rendered for the first row */}
                                  {index === 0 ? (
                                    <span>&nbsp;</span>
                                  ) : (
                                    <img
                                      onClick={() => handleDeleteRow(index)}
                                      src={Bin}
                                      alt="delete"
                                      style={{
                                        cursor: "pointer",
                                        width: "18px",
                                        height: "auto",
                                      }}
                                    />
                                  )}
                                </td>
                              </tr>
                            ))}
                            {Array.from({
                              length: Math.max(0, 6 - tableData.length),
                            }).map((_, index) => (
                              <tr key={`blank-${index}`}>
                                {Array.from({ length: 5 }).map(
                                  (_, colIndex) => (
                                    <td key={`blank-${index}-${colIndex}`}>
                                      &nbsp;
                                    </td>
                                  )
                                )}
                              </tr>
                            ))}
                          </MDBTableBody>

                          <MDBTableFoot
                            style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                          >
                            <tr>
                              <td style={commonCellStyle}></td>
                              <td style={commonCellStyle}></td>
                              <td style={commonCellStyle}></td>
                              <td
                                style={{
                                  ...commonCellStyle,
                                  position: "sticky",
                                }}
                              >
                                {totalAmountt || ".00"}
                              </td>
                              <td style={commonCellStyle}></td>
                            </tr>
                          </MDBTableFoot>
                        </MDBTable>
                      </div>
                    </div>
                  </div>

                  {/* ////////////////////////////////  BUTTON ////////////////////////// */}
                  <br />
                  <br />
                  <br />
                  <br />
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="btn btn-primary"
                      style={{
                        backgroundColor: primaryColor,
                        height: "27px",
                        fontSize: "11px",
                        color: secondaryColor,
                        width: "20%",
                      }}
                      onClick={handleFormSubmit}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CashReceiptVoucher;
