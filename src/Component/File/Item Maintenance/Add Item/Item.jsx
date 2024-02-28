import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Header from "../../../MainComponent/Header/Header";
import React, { useState, useEffect ,useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";
import "../Add Item/Item.css";

function Item() {
  const [values, setValues] = useState({
    itmIdd: "",
    itemDscc: "",
    itemDscUrdd: "",
    itmremarkss: "",
    itmindexx: "",
    itemStss: "",
    purRatee: "",
    discontt: " ",
    saleRatee: "",
    categoryIdd: "",
    typee: "",
    uomm: "",
    pic: "",
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [selectedStatus1, setSelectedStatus1] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");
  const [selectedUnitId, setSelectedUnitId] = useState("Startup");

  const [alertData, setAlertData] = useState(null);
  const { secondaryColor, apiLinks } = useTheme();

  const [selectedType, setSelectedType] = useState("Item Purchase");
  const [selectedUnit, setSelectedUnit] = useState("Quantity");

  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor, fontFamily } = useTheme();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange1 = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      imgElement.src = URL.createObjectURL(file);
    }
  };
  {
    /* ////////////////////////  DUE TO GET DATA OF CATEGORY ////////////////////////// */
  }

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_uom.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const apiData = await response.json();
        setData1(apiData);

        // Set the selectedCategoryId with the first category ID from the API data
        if (apiData.length > 0) {
          setSelectedUnitId(apiData[0].uomid);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const value = {
      itemStss: selectedStatus,
      categoryIdd: selectedStatus1,
      typee: selectedType,
      uomm: selectedUnit,
    };
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("itmId", nextItemId);
      formData.append("itemDsc", values.itemDscc);
      formData.append("itemDscUrd", values.itemDscUrdd);
      formData.append("itmremarks", values.itmremarkss);
      formData.append("itmindex", values.itmindexx);

      formData.append("itemSts", value.itemStss);
      formData.append("purRate", values.purRatee);
      formData.append("saleRate", values.saleRatee);
      formData.append("discont", values.discontt);
      formData.append("categoryId", selectedCategoryId);
      formData.append("type", value.typee);
      formData.append("uom", selectedUnitId);
      formData.append("pic", selectedImage1);

      // formData.append('FUsrId', UserId);
      const response = await axios
        .post(`${apiLinks}/add_item.php`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            // 'Content-Type': 'application/json;charset=UTF-8',
          },
        })
        .then((response) => {
          if (response.data.error === 200) {
            // If the error code is 200, navigate to "/Get_Item"
            navigate("/Get_Item");
        
            // Set a success alert message
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
        
            // Hide the success alert after 1 second
            setTimeout(() => {
              setAlertData(null);
            }, 1000);
          } else {
            // If the error code is not 200, log the message to the console
            console.log(response.data.message);
        
            // Set an error alert message
            setAlertData({
              type: "error",
              message: `${response.data.message}`,
            });
        
            // Hide the error alert after 2 seconds
            setTimeout(() => {
              setAlertData(null);
            }, 2000);
          }
        
          // Regardless of the error code, navigate to "/Item"
          navigate("/Item");
        })
        
        .catch((error) => {
          // Handle errors
          console.error("Error:", error);
        });

      console.log(response.data);
      // Reset form values after submission
      setValues({
        itmIdd: "",
        itmindex: "",
        itmremarks: "",
        itemDscc: "",
        itemDscUrdd: "",
        itmremarkss: "",
        itemStss: "Yes", // Set the initial value for itemStss
        purRatee: "",
        discontt: "", // Set the initial value for discontt
        saleRatee: "",
        categoryIdd: data.length > 0 ? data[0].tctgid : "", // Set the initial value for categoryIdd
        typee: "Item Purchase",
        uomm: data1.length > 0 ? data1[0].uomid : "", // Set the initial value for typee
        pic: "",
        loading: true,
      });
      setSelectedStatus("Yes"); // Set the initial value for selectedStatus
      setSelectedStatus1(""); // Set the initial value for selectedStatus1
      setSelectedCategoryId(data.length > 0 ? data[0].tctgid : "Startup");
      setSelectedUnitId(data1.length > 0 ? data1[0].uomid : "KG"); // Set the initial value for selectedCategoryId
      // Set the initial value for selectedCategoryId
      setSelectedType("Item Purchase"); // Set the initial value for selectedType
      setSelectedUnit("Quantity");
      setSelectedImage1(null); // Clear the selected image

      setAlert("Image uploaded successfully.");
      navigate("/Item");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error);
      setAlert("Error uploading image.");
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
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

  // Function to handle adding new data
  const handleAddData = () => {
    const newData = {
      TItmId: String(nextItemId), // Convert to string
      // Add other properties as needed
    };

    // Update the state with the new data
    setItem([...item, newData]);

    // Increment the nextItemId for the next addition
    setNextItemId(nextItemId + 1);
  };







//////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

   // Create refs for each input field
   const ENTER1 = useRef(null);
   const ENTER2 = useRef(null);
   const ENTER3 = useRef(null);
   const ENTER4 = useRef(null);
   const ENTER5 = useRef(null);
   const ENTER6 = useRef(null);
   const ENTER7 = useRef(null);
   const ENTER8 = useRef(null);
   const ENTER9 = useRef(null); 
   const ENTER10 = useRef(null);
   const ENTER11 = useRef(null);
   const ENTER12 = useRef(null);
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
          pageName="File > Item Maintenance > Add Item"
          screen="Get_Item"
          pageLink="/Get_Item"
        />

        <div
          className="col-12"
          style={{ color: "black", fontWeight: "bold", fontFamily: fontFamily }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
              overflowY: "scroll", // Enable vertical scrolling
              height: "calc(100vh - 200px)", // Set an appropriate height
            }}
          >
            <div
              className="col-md-12 form-container"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                width: "100%",
                maxWidth: "600px",
                margin: "20px 0",
                fontSize: "12px",
            border: "1px solid black",position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                <table>
                     <tbody>
                     <tr>
    <td>
      <Form.Group
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',
        }}
      >
        <Form.Label>Id:</Form.Label>
      </Form.Group>
    </td>
    <td >
      <Form.Group
        style={{ display: "flex", alignItems: "center" }}
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
            width:  '60px',
            // borderColor: missingDescription
            //   ? "red"
            //   : null,
          }}
          readOnly

          // onKeyDown={(e) =>
          //   handleEnterKeyPress(statusRef, e)
          // }
          // ref={descriptionRef}
          // maxLength={40}
        />
      </Form.Group>
    </td>
    <td></td>
    <td rowSpan={9}>  <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "100px",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          textAlign: "center",
                        }}
                      >
                        <label
                          htmlFor="pic"
                          style={{ display: "block", marginBottom: "10px" }}
                        >
                          {" "}
                          Item Pic:{" "}
                        </label>
                        <label htmlFor="pic" style={{ display: "block" }}>
                          <div
                            style={{
                              height: "100px",
                              border: "2px dashed #bbb",
                              borderRadius: "5px",
                              display: "flex",
                              flexDirection: "column",
                              // justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <span
                              style={{
                                // fontSize: "14px",
                                color: "#aaa",
                                marginBottom: "1%",
                              }}
                            >
                              Click to Upload
                            </span>
                            <label htmlFor="pic" style={{ cursor: "pointer" }}>
                              <img
                                id="pic-preview"
                                src=""
                                alt="Upload"
                                style={{
                                  width: "70px",
                                  height: "70px",
                                  display: "block",
                                }}
                              />
                              <input
                                type="file"
                                id="pic"
                                style={{ display: "none" }}
                                onChange={handleImageChange1}
                              />
                            </label>
                          </div>
                        </label>
                      </div>
                    </div> </td>
                     </tr>

                     <tr>
                      <td>
                      <Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                      >
                        Description:
                      </Form.Label>
                      
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
                        placeholder="Description"
                        name="itemDscc"
                        className="form-control"
                        value={values.itemDscc}
                        style={{ height: "24px"}}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER2, e)
                        }
                        ref={ENTER1}
                      />
                    </Form.Group>
                      </td>
                      <td></td>
                      <td></td>
                     </tr>

                     <tr>
                     <td></td>

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
                        placeholder="تفصیل"
                        name="itemDscUrdd"
                        className="form-control"
                        value={values.itemDscUrdd}
                        style={{
                          height: "24px",
                          textAlign: "right",
                          
                        }}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER3, e)
                        }
                        ref={ENTER2}
                      />
                      
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
                      
                      <Form.Label style={{ marginRight: "30px" }}>
                        :تفصیل
                      </Form.Label>
                    </Form.Group>

                      </td>
                      <td></td>
                     </tr>


                      
                      <tr>
                      <td>
                      <Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                        
                      >
                        Remarks:
                      </Form.Label>
                      
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
                        placeholder="Remarks"
                        name="itmremarkss"
                        className="form-control"
                        value={values.itmremarkss}
                        style={{ height: "24px" }}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER4, e)
                        }
                        ref={ENTER3}
                      />
                    </Form.Group>
</td>
<td></td>
<td></td>
                      </tr>


                      <tr>

                        <td>
                          <Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                      >
                        Index:
                      </Form.Label>
                      
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="index"
                        name="itmindexx"
                        className="form-control"
                        value={values.itmindexx}
                        style={{ height: "24px", width: "70px" }}
                        onChange={handleInputChange}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER5, e)
                        }
                        ref={ENTER4}
                      />
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>


                      
                      <tr>
                        <td><Form.Group
                      controlId="status"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                       
                      >
                        Status:
                      </Form.Label>
                      
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="status"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      
                      <Form.Control
                        as="select"
                        name="itemStss"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="form-control custom-select" // Add the custom CSS class 'custom-select'
                        style={{
                          height: "27px",
                          fontSize: "11px",
                          width: "70px",
                        }}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER6, e)
                        }
                        ref={ENTER5}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Form.Control>
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><Form.Group
                      controlId="status"
                    >
                      <Form.Label
                        style={{
                          display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                        }}
                      >
                        Category:
                      </Form.Label>
                      
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="status"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                     
                      <Form.Control
                        as="select"
                        name="categoryIdd"
                        onChange={(e) => {
                          setSelectedCategoryId(e.target.value);
                        }}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER7, e)
                        }
                        ref={ENTER6}
                        id="categoryIdd"
                        style={{
                          height: "27px",
                          fontSize: "11px",
                          width: "120px", 
                        }}
                        className="form-control"
                      >
                        {data.map((item) => (
                          <option key={item.tctgid} value={item.tctgid}>
                            {item.tctgdsc}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><Form.Group
                      controlId="status"
                    >
                      <Form.Label
                        style={{
                          display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                        }}
                      >
                        Type:
                      </Form.Label>
                      
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="status"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      
                      <Form.Control
                        as="select"
                        name="typee"
                        value={selectedType} // Set the default value to "Item Purchase"
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="form-control"
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER8, e)
                        }
                        ref={ENTER7}
                        style={{
                          height: "27px",
                          fontSize: "11px",
                          width: "120px",
                        }}
                      >
                        <option value="Item Purchase">Item Purchase</option>
                        <option value="Item Sale">Item Sale</option>
                      </Form.Control>
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><Form.Group
                      controlId="status"
                    >
                      <Form.Label
                        style={{
                          display: "flex",
                          alignItems: "flex-end",
                          justifyContent: "flex-end",
                          marginRight: '10px',
                        }}
                      >
                        Unit:
                      </Form.Label>
                      
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="status"
                    >
                      
                      <Form.Control
                        as="select"
                        name="categoryIdd"
                        onChange={(e) => {
                          setSelectedUnitId(e.target.value);
                        }}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER9, e)
                        }
                        ref={ENTER8}
                        id="categoryIdd"
                        style={{
                          height: "27px",
                          fontSize: "11px",
                          width: "120px",
                        }}
                        className="form-control"
                      >
                        {data1.map((item) => (
                          <option key={item.uomid} value={item.uomid}>
                            {item.uomdsc}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>
                    
                      <tr>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                      >
                        Pur Rate:
                      </Form.Label>
                      
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Purchase  "
                        name="purRatee"
                        className="form-control"
                        value={values.purRatee || ".00"}
                        
                        ref={ENTER9}
                        style={{
                          height: "24px",
                          width: "80px",
                          fontSize: "12px",
                          textAlign: "right",
                        }}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER10, e)
                        }
                        onChange={handleInputChange}
                      />
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                      >
                        Disc Rate:
                      </Form.Label>
                     
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                      
                      onKeyDown={(e) =>
                        handleEnterKeyPress(ENTER11, e)
                      }
                      ref={ENTER10}

                    >
                     
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Discount Rate"
                        name="discontt"
                        className="form-control"
                        defaultValue=".00" // Use defaultValue instead of value
                        style={{
                          height: "24px",
                          width: "80px",
                          fontSize: "12px",
                          textAlign: "right",
                        }}
                        onChange={handleInputChange}
                      />
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',
                      }}
                    >
                      <Form.Label
                      >
                        Sale Rate:
                      </Form.Label>
                     
                    </Form.Group></td>
                        <td><Form.Group
                      controlId="description"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      
                      <Form.Control
                        type="text"
                        id="code"
                        placeholder="Sale Rate"
                        name="saleRatee"
                        className="form-control"
                        value={values.saleRatee || ".00"}
                        onKeyDown={(e) =>
                          handleEnterKeyPress(ENTER12, e)
                        }
                        ref={ENTER11}
                        style={{
                          height: "24px",
                          width: "80px",
                          fontSize: "12px",
                          textAlign: "right", // Align text to the right
                        }}
                        onChange={handleInputChange}
                      />
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                        <Button
                  className="btn btn-primary"
                  style={{
                    backgroundColor: primaryColor,
                    height: "4%",
                    fontSize: "11px",
                    color: secondaryColor,
                    width: "50%",
                    marginRight: "2%",
                  }}
                  onClick={handleFormSubmit}
                  
                  ref={ENTER12}
                >
                  SUBMIT
                </Button>

                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                     </tbody>

                  </table>
                </div>
               
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Item;
