


import React, { useState, useEffect ,useRef } from "react";
import { MDBTable, MDBTableBody, MDBTableHead,MDBTableFoot } from "mdbreact";
import axios from "axios";
import { useTheme } from "../../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import '../Purchase/Purchase.css';
import {
    Card,
    Row,
    Col,
    Button,
    FormControl,
    InputGroup,
    Form,
  } from "react-bootstrap";
import Bin from '../../../image/bin.png';

function Purchase() {
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
  const { secondaryColor ,apiLinks } = useTheme();

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


  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_category.php`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
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



  
  {/* ////////////////////////  CALL API TO POST DATA ////////////////////////// */}
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
        type:'Purchase',

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
          throw new Error('Failed to fetch data');
        }

        const apiData = await response.json();
        setItem(apiData);
        setLength(apiData.length);
        // Find the maximum TItmId in the existing data
        const maxItemId = Math.max(...apiData.map((item) => parseInt(item.TItmId)));
        // Set the nextItemId to be one greater than the maximum TItmId
        setNextItemId(maxItemId + 1);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  





  const [tableData, setTableData] = useState([
    { name: '', quantity: '', Purchase: '', Amount: '' },
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
    setTableData([...tableData, { name: '', quantity: '', price: '' }]);
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
          uom:item.uom,
          TPurRat:item.TPurRat,
        }));

        setitemdata(transformedData);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);
  

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const [selectedItemData, setSelectedItemData] = useState({ TItmId: "", TItmDsc: "",TPurRat:'',uom:'' });


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
    setTableData([...tableData, { name: '', quantity: '', Purchase: '', Amount: '' }]);
  };


  const [selectedRowIndex, setSelectedRowIndex] = useState(null);


  const handleRowClick = (rowData, rowIndex) => {
    // Create a copy of the current tableData
    const updatedTableData = [...tableData];
  
    // if (rowIndex >= 0 && rowIndex < updatedTableData.length) {
      if (rowIndex >= 0 && rowIndex < '100000000') {

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
  
  


  // const handleDeleteRow = (index) => {
  //   // Create a copy of the tableData array
  //   const updatedTableData = [...tableData];
  //   // Remove the row at the specified index
  //   const deletedRow = updatedTableData.splice(index, 1)[0];

  //   // Update the state with the modified data
  //   setTableData(updatedTableData);

  //   // Recalculate the totalQuantity and totalAmount
  //   const newTotalQuantity = totalQuantity - deletedRow.quantity;
  //   const newTotalAmount = totalAmount - (deletedRow.quantity * deletedRow.Purchase);
  //   setTotalQuantity(newTotalQuantity);
  //   setTotalAmount(newTotalAmount);
  // };
  const handleDeleteRow = (index) => {
    // Create a copy of the tableData array
    const updatedTableData = [...tableData];

    // Remove the row at the specified index
    const deletedRow = updatedTableData.splice(index, 1)[0];

    // Update the state with the modified data
    setTableData(updatedTableData);

    // Recalculate the totalQuantity and totalAmount
    const newTotalQuantity = totalQuantity - deletedRow.quantity;

    // Recalculate the totalAmount by summing the amounts of remaining rows
    const newTotalAmount = updatedTableData.reduce(
      (total, row) => total + row.quantity * row.Purchase,
      0
    );

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
        <PathHead pageName="Transaction > Purchase" screen='Get_Item' pageLink="/MainPage"/>

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
              padding: "5px",
              width: "100%",
              maxWidth: "83%",
              margin: "2% 0",
              border:'1px solid black',
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }}
          >
            <form
              // onSubmit={handleFormSubmit}
              style={{ textAlign: "right" ,fontSize:'12px',fontWeight:'bold',marginLeft:'1%',height:'29rem'}}
            >
              <div className="form-group" >


               <div className="row">



                <div className="col-6">

                  <table>
                    <tbody>
                    {/* display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px", */}
                      <tr>
                        <td><Form.Group controlId="description" style={{ display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px",}}>
      <Form.Label >Purchase#:</Form.Label>
      
    </Form.Group></td>
                        <td><Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        id="code"
        placeholder=" Id"
        name="itmIdd"
        className="form-control"
        value={ nextItemId} // Display the nextItemId
        style={{ height: '24px', width: '60px',  textAlign: 'right' }}
        readOnly // Make the input read-only to prevent user edits
      />
    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>  <Form.Group controlId="Code" style={{ display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px", }}>
      <Form.Label >Code:</Form.Label>
      
    </Form.Group> </td>
                        <td>  <Form.Group  style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
         type="text"
         id="code"
         placeholder="Cash / Supplier"
         name="itemCodd"
         className="form-control"
         value={values.itemCodd}
         style={{height:'24px'}}
         onChange={handleInputChange2}
         onKeyDown={(e) =>
          handleEnterKeyPress(USEREF2, e)
        }
        ref={USEREF1}
      />
      
    </Form.Group> </td>
                        <td>  <Form.Group controlId="Code" style={{ display: 'flex', alignItems: 'center' }}>
      
      <Form.Control
         type="text"
         id="code"
         placeholder="Code Description"
         name="itemDscc"
         className="form-control"
         value={values.itemDscc}
         style={{height:'24px'}}
         onChange={handleInputChange2}
         onKeyDown={(e) =>
          handleEnterKeyPress(USEREF3, e)
        }
        ref={USEREF2}
      />
    </Form.Group> </td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>  <Form.Group controlId="Remarks" style={{ display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "flex-end",
                              marginRight: "10px", }}>
      <Form.Label >Remarks:</Form.Label>
      
    </Form.Group>  </td>
                        <td>  <Form.Group controlId="Remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Remarks  "
        name="itemRmkss"
        className="form-control"
        value={values.itemRmkss }
        style={{height:'24px',fontSize:'12px'}}
        onChange={handleInputChange2}
        onKeyDown={(e) =>
          handleEnterKeyPress(USEREF4, e)
        }
        ref={USEREF3}
      />
    </Form.Group>  </td>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
              
                

         
               
                


             
      
         
                </div>

               </div>

               <div className="row"> 
                <div  className="col-8 firsttable-container"
                // style={{width:'140%',height:'250px',fontSize:'11px'}}
                

                >
                  <br /><br />
                <MDBTable responsive striped bordered hover 
                  maxHeight={tableData.length >= 6 ? "19rem" : "auto"}
                  >
  <MDBTableHead>
    <tr>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Sr.</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'9%'}}> ID</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, width:'20%', fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000",width:'25%'}}>Description</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Unit</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Purchase</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Quantity</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Amount</th>
      <th style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky", top: -1, zIndex: 1  , border: "1px solid #000"}}>Delete</th>

    </tr>
  </MDBTableHead>
  <MDBTableBody>
    {tableData.map((rowData, index) => (
      <tr key={index}>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>{index + 1}</td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" }}>
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
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" ,width: "33%"}}>
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
              textAlign:'left',
            }}
           
          />
        </td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center" ,width: "12%"}}>
          <input
            type="text"
            name="Unit"
            placeholder="Unit"
            value={rowData.Unit}
            onChange={(e) => handleInputChange1(e, index)}
            style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
            
          />
        </td>
      



        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
          <input
            type="number"
            name="Purchase"
            placeholder="Purchase"
            value={rowData.Purchase}
            onChange={(e) => handleInputChange1(e, index)}
            style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "right" }}
            
          />
        </td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
<input
  type="number"
  name="quantity"
  placeholder="Quantity"
  value={rowData.quantity}
  onChange={(e) => handleInputChange(e, index)}
  onBlur={(e) => {
    const inputValue = parseFloat(e.target.value);
    if (!isNaN(inputValue)) {
      // Convert the value to a string with two decimal places
      e.target.value = inputValue.toFixed(2);
    }
  }}
  ref={USEREF8}
  onKeyDown={(e) => {
    handleEnterKeyPress(USEREF9, e)

    if (e.key === "Enter") {
      e.preventDefault();
      addNewRow();
      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }
    }
  }}
  style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
/>

{/* <input
  type="number"
  name="quantity"
  placeholder="0.00"
  value={rowData.quantity}
  onChange={(e) => handleInputChange(e, index)}
  onBlur={(e) => {
    const inputValue = e.target.value;
    if (inputValue !== '') {
      e.target.value = parseFloat(inputValue).toFixed(2);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewRow();
      if (lastInputRef.current) {
        lastInputRef.current.focus();
      }
    }
  }}
  style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "center" }}
/> */}



</td>
        <td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
  <input
    type="text"  // Change type to "text" to display formatted number
    name="Amount"
    placeholder="Amount"
    value={rowData.Amount.toLocaleString()}
    onChange={(e) => handleInputChange(e, index)}
    style={{ width: "100%", border: "none", backgroundColor: "transparent", textAlign: "right" }}
    ref={USEREF9}
  onKeyDown={(e) => {
    handleEnterKeyPress(USEREF4, e)
  }}
  />
</td>
<td style={{ border: "1px solid #000", padding: "8px", textAlign: "center", background: "#f5f5f5" }}>
              <img
                onClick={() => handleDeleteRow(index)} // Delete the row when the delete icon is clicked
                src={Bin}
                alt="delete"
                style={{ cursor: 'pointer', width: '18px', height: 'auto' }}
              />
            </td>
        
      </tr>
      
    ))}
     {Array.from({ length: Math.max(0, 6 - tableData.length) }).map((_, index) => (
        <tr key={`blank-${index}`}>
          {Array.from({ length: 8 }).map((_, colIndex) => (
            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
          ))}
        </tr>
      ))}
  </MDBTableBody>
  <MDBTableFoot style={{ position: "sticky", bottom: 0, zIndex: 2 }}>
  <tr>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold" , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold" , border: "1px solid #000"}}>{totalQuantity}</td>

      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold", position: "sticky" , border: "1px solid #000"}}>{totalAmount || '.00'}</td>
      <td style={{backgroundColor: primaryColor, color: secondaryColor, fontWeight: "bold"  , border: "1px solid #000"}}></td>

    </tr>
  </MDBTableFoot>
                </MDBTable>
                  </div>
                
                  <div className="col-4 Secondtable-container" >
               <Row>
            
            <Col xs={12} sm={4} md={4} lg={4} xl={{ span:5, offset: 7 }}>
              <Form.Control
                type="text"
                style={{height:'30px'}}
                placeholder="Item Description"
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <MDBTable scrollY maxHeight="20rem" striped bordered small responsive > 
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
          rowIndex === selectedRowIndex ? "lightgray" : "white",
      }}
    >
      {columns.map((column, colIndex) => (
        <td
          key={colIndex}
          style={{ textAlign: colIndex === 1 ? "left" : "center" }}
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



<br /><br /><br />
                <tr>
                  <td></td>
                  <td><button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "27px",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "100%",
                      marginRight:'1%'
                    }}
                    onClick={handleFormSubmit}
                    
                  >
                    SUBMIT
                  </button></td>
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
      <Footer/>
    </>
  );
}

export default Purchase;