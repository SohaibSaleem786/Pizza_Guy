

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect ,useRef } from "react";
import Header from "../../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import Footer from "../../../MainComponent/Footer/Footer";

function Update_Item() {
  const navigate = useNavigate();
  const { TItmId } = useParams();
  const [alertData, setAlertData] = useState(null);

  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const { secondaryColor ,apiLinks,fontFamily} = useTheme();

  const imageurl = `${apiLinks}/itemimage/`;
  const [data, setData] = useState([]);
  const { primaryColor } = useTheme();

  const [user, setUser] = useState({
   
    TItmId :'',
TItmDsc:'',
itmdscurd:'',
itmremarks:'',
itmindex:'',
uom:'',
TItmSts:'',
TPurRat:'',
TSalRat:'',
TCtgId :'',
TitmTyp:'',
TItmPic:'',
itmdis:'',
  });

  useEffect(() => {
    fetch(
      `${apiLinks}/get_item.php?TItmId=${TItmId}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.TItmId === TItmId);
        setUser(user);
        setPreviewImage(user.TItmPic ? imageurl + user.TItmPic : '');
  

      })
      .catch((error) => console.error(error));
  }, [TItmId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const [values, setValues] = useState({
    itmIdd: "",
    itemDscc: "",
    itmdscurd:'',
    itmindex:'',
    itmremarks:'',
    itmdscurd:'',
    itemStss: "",
    purRatee: "",
    saleRatee: "",
    categoryIdd: "",
    discountt:"",
    typee: "",
    pic : '',
    loading: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
//   const [selectedImage2, setSelectedImage2] = useState(null);
//   const [selectedImage3, setSelectedImage3] = useState(null);

  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview");
      if (imgElement) {
        imgElement.src = URL.createObjectURL(file);
      }
    }
  }


  const UserId = 33;
  useEffect(() => {
    // Retrieve user data from local storage
    const userData = JSON.parse(localStorage.getItem("user"));

    if (userData) {
      // setUsers(userData);
      console.log(userData);
      console.log("user id is", userData.tusrid);
    } else {
      // Handle cases when user data is not available
      console.error("User data not available in local storage.");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${apiLinks}/get_category.php`
        );
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


    return () => {
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const FSinUsr = 33; // Your user ID logic here
  
    const requestBody = new FormData();
    requestBody.append("itmId", user.TItmId);
    requestBody.append("itemDsc", user.TItmDsc);
    requestBody.append("itemDscUrd", user.itmdscurd);
    requestBody.append("uom", user.uom);
    requestBody.append("itemSts", user.TItmSts);
    requestBody.append("purRate", user.TPurRat);
    requestBody.append("saleRate", user.TSalRat);
    requestBody.append("discont", user.itmdis);
    requestBody.append("categoryId", user.TCtgId);
    requestBody.append("itmremarks", user.itmremarks);
    requestBody.append("itmindex", user.itmindex);
    // requestBody.append("categoryId", selectedCategoryId);
    requestBody.append("type", user.TitmTyp);
    requestBody.append("pic", selectedImage1);


    axios
      .post(
        `${apiLinks}/update_item.php?TItmId=${TItmId}`,
        requestBody
      )
      .then((response) => {
        if (response.data.error === 200) {
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/Get_Item");
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
  };
  

  
  useEffect(() => {
    if (selectedImage1) {
      document.getElementById("pic-preview").src = URL.createObjectURL(selectedImage1);
    }
  }, [selectedImage1]);





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

<PathHead pageName="File > Item Maintenance > Update Item" screen='Get_Item' pageLink="/Get_Item"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold' ,fontFamily:fontFamily,}}>
        

        <div
          className="row"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px",
            backgroundColor: "#f5f5f5",
            minHeight: "100vh",
          }}
        >
          <div className="col-md-12 form-container"
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            width: "100%",
            maxWidth: "600px",
            margin: "20px 0",
            fontSize:'12px',
                // padding: "20px",
                border: "1px solid black",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",

          }}
          >
            <Form onSubmit={handleSubmit}>
            <div className="row">
            <table>
                 <tbody>
                  <tr>
                    <td>
                      <Form.Group controlId="Id" style={{ 
                      display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px', }}>
      <Form.Label >Id :</Form.Label>
      
    </Form.Group>
                    </td>
                    <td>
                      <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
     
      <Form.Control
        type="text"
        id="code"
        placeholder=" Id"
        className="form-control"
        name="TItmId"
        value={user.TItmId}
        style={{height:'24px', width:'70px' }}
        onChange={handleInputChange}
        disabled
      />
    </Form.Group>
                    </td>
                    <td></td>
                    <td rowSpan={9}> <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '100px' }}>
      <div style={{ flex: 1, textAlign: 'center' }}>
      <label
                      htmlFor="pic"
                      style={{
                        display: "block",
                        marginBottom: "10px",
                      }}
                    >
                      Item Pic:
                    </label>
                    <label
                      htmlFor="pic"
                      style={{ cursor: "pointer", display: "block" }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "100px",
                          border: "2px dashed #bbb",
                          borderRadius: "5px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            color: "#aaa",
                            marginBottom: "5px",
                          }}
                        >
                          Click to Upload
                        </span>
                        <label htmlFor="pic" style={{ cursor: "pointer" }}>
          <img
            id="pic-preview"
            src={previewImage1}  
            alt="Category"
            style={{ width: '100%', height: '60px' }}
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
    </div></td>
                  </tr>
                  <tr>
                    <td><Form.Group controlId="description" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px', }}>
      <Form.Label >Description:</Form.Label>
      
    </Form.Group></td>
                    <td><Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center'}}>
      <Form.Control
         type="text"
         id="code"
         placeholder="Description"
         className="form-control"
         name="TItmDsc"
         value={user.TItmDsc}
         style={{height:'24px' }}
         onChange={handleInputChange}
         onKeyDown={(e) =>
          handleEnterKeyPress(ENTER2, e)
        }
        ref={ENTER1}
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  
                  <tr>
                    <td></td>
                    <td><Form.Group controlId="description" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
         }}>
      <Form.Control
          type="text"
          id="code"
          placeholder="تفصیل"
          name="itmdscurd"
          className="form-control"
          value={user.itmdscurd}
          style={{height:'24px'}}
          onChange={handleInputChange}
          onKeyDown={(e) =>
            handleEnterKeyPress(ENTER3, e)
          }
          ref={ENTER2}
      />

    </Form.Group></td>
                    <td><Form.Group controlId="description" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px'}}>
      
      <Form.Label >:تفصیل</Form.Label>

    </Form.Group></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                    <Form.Group controlId="remarks" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Remarks:</Form.Label>
      
    </Form.Group>
                    </td>
                    <td><Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
       type="text"
       id="code"
       placeholder="Remarks"
       name="itmremarks"
       className="form-control"
       value={user.itmremarks}
       style={{height:'24px' }}
       onChange={handleInputChange}
       onKeyDown={(e) =>
        handleEnterKeyPress(ENTER4, e)
      }
      ref={ENTER3}
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><Form.Group controlId="index" style={{  display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Index:</Form.Label>
      
    </Form.Group></td>
                    <td><Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
       type="text"
       id="code"
       placeholder="Index."
       name="itmindex"
       className="form-control"
       value={user.itmindex}
       style={{height:'24px'}}
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
                    <td><Form.Group controlId="status" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Status:</Form.Label>
     

    </Form.Group></td>
                    <td><Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center'}}>
     <Form.Control

as="select"

name="TItmSts"
value={user.TItmSts}
onChange={handleInputChange}
onKeyDown={(e) =>
  handleEnterKeyPress(ENTER6, e)
}
ref={ENTER5}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'70px'}}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
</Form.Control>

    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                    <Form.Group controlId="status" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px', }}>
      <Form.Label >UOM:</Form.Label>
   

    </Form.Group>
                    </td>
                    <td><Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
     <Form.Control

as="select"

name="uom"
value={user.uom}
onChange={handleInputChange}
onKeyDown={(e) =>
  handleEnterKeyPress(ENTER7, e)
}
ref={ENTER6}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'100px' }}
>
<option value="Number">Number</option>
      <option value="KG">KG</option>
      <option value="Liter">Liter</option>
      <option value="Gram">Gram</option>
      <option value="Half">Half</option>
      <option value="Full">Full </option>
</Form.Control>

    </Form.Group></td>
                    <td></td>
                    <td></td>

                  </tr>
                  
                  <tr>
                    <td><Form.Group controlId="remarks" style={{  display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Pur Rate:</Form.Label>
      
    </Form.Group></td>
                    <td><Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
       type="text"
       id="code"
       placeholder="Purchase Rate"
       className="form-control"
       name="TPurRat"
       value={user.TPurRat}
       style={{height:'24px', width:'80px',textAlign:'right' }}
       onChange={handleInputChange}
       onKeyDown={(e) =>
        handleEnterKeyPress(ENTER8, e)
      }
      ref={ENTER7}
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><Form.Group controlId="remarks" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Sale Rate:</Form.Label>
      
    </Form.Group></td>
                    <td><Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
       type="text"
       id="code"
       placeholder="Sale Rate"
       className="form-control"
       name="TSalRat"
       value={user.TSalRat}
       style={{height:'24px', width:'80px' ,textAlign:'right'}}
       onChange={handleInputChange}
       onKeyDown={(e) =>
        handleEnterKeyPress(ENTER9, e)
      }
      ref={ENTER8}
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><Form.Group controlId="remarks" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Disc Rate:</Form.Label>
      
    </Form.Group></td>
                    <td><Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Discount Rate"
        className="form-control"
        name="itmdis"
        value={user.itmdis}
        style={{height:'24px', width:'80px',textAlign:'right' }}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER10, e)
        }
        ref={ENTER9}
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><Form.Group controlId="status" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px',}}>
      <Form.Label >Category:</Form.Label>
     

    </Form.Group></td>
                    <td><Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center'}}>
     <Form.Control

as="select"

name="categoryId"
    value={user.TCtgId}
    onChange={(e) => {
      // setSelectedCategoryId(e.target.value);
      setUser((prevUser) => ({
        ...prevUser,
        TCtgId: e.target.value,
      }));
    }}
    style={{height:'27px', fontSize:'11px', width:'130px'}}
    onKeyDown={(e) =>
      handleEnterKeyPress(ENTER11, e)
    }
    ref={ENTER10}
    id="categoryIdd"
    className="form-control">
    {data.map((item) => (
      <option
        key={item.tctgid}
        value={item.tctgid}
      >
        {item.tctgdsc}
      </option>
    ))}
</Form.Control>

    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><Form.Group controlId="status" style={{ display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          marginRight: '10px', }}>
      <Form.Label >Item Type:</Form.Label>
     

    </Form.Group></td>
                    <td><Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
     <Form.Control

as="select"

name="TitmTyp"
value={user.TitmTyp}
onChange={handleInputChange}
onKeyDown={(e) =>
  handleEnterKeyPress(ENTER12, e)
}
ref={ENTER11}
className="form-control"
style={{height:'27px', fontSize:'11px', width:'130px'}}
>
<option value="Item Sale">Item Sale</option>
                      <option value="Item Purchase">Item Purchase</option>
                    
</Form.Control>

    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>


                  <tr>
                    <td></td>
                    <td><Button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "50%",
                      marginRight: "2%",
                    }}
                    
                    ref={ENTER12}
                    onClick={handleSubmit}
                  >
                    SUBMIT
                  </Button></td>
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
      <Footer/>
    </>
  );
}

export default Update_Item;