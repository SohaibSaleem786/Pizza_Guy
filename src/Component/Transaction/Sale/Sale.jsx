import React, { useState, useEffect, useRef } from "react";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import "../Purchase/Purchase.css";
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

function Sale() {
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
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [selectedUnit, setSelectedUnit] = useState("Quantity");

  const [data, setData] = useState([]);

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor } = useTheme();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [getPurchase, setPurchase] = useState();
  const [Length, setLength] = useState("");

  // const handleEnterKeyPress = (event, currentIndex) => {
  //   if (event.key === "Enter") {
  //     // Check if Enter is pressed in the last input field
  //     if (currentIndex === tableData.length - 1) {
  //       addNewRow(); // Add a new row
  //       // Set focus on the first input field of the new row
  //       if (lastInputRef.current) {
  //         lastInputRef.current.focus();
  //       }
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedCategoryId(apiData[0].tctgid);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const UserId = 33;

  {
    /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
  }
  const responseData = {
    // detail1: [],
    detail1: [],
  };

  const handleInputChange2 = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      // Prepare the data to be sent in the request
      const requestData = {
        purchaseid: nextItemId,
        codeid: values.itemCodd,
        codedescription: values.itemDscc,
        remarks: values.itemRmkss,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        type: "Sale",

        detail1: tableData.map((item) => ({
          item_id: item.name,
          description: item.Desctiption,
          quantity: item.quantity,
          purchase_rate: item.Purchase,
          amount: item.Amount,
          unit: item.Unit,
        })),
      };

      const response = await axios.post(
        `${apiLinks}/Purchase.php`,
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
          window.location.reload();
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
  
  // const calculateTotals = () => {
  //   let quantityTotal = 0;
  //   let amountTotal = 0;
  //   tableData.forEach((rowData) => {
  //     const quantity = parseFloat(rowData.quantity || 0);
  //     const purchase = parseFloat(rowData.Purchase || 0);
  //     quantityTotal += quantity;
  //     amountTotal += quantity * purchase;
  //   });
  //   setTotalQuantity(quantityTotal);
  //   setTotalAmount(amountTotal.toFixed(2));
  // };
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
        const response = await fetch(`${apiLinks}/get_item.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setItem(apiData);
        setLength(apiData.length);

        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(
          ...apiData.map((item) => parseInt(item.TItmId))
        );
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

  const handleRemoveRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };
  const [itemdata, setitemdata] = useState([]);

  const columns = [
    { label: " ID", field: "TItmId" },
    { label: "Description", field: "TItmDsc" },
    { label: "Unit", field: "uom" },
    { label: "Cost", field: "TPurRat" },
  ];
  const [searchText, setSearchText] = useState("");
  const [filteredItemData, setFilteredItemData] = useState([]);

  useEffect(() => {
    // Filter the itemdata array based on TItmDsc and searchText
    const filteredData = itemdata.filter((item) =>
      item.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItemData(filteredData);
  }, [searchText, itemdata]);

  useEffect(() => {
    fetch(`${apiLinks}/get_item.php`)
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          TItmId: item.TItmId,
          TItmDsc: item.TItmDsc,
          uom: item.uom,
          TPurRat: item.TPurRat,
        }));

        setitemdata(transformedData);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const [selectedItemData, setSelectedItemData] = useState({
    TItmId: "",
    TItmDsc: "",
    TPurRat: "",
    uom: "",
  });

  // Add the following state variables at the beginning of your component
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  // Modify the handleInputChange1 function to handle item selection and update the first row
  const handleInputChange1 = (event, rowIndex) => {
    const { name, value } = event.target;
    const updatedTableData = [...tableData];

    if (name === "name") {
      const selectedItem = itemdata.find((item) => item.TItmId === value);

      if (selectedItem) {
        updatedTableData[rowIndex] = {
          ...updatedTableData[rowIndex],
          name: selectedItem.TItmId,
          Desctiption: selectedItem.TItmDsc,
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
    setTableData([
      ...tableData,
      { name: "", quantity: "", Purchase: "", Amount: "" },
    ]);
  };

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const handleRowClick = (rowData, rowIndex) => {
    // Create a copy of the current tableData
    const updatedTableData = [...tableData];

    // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
    if (rowIndex >= 0 && rowIndex < "100000000") {
      updatedTableData[updatedTableData.length - 1] = {
        ...updatedTableData[updatedTableData.length - 1],
        name: rowData.TItmId,
        Desctiption: rowData.TItmDsc,
        Unit: rowData.uom,
        Purchase: rowData.TPurRat,
        Amount: calculateAmount(
          updatedTableData[updatedTableData.length - 1].quantity,
          rowData.TPurRat
        ),
      };
    }

    // Update the state with the modified tableData
    setTableData(updatedTableData);
    calculateTotals();
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
      totalAmount - deletedRow.quantity * deletedRow.Purchase;
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
  
    // Function to handle Enter key press
    const handleEnterKeyPress = (ref, e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission on Enter key press
        focusNextInput(ref);
      }
    };





    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const rowHeight = 40; // Set this value based on your actual row height
  
  // Calculate the number of rows based on 70% of the viewport height
  const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);
  
  // Generate the rows dynamically
  const blankRows = Array.from({ length: Math.max(0, numberOfRows - filteredItemData.length) }).map((_, index) => (
    <tr key={`blank-${index}`}>
      {Array.from({ length: 4 }).map((_, colIndex) => (
        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
      ))}
    </tr>
  ));
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
          pageName="Transaction > Sale"
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
                maxWidth: "83%",
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
                              {" "}
                              <Form.Group
                                controlId="Code"
                                style={{
                                  display: "flex",
                                  alignItems: "flex-end",
                                  justifyContent: "flex-end",
                                  marginRight: "10px",
                                }}
                              >
                                <Form.Label>Code:</Form.Label>
                              </Form.Group>{" "}
                            </td>
                            <td>
                              {" "}
                              <Form.Group
                                controlId="Code"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  type="text"
                                  id="code"
                                  placeholder="Cash / Supplier"
                                  name="itemCodd"
                                  className="form-control"
                                  value={values.itemCodd}
                                  style={{ height: "24px" }}
                                  onChange={handleInputChange2}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF2, e)
                                  }
                                  ref={USEREF1}

                                />
                              </Form.Group>{" "}
                            </td>
                            <td>
                              {" "}
                              <Form.Group
                                controlId="Code"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Form.Control
                                  type="text"
                                  id="code"
                                  placeholder="Code Description"
                                  name="itemDscc"
                                  className="form-control"
                                  value={values.itemDscc}
                                  style={{ height: "24px" }}
                                  onChange={handleInputChange2}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF3, e)
                                  }
                                  ref={USEREF2}
                                />
                              </Form.Group>{" "}
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
                                    handleEnterKeyPress(USEREF4, e)
                                  }
                                  ref={USEREF3}
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
                      className="col-8 firsttable-container"
                      // style={{width:'140%',height:'250px',fontSize:'11px'}}
                    >
                      <br />
                      <br />
                      <MDBTable
                        responsive
                        striped
                        bordered
                        hover
                        maxHeight="19rem"
                      >
                        <MDBTableHead>
                          <tr>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                              }}
                            >
                              Sr.
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "9%",
                              }}
                            >
                              {" "}
                              ID
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                width: "20%",
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                                width: "25%",
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
                                border: "1px solid #000",
                              }}
                            >
                              Unit
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                              }}
                            >
                              Purchase
                            </th>

                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                              }}
                            >
                              Quantity
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                              }}
                            >
                              Amount
                            </th>
                            <th
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                top: -1,
                                zIndex: 1,
                                border: "1px solid #000",
                              }}
                            >
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
                                  value={rowData.name}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF8, e)
                                  }
                                  ref={USEREF4}
                                  // ref={index === tableData.length - 1 ? lastInputRef : null}
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
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "left",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF6, e)
                                  // }
                                  // ref={USEREF5}
                                />
                              </td>
                              <td
                                style={{
                                  border: "1px solid #000",
                                  padding: "8px",
                                  textAlign: "center",
                                  width: "12%",
                                }}
                              >
                                <input
                                  type="text"
                                  name="Unit"
                                  placeholder="Unit"
                                  value={rowData.Unit}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF7, e)
                                  // }
                                  // ref={USEREF6}
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
                                  type="number"
                                  name="Purchase"
                                  placeholder="Purchase"
                                  value={rowData.Purchase}
                                  onChange={(e) => handleInputChange1(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  // onKeyDown={(e) =>
                                  //   handleEnterKeyPress(USEREF8, e)
                                  // }
                                  // ref={USEREF7}
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
                                  type="number"
                                  name="quantity"
                                  placeholder="Quantity"
                                  value={rowData.quantity}
                                  onChange={(e) => handleInputChange(e, index)}
                                  onBlur={(e) => {
                                    const inputValue = parseFloat(
                                      e.target.value
                                    );
                                    if (!isNaN(inputValue)) {
                                      // Convert the value to a string with two decimal places
                                      e.target.value = inputValue.toFixed(2);
                                    }
                                  }}
                                  
                                  ref={USEREF8}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleEnterKeyPress(USEREF9, e)

                                      e.preventDefault();
                                      addNewRow();
                                      if (lastInputRef.current) {
                                        lastInputRef.current.focus();
                                      }
                                    }
                                  }}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "center",
                                  }}
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
                                  type="text" // Change type to "text" to display formatted number
                                  name="Amount"
                                  placeholder="Amount"
                                  value={rowData.Amount.toLocaleString()}
                                  onChange={(e) => handleInputChange(e, index)}
                                  style={{
                                    width: "100%",
                                    border: "none",
                                    backgroundColor: "transparent",
                                    textAlign: "right",
                                  }}
                                  onKeyDown={(e) =>
                                    handleEnterKeyPress(USEREF4, e)
                                  }
                                  ref={USEREF9}
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
                                <img
                                  onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
                                  src={Bin}
                                  alt="delete"
                                  style={{
                                    cursor: "pointer",
                                    width: "18px",
                                    height: "auto",
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                          {Array.from({
                            length: Math.max(0, 6 - tableData.length),
                          }).map((_, index) => (
                            <tr key={`blank-${index}`}>
                              {Array.from({ length: 8 }).map((_, colIndex) => (
                                <td key={`blank-${index}-${colIndex}`}>
                                  &nbsp;
                                </td>
                              ))}
                            </tr>
                          ))}
                        </MDBTableBody>
                        <MDBTableFoot
                          style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                        >
                          <tr>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                              {totalQuantity}
                            </td>

                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                position: "sticky",
                                border: "1px solid #000",
                              }}
                            >
                              {totalAmount || ".00"}
                            </td>
                            <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                          </tr>
                        </MDBTableFoot>
                      </MDBTable>
                    </div>

                    <div className="col-4 Secondtable-container">
                      <Row>
                        <Col
                          xs={12}
                          sm={4}
                          md={4}
                          lg={4}
                          xl={{ span: 5, offset: 7 }}
                        >
                          <Form.Control
                            type="text"
                            style={{ height: "30px" }}
                            placeholder="Item Description"
                            value={searchText}
                            onChange={handleSearchChange}
                          />
                        </Col>
                      </Row>
                      <MDBTable
                        scrollY
                        maxHeight="20rem"
                        striped
                        bordered
                        small
                        responsive
                      >
                        <MDBTableHead>
                          <tr>
                            {columns.map((column, index) => (
                              <th
                                style={{
                                  backgroundColor: primaryColor,
                                  color: secondaryColor,
                                  fontWeight: "bold",
                                  position: "sticky",
                                  top: -1,
                                  zIndex: 1,
                                }}
                                key={index}
                              >
                                {column.label}
                              </th>
                            ))}
                          </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                          {filteredItemData.map((row, rowIndex) => (
                            <tr
                              key={rowIndex}
                              onClick={() => handleRowClick(row, rowIndex)}
                              style={{
                                cursor: "pointer",
                                backgroundColor:
                                  rowIndex === selectedRowIndex
                                    ? "lightgray"
                                    : "white",
                              }}
                            >
                              {columns.map((column, colIndex) => (
                                <td
                                  key={colIndex}
                                  style={{
                                    textAlign:
                                      colIndex === 1 ? "left" : "center",
                                  }}
                                >
                                  {row[column.field]}
                                </td>
                              ))}
                            </tr>
                          ))}

                           {blankRows}
                        </MDBTableBody>
                        <MDBTableFoot
                          style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                        >
                          <tr>
                          <td
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            >
                            {Length}

                            </td>
                            <td
                            colSpan={3}
                              style={{
                                backgroundColor: primaryColor,
                                color: secondaryColor,
                                fontWeight: "bold",
                                border: "1px solid #000",
                              }}
                            ></td>
                            
                          </tr>
                        </MDBTableFoot>
                      </MDBTable>
                    </div>
                  </div>

                  <br />
                  <br />
                  <br />
                  <tr>
                    <td></td>
                    <td>
                      <button
                        className="btn btn-primary"
                        style={{
                          backgroundColor: primaryColor,
                          height: "27px",
                          fontSize: "11px",
                          color: secondaryColor,
                          width: "100%",
                          marginRight: "1%",
                        }}
                        onClick={handleFormSubmit}
                      >
                        SUBMIT
                      </button>
                    </td>
                  </tr>

                  {/* ////////////////////////////////  BUTTON ////////////////////////// */}
                  <br />
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

export default Sale;



// import React, { useState, useEffect, useRef } from "react";
// import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
// import axios from "axios";
// import { useTheme } from "../../../ThemeContext";
// import { Link, useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
// import PathHead from "../../MainComponent/PathHead/PathHead";
// import Header from "../../MainComponent/Header/Header";
// import Footer from "../../MainComponent/Footer/Footer";
// import "../Purchase/Purchase.css";
// import {
//   Card,
//   Row,
//   Col,
//   Button,
//   FormControl,
//   InputGroup,
//   Form,
//   Nav,
//   Modal,
//   Spinner,
// } from "react-bootstrap";
// import Bin from "../../../image/bin.png";

// function Sale() {
//   const [values, setValues] = useState({
//     itmIdd: "",
//     itemCodd: "", // Initialize itemCodd here or set it to a default value
//     itemDscc: "",
//     itemRmkss: "",
//     typee: "",
//     pic: "",
//     loading: false,
//   });
//   const SaleNo = useRef(null);
//   const Customer = useRef(null);
//   const Status = useRef(null);
//   const Company = useRef(null);
//   const Category = useRef(null);
//   const Capacity = useRef(null);
//   const Type = useRef(null);
//   const Purchase = useRef(null);
//   const SaleMan = useRef(null);
//   const MRP = useRef(null);
//   const Sale = useRef(null);
//   const Fix = useRef(null);
//   const Submit = useRef(null);
//   const lastInputRef = useRef(null);

//   const navigate = useNavigate();
//   const [selectedStatus, setSelectedStatus] = useState("Yes");
//   const [selectedStatus1, setSelectedStatus1] = useState("");
//   const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
//   const [alertData, setAlertData] = useState(null);
//   const { secondaryColor, apiLinks } = useTheme();

//   const [selectedType, setSelectedType] = useState("Item Purchase");
//   const [selectedUnit, setSelectedUnit] = useState("Quantity");

//   const [data, setData] = useState([]);

//   const [alert, setAlert] = useState(null);
//   const [selectedImage1, setSelectedImage1] = useState(null);
//   const { primaryColor } = useTheme();
//   const [totalQuantity, setTotalQuantity] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [getPurchase, setPurchase] = useState();
//   const [Length, setLength] = useState("");

//   // const handleEnterKeyPress = (event, currentIndex) => {
//   //   if (event.key === "Enter") {
//   //     // Check if Enter is pressed in the last input field
//   //     if (currentIndex === tableData.length - 1) {
//   //       addNewRow(); // Add a new row
//   //       // Set focus on the first input field of the new row
//   //       if (lastInputRef.current) {
//   //         lastInputRef.current.focus();
//   //       }
//   //     }
//   //   }
//   // };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_category.php`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         setData(apiData);

//         // Set the selectedCategoryId with the first category ID from the API data
//         if (apiData.length > 0) {
//           setSelectedCategoryId(apiData[0].tctgid);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);
//   const UserId = 33;

//   {
//     /* ////////////////////////  CALL API TO POST DATA ////////////////////////// */
//   }
//   const responseData = {
//     // detail1: [],
//     detail1: [],
//   };

//   const handleInputChange2 = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       // Prepare the data to be sent in the request
//       const requestData = {
//         purchaseid: nextItemId,
//         codeid: values.itemCodd,
//         codedescription: values.itemDscc,
//         remarks: values.itemRmkss,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         type: "Sale",

//         detail1: tableData.map((item) => ({
//           item_id: item.name,
//           description: item.Desctiption,
//           quantity: item.quantity,
//           purchase_rate: item.Purchase,
//           amount: item.Amount,
//           unit: item.Unit,
//         })),
//       };

//       const response = await axios.post(
//         `${apiLinks}/Purchase.php`,
//         JSON.stringify(requestData),
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       console.log(response);
//       console.log(requestData);

//       if (response.data.error === 200) {
//         // navigate("/MainPage");
//         console.log(response.data.message);
//         setAlertData({
//           type: "success",
//           message: `${response.data.message}`,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//           window.location.reload();
//         }, 1000);
//       } else {
//         console.log(response.data.message);

//         setAlertData({
//           type: "error",
//           message: `${response.data.message}`,
//         });
//         setTimeout(() => {
//           setAlertData(null);
//         }, 2000);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       setValues((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   // const calculateTotals = () => {
//   //   let quantityTotal = 0;
//   //   let amountTotal = 0;
//   //   tableData.forEach((rowData) => {
//   //     const quantity = parseFloat(rowData.quantity || 0);
//   //     const purchase = parseFloat(rowData.Purchase || 0);
//   //     quantityTotal += quantity;
//   //     amountTotal += quantity * purchase;
//   //   });
//   //   setTotalQuantity(quantityTotal);
//   //   setTotalAmount(amountTotal.toFixed(2));
//   // };
//   const calculateTotals = () => {
//     let quantityTotal = 0;
//     let amountTotal = 0;

//     tableData.forEach((rowData) => {
//       const quantity = parseFloat(rowData.quantity || 0);
//       const purchase = parseFloat(rowData.Purchase || 0);
//       quantityTotal += quantity;
//       amountTotal += quantity * purchase;
//     });

//     setTotalQuantity(quantityTotal);
//     // Format the amount with commas using toLocaleString
//     setTotalAmount(amountTotal.toLocaleString()); // Format the amount with commas
//   };

//   ////////////////////////get item id show them in inout field//////////////////////////
//   const [item, setItem] = useState([]);
//   const [nextItemId, setNextItemId] = useState(1); // Initialize the next TItmId

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${apiLinks}/get_item.php`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const apiData = await response.json();
//         setItem(apiData);
//         setLength(apiData.length);

//         // Find the maximum TItmId in the existing data
//         const maxItemId = Math.max(
//           ...apiData.map((item) => parseInt(item.TItmId))
//         );
//         // Set the nextItemId to be one greater than the maximum TItmId
//         setNextItemId(maxItemId + 1);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, []);

//   const [tableData, setTableData] = useState([
//     { name: "", quantity: "", Purchase: "", Amount: "" },
//   ]);

//   const handleInputChange = (event, index) => {
//     const { name, value } = event.target;
//     const newData = [...tableData];
//     newData[index][name] = value;
//     setTableData(newData);
//     calculateTotals();
//     // Calculate the "amount" based on "quantity" and "purchase"
//     if (name === "quantity" || name === "purchase") {
//       const quantity = parseFloat(newData[index].quantity || 0);
//       const purchase = parseFloat(newData[index].Purchase || 0);
//       newData[index].Amount = (quantity * purchase).toFixed(2);
//     }

//     setTableData(newData);
//   };

//   const calculateAmount = (quantity, Purchase) => {
//     const parsedQuantity = parseFloat(quantity) || 0;
//     const parsedPurchase = parseFloat(Purchase) || 0;
//     return (parsedQuantity * parsedPurchase).toFixed(2);
//   };

//   const handleAddRow = () => {
//     setTableData([...tableData, { name: "", quantity: "", price: "" }]);
//   };

//   const handleRemoveRow = (index) => {
//     const newData = [...tableData];
//     newData.splice(index, 1);
//     setTableData(newData);
//   };
//   const [itemdata, setitemdata] = useState([]);

//   const columns = [
//     { label: " ID", field: "TItmId" },
//     { label: "Description", field: "TItmDsc" },
//     { label: "Unit", field: "uom" },
//     { label: "Cost", field: "TPurRat" },
//   ];
//   const [searchText, setSearchText] = useState("");
//   const [filteredItemData, setFilteredItemData] = useState([]);

//   useEffect(() => {
//     // Filter the itemdata array based on TItmDsc and searchText
//     const filteredData = itemdata.filter((item) =>
//       item.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setFilteredItemData(filteredData);
//   }, [searchText, itemdata]);

//   useEffect(() => {
//     fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         const transformedData = apiData.data.map((item) => ({
//           titmcod: item.titmcod,
//           titmdsc: item.titmdsc,
//           tpurrat: item.tpurrat,
//           tsalrat: item.tsalrat,
//           // titmsts: item.titmsts,
//         }));
//         setitemdata(transformedData);

//         console.log(apiData); // Log the fetched data
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   const handleSearchChange = (event) => {
//     setSearchText(event.target.value);
//   };
//   const [selectedItemData, setSelectedItemData] = useState({
//     TItmId: "",
//     TItmDsc: "",
//     TPurRat: "",
//     uom: "",
//   });

//   // Add the following state variables at the beginning of your component
//   const [selectedItemIndex, setSelectedItemIndex] = useState(0);

//   // Modify the handleInputChange1 function to handle item selection and update the first row
//   const handleInputChange1 = (event, rowIndex) => {
//     const { name, value } = event.target;
//     const updatedTableData = [...tableData];

//     if (name === "name") {
//       const selectedItem = itemdata.find((item) => item.TItmId === value);

//       if (selectedItem) {
//         updatedTableData[rowIndex] = {
//           ...updatedTableData[rowIndex],
//           name: selectedItem.TItmId,
//           Desctiption: selectedItem.TItmDsc,
//           Unit: selectedItem.uom,
//           Purchase: selectedItem.TPurRat,
//           Amount: calculateAmount(
//             updatedTableData[rowIndex].quantity,
//             selectedItem.TPurRat
//           ),
//         };
//       }
//     } else {
//       updatedTableData[rowIndex] = {
//         ...updatedTableData[rowIndex],
//         [name]: value,
//       };

//       if (name === "quantity" || name === "Purchase") {
//         const quantity = parseFloat(updatedTableData[rowIndex].quantity || 0);
//         const Purchase = parseFloat(updatedTableData[rowIndex].Purchase || 0);
//         updatedTableData[rowIndex].Amount = (quantity * Purchase).toFixed(2);
//       }
//     }

//     setTableData(updatedTableData);
//     calculateTotals();
//   };

//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   // Add event listeners to the input fields of the last row
//   const addNewRow = () => {
//     setTableData([
//       ...tableData,
//       { name: "", quantity: "", Purchase: "", Amount: "" },
//     ]);
//   };

//   const [selectedRowIndex, setSelectedRowIndex] = useState(null);
//   const [color, setColor] = useState(null);
//   const [isModalOpen, setModalOpen] = useState(false);

//   // Function to handle double-click event
//   const handleDoubleClick = () => {
//     setModalOpen(true);
//   };

//   // Function to close the modal
//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };
//   const handleRowClick = (rowData, rowIndex) => {
//     setColor(rowData.titmcod);
//     setModalOpen(false);
//     const updatedTableData = [...tableData];

//     // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
//     if (rowIndex >= 0 && rowIndex < "100000000") {
//       updatedTableData[updatedTableData.length - 1] = {
//         ...updatedTableData[updatedTableData.length - 1],
//         name: rowData.titmcod,
//         Desctiption: rowData.titmdsc,
//         Purchase: rowData.tpurrat,
//         SaleRate: rowData.tsalrat,

//         Amount: calculateAmount(
//           updatedTableData[updatedTableData.length - 1].quantity,
//           rowData.TPurRat
//         ),
//       };
//     }

//     // Update the state with the modified tableData
//     setTableData(updatedTableData);
//     calculateTotals();
//   };

//   const handleDeleteRow = (index) => {
//     // Create a copy of the tableData array
//     const updatedTableData = [...tableData];
//     // Remove the row at the specified index
//     const deletedRow = updatedTableData.splice(index, 1)[0];

//     // Update the state with the modified data
//     setTableData(updatedTableData);

//     // Recalculate the totalQuantity and totalAmount
//     const newTotalQuantity = totalQuantity - deletedRow.quantity;
//     const newTotalAmount =
//       totalAmount - deletedRow.quantity * deletedRow.Purchase;
//     setTotalQuantity(newTotalQuantity);
//     setTotalAmount(newTotalAmount);
//   };

//   // Create refs for each input field
//   const USEREF1 = useRef(null);
//   const USEREF2 = useRef(null);
//   const USEREF3 = useRef(null);
//   const USEREF4 = useRef(null);
//   const USEREF5 = useRef(null);
//   const USEREF6 = useRef(null);
//   const USEREF7 = useRef(null);
//   const USEREF8 = useRef(null);
//   const USEREF9 = useRef(null);
//   const buttonRef = useRef(null);

//   // Function to focus on the next input field
//   const focusNextInput = (ref) => {
//     if (ref.current) {
//       ref.current.focus();
//     }
//   };

//   // Function to handle Enter key press
//   const handleEnterKeyPress = (ref, e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission on Enter key press
//       focusNextInput(ref);
//     }
//   };

//   const windowHeight =
//     window.innerHeight || document.documentElement.clientHeight;
//   const rowHeight = 40; // Set this value based on your actual row height

//   // Calculate the number of rows based on 70% of the viewport height
//   const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

//   // Generate the rows dynamically
//   const blankRows = Array.from({
//     length: Math.max(0, numberOfRows - filteredItemData.length),
//   }).map((_, index) => (
//     <tr key={`blank-${index}`}>
//       {Array.from({ length: 4 }).map((_, colIndex) => (
//         <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
//       ))}
//     </tr>
//   ));

//   const [dataItem, setDataItem] = useState({ columns: [], rows: [] });

//   useEffect(() => {
//     fetch(`https://crystalsolutions.com.pk/umair_electronic/web/ItemList.php`)
//       .then((response) => response.json())
//       .then((apiData) => {
//         console.log("API Data", apiData);
//         const transformedData = apiData.map((item) => ({
//           titmcod: item.titmcod,
//           titmdsc: item.titmdsc,
//           tpurrat: item.tpurrat,
//           tsalrat: item.tsalrat,
//           // titmsts: item.titmsts,
//         }));

//         console.log("Transformed Data", transformedData);

//         const columns = [
//           { label: "Code", field: "tgrpid", sort: "asc" },
//           { label: "Description", field: "tgrpdsc", sort: "asc" },
//           // { label: "Company", field: "tgrpid", sort: "asc" },
//           // { label: "Category", field: "tgrpid", sort: "asc" },
//           // { label: "Status", field: "tgrpsts", sort: "asc" },
//         ];

//         setDataItem({ columns, rows: transformedData });
//         setLength(transformedData.length);
//       })
//       .catch((error) => console.error(error));
//   }, []);
//   const filteredRows = dataItem.rows.filter(
//     (row) =>
//       (row.titmcod &&
//         row.titmcod.toLowerCase().includes(searchText.toLowerCase())) ||
//       (row.titmdsc &&
//         row.titmdsc.toLowerCase().includes(searchText.toLowerCase()))
//   );
//   return (
//     <>
//       <div
//         style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//         }}
//       >
//         {alertData && (
//           <Alert
//             severity={alertData.type}
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               width: "30%",
//               marginLeft: "35%",
//               zIndex: 1000,
//               textAlign: "center",
//             }}
//           >
//             {alertData.message}
//           </Alert>
//         )}
//         <Header />
//         <PathHead
//           pageName="Transaction > Sale"
//           screen="Get_Item"
//           pageLink="/MainPage"
//         />

//         <div className="col-12">
//           <div
//             className="row"
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               backgroundColor: "#f5f5f5",
//               minHeight: "100vh",
//             }}
//           >
//             <div
//               className="col-md-12"
//               style={{
//                 backgroundColor: "#fff",
//                 borderRadius: "10px",
//                 boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//                 padding: "5px",
//                 width: "100%",
//                 maxWidth: "83%",
//                 margin: "2% 0",
//                 border: "1px solid black",
//                 fontSize: "12px",
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//               }}
//             >
//               <form
//                 onSubmit={handleFormSubmit}
//                 style={{
//                   textAlign: "right",
//                   fontSize: "12px",
//                   fontWeight: "bold",
//                   marginLeft: "1%",
//                   height: "29rem",
//                 }}
//               >
//                 <div className="form-group">
//                   <div className="row ">
//                     <div className="col-7">
//                       <div className="row">
//                         <div className="col-sm-2 label-item">Sale #:</div>
//                         <div className="col-sm-4">
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Code"
//                             name="itmIdd"
//                             className="form-control-item"
//                             ref={SaleNo}
//                             onKeyDown={(e) => handleEnterKeyPress(Status, e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-sm-2 label-item">Customer:</div>
//                         <div className="col-sm-5" style={{ display: "flex" }}>
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Code"
//                             name="Description"
//                             className="form-control-item"
//                             ref={Customer}
//                             style={{ width: "100px" }}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Customer"
//                             name="Description"
//                             className="form-control-item"
//                             ref={Customer}
//                             style={{ width: "500px" }}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-sm-2 label-item">Remarks:</div>
//                         <div className="col-sm-5" style={{ display: "flex" }}>
//                           <Form.Control
//                             // as="textarea"
//                             id="remarks"
//                             // rows={2}
//                             placeholder="Remarks"
//                             name="remarks"
//                             className="form-control-item"
//                             ref={Customer}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-sm-2 label-item">Mobile:</div>
//                         <div className="col-sm-8" style={{ display: "flex" }}>
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Mobile"
//                             name="Mobile"
//                             className="form-control-item"
//                             ref={Customer}
//                             style={{ width: "150px" }}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Mobile"
//                             name="Mobile"
//                             className="form-control-item"
//                             ref={Customer}
//                             style={{ width: "150px" }}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-sm-2 label-item">Name:</div>
//                         <div className="col-sm-10" style={{ display: "flex" }}>
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Name"
//                             name="Mobile"
//                             className="form-control-item"
//                             ref={Customer}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-sm-2 label-item">Address:</div>
//                         <div className="col-sm-10" style={{ display: "flex" }}>
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Address1"
//                             name="Mobile"
//                             className="form-control-item"
//                             ref={Customer}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>
//                       <div className="row">
//                         <div className="col-sm-2 label-item"></div>
//                         <div className="col-sm-10" style={{ display: "flex" }}>
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="Address2"
//                             name="Mobile"
//                             className="form-control-item"
//                             ref={Customer}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>

//                       <div className="row">
//                         <div className="col-sm-2 label-item">CNIC:</div>
//                         <div className="col-sm-5" style={{ display: "flex" }}>
//                           <Form.Control
//                             type="text"
//                             id="code"
//                             placeholder="CNIC"
//                             name="CNIC"
//                             className="form-control-item"
//                             ref={Customer}
//                             onChange={handleInputChange}
//                             onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-5">
//                       <div className="row">
//                         <div className="col-6">
//                           <div className="row">
//                             {/* <QRCodeSVG value={randomData} size={126} /> */}
//                           </div>
//                           <div className="row">
//                             <Form.Control
//                               type="text"
//                               id="code"
//                               placeholder=""
//                               name="Mobile"
//                               className="form-control-item"
//                               ref={Customer}
//                               onChange={handleInputChange}
//                               onKeyDown={(e) => handleEnterKeyPress(Company, e)}
//                             />
//                           </div>
//                           <br />
//                           <br />
//                           <div className="row">
//                             <div className="col-sm-2 label-item">NTN/STN:</div>
//                             <div
//                               className="col-sm-10"
//                               style={{ display: "flex" }}
//                             >
//                               <Form.Control
//                                 type="text"
//                                 id="code"
//                                 placeholder="NTN/STN"
//                                 name="NTN/STN"
//                                 className="form-control-item"
//                                 ref={Customer}
//                                 onChange={handleInputChange}
//                                 onKeyDown={(e) =>
//                                   handleEnterKeyPress(Company, e)
//                                 }
//                               />
//                             </div>
//                           </div>
//                         </div>
//                         <div className="col-6">
//                           <div className="row">
//                             <div className="col-sm-2 label-item">Date:</div>
//                             <div
//                               className="col-sm-10"
//                               style={{ display: "flex" }}
//                             >
//                               <Form.Control
//                                 type="text"
//                                 id="code"
//                                 placeholder="Date"
//                                 disabled
//                                 className="form-control-item"
//                                 // value={formattedDate}
//                               />
//                             </div>
//                           </div>
//                           <div className="row">
//                             <div className="col-sm-2 label-item">Time:</div>
//                             <div
//                               className="col-sm-10"
//                               style={{ display: "flex" }}
//                             >
//                               <Form.Control
//                                 type="text"
//                                 id="code"
//                                 placeholder="Time"
//                                 disabled
//                                 className="form-control-item"
//                                 // value={formattedTime}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="row">
//                     <div
//                       className="col-8 firsttable-container"
//                       // style={{width:'140%',height:'250px',fontSize:'11px'}}
//                     >
//                       <br />
//                       <br />
//                       <MDBTable
//                         responsive
//                         striped
//                         bordered
//                         hover
//                         maxHeight="19rem"
//                       >
//                         <MDBTableHead>
//                           <tr>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               Sr.
//                             </th>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                                 width: "9%",
//                               }}
//                             >
//                               {" "}
//                               ID
//                             </th>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 width: "20%",
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                                 width: "25%",
//                               }}
//                             >
//                               Description
//                             </th>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               Unit
//                             </th>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               Purchase
//                             </th>

//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               Quantity
//                             </th>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               Amount
//                             </th>
//                             <th
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 top: -1,
//                                 zIndex: 1,
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               Delete
//                             </th>
//                           </tr>
//                         </MDBTableHead>
//                         <MDBTableBody>
//                           {tableData.map((rowData, index) => (
//                             <tr key={index}>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 {index + 1}
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                 }}
//                               >
//                                 <input
//                                   type="text"
//                                   name="name"
//                                   placeholder="ID"
//                                   value={rowData.name}
//                                   onDoubleClick={handleDoubleClick}
//                                   onChange={(e) => handleInputChange1(e, index)}
//                                   style={{
//                                     width: "100%",
//                                     border: "none",
//                                     backgroundColor: "transparent",
//                                     textAlign: "center",
//                                   }}
//                                   onKeyDown={(e) =>
//                                     handleEnterKeyPress(USEREF8, e)
//                                   }
//                                   ref={USEREF4}
//                                   // ref={index === tableData.length - 1 ? lastInputRef : null}
//                                 />
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                   width: "33%",
//                                 }}
//                               >
//                                 <input
//                                   type="text"
//                                   name="Desctiption"
//                                   placeholder="Description"
//                                   value={rowData.Desctiption}
//                                   onChange={(e) => handleInputChange1(e, index)}
//                                   style={{
//                                     width: "100%",
//                                     border: "none",
//                                     backgroundColor: "transparent",
//                                     textAlign: "left",
//                                   }}
//                                   // onKeyDown={(e) =>
//                                   //   handleEnterKeyPress(USEREF6, e)
//                                   // }
//                                   // ref={USEREF5}
//                                 />
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                   width: "12%",
//                                 }}
//                               >
//                                 <input
//                                   type="text"
//                                   name="Unit"
//                                   placeholder="Unit"
//                                   value={rowData.Unit}
//                                   onChange={(e) => handleInputChange1(e, index)}
//                                   style={{
//                                     width: "100%",
//                                     border: "none",
//                                     backgroundColor: "transparent",
//                                     textAlign: "center",
//                                   }}
//                                   // onKeyDown={(e) =>
//                                   //   handleEnterKeyPress(USEREF7, e)
//                                   // }
//                                   // ref={USEREF6}
//                                 />
//                               </td>

//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                   background: "#f5f5f5",
//                                 }}
//                               >
//                                 <input
//                                   type="number"
//                                   name="Purchase"
//                                   placeholder="Purchase"
//                                   value={rowData.Purchase}
//                                   onChange={(e) => handleInputChange1(e, index)}
//                                   style={{
//                                     width: "100%",
//                                     border: "none",
//                                     backgroundColor: "transparent",
//                                     textAlign: "right",
//                                   }}
//                                   // onKeyDown={(e) =>
//                                   //   handleEnterKeyPress(USEREF8, e)
//                                   // }
//                                   // ref={USEREF7}
//                                 />
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                   background: "#f5f5f5",
//                                 }}
//                               >
//                                 <input
//                                   type="number"
//                                   name="quantity"
//                                   placeholder="Quantity"
//                                   value={rowData.quantity}
//                                   onChange={(e) => handleInputChange(e, index)}
//                                   onBlur={(e) => {
//                                     const inputValue = parseFloat(
//                                       e.target.value
//                                     );
//                                     if (!isNaN(inputValue)) {
//                                       // Convert the value to a string with two decimal places
//                                       e.target.value = inputValue.toFixed(2);
//                                     }
//                                   }}
//                                   ref={USEREF8}
//                                   onKeyDown={(e) => {
//                                     if (e.key === "Enter") {
//                                       handleEnterKeyPress(USEREF9, e);

//                                       e.preventDefault();
//                                       addNewRow();
//                                       if (lastInputRef.current) {
//                                         lastInputRef.current.focus();
//                                       }
//                                     }
//                                   }}
//                                   style={{
//                                     width: "100%",
//                                     border: "none",
//                                     backgroundColor: "transparent",
//                                     textAlign: "center",
//                                   }}
//                                 />
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                   background: "#f5f5f5",
//                                 }}
//                               >
//                                 <input
//                                   type="text" // Change type to "text" to display formatted number
//                                   name="Amount"
//                                   placeholder="Amount"
//                                   value={rowData.Amount.toLocaleString()}
//                                   onChange={(e) => handleInputChange(e, index)}
//                                   style={{
//                                     width: "100%",
//                                     border: "none",
//                                     backgroundColor: "transparent",
//                                     textAlign: "right",
//                                   }}
//                                   onKeyDown={(e) =>
//                                     handleEnterKeyPress(USEREF4, e)
//                                   }
//                                   ref={USEREF9}
//                                 />
//                               </td>
//                               <td
//                                 style={{
//                                   border: "1px solid #000",
//                                   padding: "8px",
//                                   textAlign: "center",
//                                   background: "#f5f5f5",
//                                 }}
//                               >
//                                 <img
//                                   onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
//                                   src={Bin}
//                                   alt="delete"
//                                   style={{
//                                     cursor: "pointer",
//                                     width: "18px",
//                                     height: "auto",
//                                   }}
//                                 />
//                               </td>
//                             </tr>
//                           ))}
//                           {Array.from({
//                             length: Math.max(0, 6 - tableData.length),
//                           }).map((_, index) => (
//                             <tr key={`blank-${index}`}>
//                               {Array.from({ length: 8 }).map((_, colIndex) => (
//                                 <td key={`blank-${index}-${colIndex}`}>
//                                   &nbsp;
//                                 </td>
//                               ))}
//                             </tr>
//                           ))}
//                         </MDBTableBody>
//                         <MDBTableFoot
//                           style={{ position: "sticky", bottom: 0, zIndex: 2 }}
//                         >
//                           <tr>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               {totalQuantity}
//                             </td>

//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 position: "sticky",
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               {totalAmount || ".00"}
//                             </td>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                           </tr>
//                         </MDBTableFoot>
//                       </MDBTable>
//                     </div>

//                     {/* <div className="col-4 Secondtable-container">
//                       <Row>
//                         <Col
//                           xs={12}
//                           sm={4}
//                           md={4}
//                           lg={4}
//                           xl={{ span: 5, offset: 7 }}
//                         >
//                           <Form.Control
//                             type="text"
//                             style={{ height: "30px" }}
//                             placeholder="Item Description"
//                             value={searchText}
//                             onChange={handleSearchChange}
//                           />
//                         </Col>
//                       </Row>
//                       <MDBTable
//                         scrollY
//                         maxHeight="20rem"
//                         striped
//                         bordered
//                         small
//                         responsive
//                       >
//                         <MDBTableHead>
//                           <tr>
//                             {columns.map((column, index) => (
//                               <th
//                                 style={{
//                                   backgroundColor: primaryColor,
//                                   color: secondaryColor,
//                                   fontWeight: "bold",
//                                   position: "sticky",
//                                   top: -1,
//                                   zIndex: 1,
//                                 }}
//                                 key={index}
//                               >
//                                 {column.label}
//                               </th>
//                             ))}
//                           </tr>
//                         </MDBTableHead>
//                         <MDBTableBody>
//                           {filteredItemData.map((row, rowIndex) => (
//                             <tr
//                               key={rowIndex}
//                               onClick={() => handleRowClick(row, rowIndex)}
//                               style={{
//                                 cursor: "pointer",
//                                 backgroundColor:
//                                   rowIndex === selectedRowIndex
//                                     ? "lightgray"
//                                     : "white",
//                               }}
//                             >
//                               {columns.map((column, colIndex) => (
//                                 <td
//                                   key={colIndex}
//                                   style={{
//                                     textAlign:
//                                       colIndex === 1 ? "left" : "center",
//                                   }}
//                                 >
//                                   {row[column.field]}
//                                 </td>
//                               ))}
//                             </tr>
//                           ))}

//                           {blankRows}
//                         </MDBTableBody>
//                         <MDBTableFoot
//                           style={{ position: "sticky", bottom: 0, zIndex: 2 }}
//                         >
//                           <tr>
//                             <td
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             >
//                               {Length}
//                             </td>
//                             <td
//                               colSpan={3}
//                               style={{
//                                 backgroundColor: primaryColor,
//                                 color: secondaryColor,
//                                 fontWeight: "bold",
//                                 border: "1px solid #000",
//                               }}
//                             ></td>
//                           </tr>
//                         </MDBTableFoot>
//                       </MDBTable>
//                     </div> */}

//                     <Modal show={isModalOpen} onHide={handleCloseModal}>
//                       <Nav
//                         className="col-12 d-flex justify-content-between"
//                         style={{
//                           backgroundColor: "#3368b5",
//                           color: "#fff",
//                           height: "24px",
//                         }}
//                       >
//                         <div className="col-4 ">
//                           <i
//                             className="fa fa-refresh fa-lg topBtn"
//                             title="Refresh"
//                           ></i>
//                         </div>
//                         <div
//                           style={{ fontSize: "14px" }}
//                           className="col-4 text-center"
//                         >
//                           <strong>Select Item</strong>
//                         </div>
//                         <div className="text-end col-4">
//                           <Link onClick={handleCloseModal} className="topBtn">
//                             <i className="fa fa-close fa-lg crossBtn"></i>
//                           </Link>
//                         </div>
//                       </Nav>
//                       <Modal.Body>
//                         <Row>
//                           <Col
//                             xs={12}
//                             sm={4}
//                             md={4}
//                             lg={4}
//                             xl={{ span: 4, offset: 8 }}
//                           >
//                             <Form.Control
//                               type="text"
//                               placeholder="Search..."
//                               className="form-control-item  search"
//                               value={searchText}
//                               onChange={handleSearchChange}
//                             />
//                           </Col>
//                         </Row>
//                         <MDBTable
//                           scrollY
//                           maxHeight="63vh"
//                           stripedss
//                           bordered
//                           small
//                           responsive
//                         >
//                           <MDBTableHead>
//                             <tr>
//                               {dataItem.columns.map((column, columnIndex) => (
//                                 <th
//                                   key={columnIndex}
//                                   style={{
//                                     height: "24px",
//                                     backgroundColor: "#c6daf7",
//                                     color: "black",
//                                     fontWeight: "bold",
//                                     position: "sticky",
//                                     border: "1px solid black",
//                                     top: -1,
//                                     textAlign: "center",
//                                     zIndex: 1,
//                                   }}
//                                 >
//                                   {""}
//                                   {column.label}
//                                 </th>
//                               ))}
//                             </tr>
//                           </MDBTableHead>
//                           <MDBTableBody>
//                             {filteredRows.length === 0 ? (
//                               <>
//                                 {Array.from({
//                                   length: Math.max(
//                                     0,
//                                     Math.floor(
//                                       (100 * window.innerHeight) / 100
//                                     ) / 84
//                                   ),
//                                 }).map((_, index) => (
//                                   <tr key={`blank-${index}`}>
//                                     {Array.from({ length: 2 }).map(
//                                       (_, colIndex) => (
//                                         <td key={`blank-${index}-${colIndex}`}>
//                                           &nbsp;
//                                         </td>
//                                       )
//                                     )}
//                                   </tr>
//                                 ))}
//                                 <tr>
//                                   <td
//                                     colSpan={2}
//                                     style={{ textAlign: "center" }}
//                                   >
//                                     <div style={{ position: "relative" }}>
//                                       <Spinner
//                                         animation="border"
//                                         variant="primary"
//                                       />
//                                     </div>
//                                   </td>
//                                 </tr>
//                                 {Array.from({
//                                   length: Math.max(
//                                     0,
//                                     Math.floor(
//                                       (100 * window.innerHeight) / 75
//                                     ) / 84
//                                   ),
//                                 }).map((_, index) => (
//                                   <tr key={`blank-${index}`}>
//                                     {Array.from({ length: 2 }).map(
//                                       (_, colIndex) => (
//                                         <td key={`blank-${index}-${colIndex}`}>
//                                           &nbsp;
//                                         </td>
//                                       )
//                                     )}
//                                   </tr>
//                                 ))}
//                               </>
//                             ) : (
//                               <>
//                                 {filteredRows.map((row, rowIndex) => (
//                                   <tr
//                                     key={rowIndex}
//                                     onClick={() =>
//                                       handleRowClick(row, rowIndex)
//                                     }
//                                     style={{
//                                       backgroundColor:
//                                         color === row.titmcod ? "#444ebd" : "",
//                                       color:
//                                         color === row.titmcod
//                                           ? secondaryColor
//                                           : "",
//                                       fontWeight:
//                                         color === row.titmcod ? "bold" : "",
//                                     }}
//                                   >
//                                     <td style={{ width: "10%" }}>
//                                       {" "}
//                                       {row.titmcod}
//                                     </td>
//                                     <td style={{ textAlign: "left" }}>
//                                       {row.titmdsc}
//                                     </td>
//                                   </tr>
//                                 ))}

//                                 {Array.from({
//                                   length: Math.max(
//                                     0,
//                                     Math.floor(
//                                       (100 * window.innerHeight) / 100
//                                     ) / 40
//                                   ),
//                                 }).map((_, index) => (
//                                   <tr key={`blank-${index}`}>
//                                     {Array.from({
//                                       length: 2,
//                                     }).map((_, colIndex) => (
//                                       <td key={`blank-${index}-${colIndex}`}>
//                                         &nbsp;
//                                       </td>
//                                     ))}
//                                   </tr>
//                                 ))}
//                               </>
//                             )}
//                           </MDBTableBody>
//                         </MDBTable>
//                       </Modal.Body>
//                     </Modal>
//                   </div>

//                   <br />
//                   <br />
//                   <br />
//                   <tr>
//                     <td></td>
//                     <td>
//                       <button
//                         className="btn btn-primary"
//                         style={{
//                           backgroundColor: primaryColor,
//                           height: "27px",
//                           fontSize: "11px",
//                           color: secondaryColor,
//                           width: "100%",
//                           marginRight: "1%",
//                         }}
//                         onClick={handleFormSubmit}
//                       >
//                         SUBMIT
//                       </button>
//                     </td>
//                   </tr>

//                   {/* ////////////////////////////////  BUTTON ////////////////////////// */}
//                   <br />
//                 </div>
//               </form>
//             </div>
//           </div>
//           <br />
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default Sale;





