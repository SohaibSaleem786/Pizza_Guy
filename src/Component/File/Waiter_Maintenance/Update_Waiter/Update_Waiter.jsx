

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect ,useRef } from "react";
import Header from '../../../MainComponent/Header/Header';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PathHead from '../../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../../ThemeContext';
import Footer from '../../../MainComponent/Footer/Footer';

function Update_Waiter() {
  const navigate = useNavigate();
  const { w_id } = useParams();
  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks,fontFamily } = useTheme();

  const imageurl = `${apiLinks}/ctgImg/`;

  const [user, setUser] = useState({
    w_id: '',
    w_name: '',
    w_mobile:'',
    w_add: '',
    w_status:'',

  });

  useEffect(() => {
    fetch(
      `${apiLinks}/WaiterList.php?w_id=${w_id}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.w_id === w_id);
        setUser(user);
        setPreviewImage(user.tctgpic ? imageurl + user.tctgpic : '');


      })
      .catch((error) => console.error(error));
  }, [w_id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  
  const [values, setValues] = useState({
    FCtgDscc: "",
    FCtgStss: "",
    pic1 : '',
    loading: false,
  });

  const [selectedStatus, setSelectedStatus] = useState("");

  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  

  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic1-preview");
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


  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = new FormData();
    requestBody.append("id", user.w_id);
    requestBody.append("name", user.w_name);
    requestBody.append("address", user.w_add);
    requestBody.append("mobile", user.w_mobile);
    requestBody.append("status", user.w_status);
    // if (selectedImage1) {
    //   requestBody.append("pic1", selectedImage1);
    // }

    axios
      .post(
        `${apiLinks}/UpdateWaiter.php?w_id=${w_id}`,
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
            navigate("/Get_Waiter");
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
      document.getElementById("pic1-preview").src = URL.createObjectURL(selectedImage1);
    }
  }, [selectedImage1]);

/////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

   // Create refs for each input field
   const ENTER1 = useRef(null);
   const ENTER2 = useRef(null);
   const ENTER3 = useRef(null);
   const ENTER4 = useRef(null);
   const ENTER5 = useRef(null);
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

<PathHead pageName="File > Waiter Maintenance > Update Waiter" screen='Get_Item' pageLink="/Get_Waiter"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold',fontFamily:fontFamily }}>
        

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
            maxWidth: "400px",
            margin: "20px 0",
            fontSize:'12px',
            border: "1px solid black",position: "absolute",
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
                    <td>  <Form.Group controlId="Id" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Id:</Form.Label>
      
    </Form.Group></td>
                    <td>  <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
         type="text"
         id="code" 
         placeholder=" Id"
         className="form-control"
         name="w_id"
         value={user.w_id}
         style={{height:'24px', width:'70px' }}
         onChange={handleInputChange}
         disabled
      />
    </Form.Group></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {/* display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', */}
                        <tr>
                          <td>  <Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Name:</Form.Label>
      
    </Form.Group></td>
                          <td>  <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center'}}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Description"
        className="form-control"
        name="w_name"
        value={user.w_name}
        style={{height:'24px'}}
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
                          <td>  <Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Address:</Form.Label>
      
    </Form.Group></td>
                          <td>  <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center'}}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Address"
        className="form-control"
        name="w_add"
        value={user.w_add}
        style={{height:'24px'}}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER3, e)
        }
        ref={ENTER2}
      />
    </Form.Group></td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>  <Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Mobile:</Form.Label>
      
    </Form.Group></td>
                          <td>  <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center'}}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Address"
        className="form-control"
        name="w_mobile"
        value={user.w_mobile}
        maxLength={11}
        style={{height:'24px',width:'120px'}}
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
                          <td>  <Form.Group controlId="status" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Status:</Form.Label>


    </Form.Group></td>
                          <td>  <Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
     <Form.Control

as="select"

  name="w_status"
  value={user.w_status}
  onChange={handleInputChange}
  onKeyDown={(e) =>
    handleEnterKeyPress(ENTER5, e)
  }
  ref={ENTER4}
  className="form-control"
  style={{ height: '27px', fontSize: '11px', width: '70px'}}
>
  <option value="Yes">Yes</option>
  <option value="No">No</option>
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
                    onClick={handleSubmit}
                    
                    ref={ENTER5}
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

export default Update_Waiter;