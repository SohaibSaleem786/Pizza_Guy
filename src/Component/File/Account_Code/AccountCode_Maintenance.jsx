import Header from '../../MainComponent/Header/Header';
import React, { useState,useRef ,useEffect } from 'react';
import axios from 'axios';
import Alert from "@mui/material/Alert";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import PathHead from '../../MainComponent/PathHead/PathHead';
import Footer from '../../MainComponent/Footer/Footer';
import { useTheme } from '../../../ThemeContext';
function Account_Code_Maintenance() {
  const [values, setValues] = useState({
    accountDscc: '',
    addresss: '',
    mobilee: '',

    loading: false,
  });
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks ,fontFamily} = useTheme();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState("Startup");

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [alert, setAlert] = useState(null);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
   const value = {
      selectedCategoryIdd: selectedCategoryId,
    }
   
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append('accountDsc', values.accountDscc);
      formData.append('address', values.addresss);
      
      formData.append('code', value.selectedCategoryIdd);
    
      formData.append('mobile', values.mobilee);
      console.log(value.selectedCategoryIdd,'SDKLFHSDL');

      axios
        .post(
          `${apiLinks}/AccountCodeMaintinance.php`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
       
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/Get_AccountMaintenance");
            }, 3000);
            
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

      // Reset form values after submission
      setValues({
        FCtgDscc: '',
        FCtgStss: '',
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



   const [data, setData] = useState([]);

   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await fetch(`${apiLinks}/GetAccountHead.php`);
         if (!response.ok) {
           throw new Error("Failed to fetch data");
         }
 
         const apiData = await response.json();
         setData(apiData);
 
         // Set the selectedCategoryId with the first category ID from the API data
         if (apiData.length > 0) {
           setSelectedCategoryId(apiData[0].acccode);
         }
       } catch (error) {
         console.error(error);
       }
     };
 
     fetchData();
   }, []);
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

<PathHead pageName="File > Account Code Maintenance" screen='Get_Item' pageLink="/Get_AccountMaintenance"/>

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
            <Form onSubmit={handleFormSubmit}>
            <div className="row">

              <div className='col-12'>
              <table>
              <tbody>
             
                <tr>
                  <td ><Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Description:</Form.Label>
     
    </Form.Group></td>
                  <td colSpan={2}><Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        placeholder="Description"
        name="accountDscc"
        value={values.accountDscc}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER2, e)
        }
        ref={ENTER1}
        style={{ height: '24px'  ,width:'270px'}}
      />
    </Form.Group></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td ><Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Address:</Form.Label>
     
    </Form.Group></td>
                  <td colSpan={2}><Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        placeholder="Address"
        name="addresss"
        value={values.addresss}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER3, e)
        }
        ref={ENTER2}
        style={{ height: '24px'  ,width:'270px'}}
      />
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
                        Account Head:
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
                          handleEnterKeyPress(ENTER4, e)
                        }
                        ref={ENTER3}
                        id="categoryIdd"
                        style={{
                          height: "27px",
                          fontSize: "11px",
                          width: "120px", 
                        }}
                        className="form-control"
                      >
                        {data.map((item) => (
                          <option key={item.acccode} value={item.acccode}>
                            {item.accdsc}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group></td>
                        <td></td>
                        <td></td>
                      </tr>
                <tr>
                  <td ><Form.Group controlId="description" style={{ display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', }}>
      <Form.Label >Mobile:</Form.Label>
     
    </Form.Group></td>
                  <td colSpan={2}><Form.Group controlId="description" style={{ display: 'flex', alignItems: 'center' }}>
      <Form.Control
        type="text"
        placeholder="Mobile"
        name="mobilee"
        value={values.mobilee}
        onChange={handleInputChange}
        onKeyDown={(e) =>
          handleEnterKeyPress(ENTER5, e)
        }
        ref={ENTER4}
        maxLength={11}
        style={{ height: '24px'  ,width:'120px'}}
      />
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
                    }}
                    onClick={handleFormSubmit}
                    
                    ref={ENTER5}
                  >
                    SUBMIT
                  </Button></td>
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

export default Account_Code_Maintenance;