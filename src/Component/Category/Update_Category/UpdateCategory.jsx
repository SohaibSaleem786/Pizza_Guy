import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import React, { useState, useEffect ,useRef} from "react";
import Header from "../../MainComponent/Header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import Footer from '../../MainComponent/Footer/Footer';

function UpdateCategory() {
  const navigate = useNavigate();
  const { tctgid } = useParams();
  const [previewImage1, setPreviewImage] = useState('');
  const [previewImage2, setPreviewImage2] = useState('');
  const [previewImage3, setPreviewImage3] = useState('');
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks ,fontFamily} = useTheme();

  const imageurl = `${apiLinks}/ctgImg/`;

  const [user, setUser] = useState({
    tctgid: '',
    tctgdsc: '',
    remarks:'',
    ctindexs:'',
    tctgsts: '',
    tctgpic: '',

  });

  useEffect(() => {
    fetch(
      `${apiLinks}/get_category.php?tctgid=${tctgid}`
    )
      .then((response) => response.json())
      .then((apiData) => {
        const user = apiData.find((item) => item.tctgid === tctgid);
        setUser(user);
        setPreviewImage(user.tctgpic ? imageurl + user.tctgpic : '');


      })
      .catch((error) => console.error(error));
  }, [tctgid]);

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
    requestBody.append("FCtgDsc", user.tctgdsc);
    requestBody.append("remarks", user.remarks);
    requestBody.append("index", user.ctindexs);
    requestBody.append("FCtgSts", user.tctgsts);
    requestBody.append("FCtgId", user.tctgid);
    requestBody.append("pic1", selectedImage1);
    // if (selectedImage1) {
    //   requestBody.append("pic1", selectedImage1);
    // }

    axios
      .post(
        `${apiLinks}/update_category.php?tctgid=${tctgid}`,
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
            navigate("/GetCategory");
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

<PathHead pageName="File > Category Maintenance > Update Category" screen='Get_Item' pageLink="/GetCategory"/>

      <div className="col-12" style={{ color: 'black' ,fontWeight:'bold' ,fontFamily:fontFamily}}>
        

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
            maxWidth: "500px",
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
  {/* Left side (label and input field) */}



  <div className="col-12">
    <table>
      <tbody>
        <tr>
          <td>  <Form.Group controlId="Id" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Id :</Form.Label>
      
    </Form.Group></td>
          <td>  <Form.Group controlId="Id" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
         type="text"
         id="code"
         placeholder=" Id"
         className="form-control"
         name="tctgid"
         value={user.tctgid}
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
          <td><Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Description:</Form.Label>
      
    </Form.Group>
            </td>
            
            <td><Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Description"
        className="form-control"
        name="tctgdsc"
        value={user.tctgdsc}
        style={{height:'24px', width:'270px'}}
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
            <td><Form.Group controlId="remarks" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Remarks:</Form.Label>
      
    </Form.Group></td>
            <td><Form.Group controlId="remarks" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Remarks"
        className="form-control"
        name="remarks"
        value={user.remarks}
        style={{height:'24px', width:'270px' }}
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
              <td><Form.Group controlId="index" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Index:</Form.Label>
      
    </Form.Group></td>
              <td><Form.Group controlId="index" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        id="code"
        placeholder="Index"
        className="form-control"
        name="ctindexs"
        value={user.ctindexs}
        style={{height:'24px', width:'70px' }}
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
                <td><Form.Group controlId="status" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Status:</Form.Label>


    </Form.Group></td>
                <td><Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
     <Form.Control

as="select"

  name="tctgsts"
  value={user.tctgsts}
  onChange={handleInputChange}
  onKeyDown={(e) =>
    handleEnterKeyPress(ENTER5, e)
  }
  ref={ENTER4}
  className="form-control"
  style={{ height: '27px', fontSize: '11px', width: '70px' }}
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
                  <td>
                  <div style={{ display: 'flex', marginBottom: '30px' }}>
      <div style={{ flex: 1,  textAlign: 'center' }}>
        <label htmlFor="pic" style={{ display: 'block', marginBottom: '10px' ,textAlign:'left' }}>Category Pic: </label>
        <label
                      htmlFor="pic1"
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
      justifyContent: "left",
      alignItems: "left",
    }}
  >
    <span
      style={{
        fontSize: "11px",
        color: "#aaa",
        marginBottom: "5px",
      }}
    >
      Click to Upload
    </span>
    <img
      id="pic1-preview"
      src={previewImage1}
      alt="Category"
      style={{ width: '100%', height: '60px' }}
    />
    <input
      type="file"
      id="pic1"
      style={{ display: "none" }}
      onChange={handleImageChange1}
    />
  </div>
                    </label>
      </div>
    </div>
                  </td>
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
                    onClick={handleSubmit}
                    
                    ref={ENTER5}
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

export default UpdateCategory;