

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Header from '../../../MainComponent/Header/Header';
// import './AddCategory.css'
import React, { useState , useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from '../../../MainComponent/PathHead/PathHead';
import { useTheme } from '../../../../ThemeContext';
import Footer from '../../../MainComponent/Footer/Footer';

function Add_UOM() {
  const [values, setValues] = useState({
    uomdscc: '',
   
    uomstss: '',
     
    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("Yes");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor,secondaryColor,apiLinks,fontFamily } = useTheme();


  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById('pic-preview'); // Replace 'image1-preview' with the actual ID of your preview element
      imgElement.src = URL.createObjectURL(file);
    }
  }

const UserId =33;


  
  
const handleFormSubmit = async (e) => {
  e.preventDefault();
  const value = {
    uomstss: selectedStatus,
  };
  

  setValues((prevState) => ({
    ...prevState,
    loading: true,
  }));

  try {
    const formData = new FormData();
    formData.append('uomdsc', values.uomdscc);
    formData.append('uomsts', value.uomstss);
    console.log('Form Data:', formData);

    axios
      .post(
        `${apiLinks}/add_uom.php`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )

      
      .then((response) => {
        console.log('API Response:', response.data); // Log the response here

        if (response.data.error === 200) {
          console.log(response.data.message);
          navigate('/Get_UOM');
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
      
          // Hide the success alert after 1 second
          setTimeout(() => {
            setAlertData(null);
          }, 1000);
        } else {
          console.log(response.data.message);
          setAlertData({
            type: "error",
            message: `${response.data.message}`,
          });
      
          // Hide the error alert after 2 seconds
          setTimeout(() => {
            setAlertData(null);
          }, 2000);
          // ... rest of your code ...
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlert('Error submitting the form.');
      });

    // Reset form values after submission
    setValues({
      uomdscc: '',
      uomstss: '',
      loading: false,
    });

    setAlert('Image uploaded successfully.');
  } catch (error) {
    setAlert('Error uploading image.');
    console.error(error);
  } finally {
    setValues((prevState) => ({
      ...prevState,
      loading: false,
    }));
  }
};


//////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

   // Create refs for each input field
   const ENTER1 = useRef(null);
   const ENTER2 = useRef(null);
   const ENTER3 = useRef(null);

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

<PathHead pageName="File > UOM Maintenance > Add UOM" screen='Get_Item' pageLink="/Get_UOM"/>

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
            <Form onSubmit={handleFormSubmit}>
            <div className="row">
  {/* Left side (label and input field) */}

      <table>
        <tbody>
          <tr>
            <td>    <Form.Group controlId="description" style={{  display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Description:</Form.Label>
      
    </Form.Group></td>
            <td>    <Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        placeholder="Description"
        name="uomdscc"
        value={values.uomdscc}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER2, e)
        }
        ref={ENTER1}
        style={{ height: '24px' }}
      />
    </Form.Group></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td><Form.Group controlId="status" style={{  display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px',}}>
      <Form.Label >Status:</Form.Label>

    </Form.Group></td>
            <td><Form.Group controlId="status" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        as="select"
        name="uomstss"
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER3, e)
        }
        ref={ENTER2}
        style={{ height: '30px', width: '100px', fontSize: '11px' }}
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
            <Button
                    className="btn btn-primary"
                    style={{
                      backgroundColor: primaryColor,
                      height: "4%",
                      fontSize: "11px",
                      color: secondaryColor,
                      width: "50%",
                    }}
                    onClick={handleFormSubmit}
                    
                    ref={ENTER3}
                  >
                    SUBMIT
                  </Button>
            </td>
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

export default Add_UOM;