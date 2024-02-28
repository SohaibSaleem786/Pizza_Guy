import Header from '../../../MainComponent/Header/Header';
import React, { useState,useRef } from 'react';
import axios from 'axios';
import Alert from "@mui/material/Alert";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '../../../../ThemeContext';
import PathHead from '../../../MainComponent/PathHead/PathHead';
import Footer from '../../../MainComponent/Footer/Footer';
function AccountCod() {
  const [values, setValues] = useState({
    accountDscc: '',
    addresss: '',
    mobilee: '',

    loading: false,
  });
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks ,fontFamily} = useTheme();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [alert, setAlert] = useState(null);
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    
   
    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append('accountDsc', values.accountDscc);
      formData.append('address', values.addresss);

      formData.append('mobile', values.mobilee);

      axios
        .post(
          `${apiLinks}/AccountCode.php`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
          }
        )
        // .then((res) => {
        //   console.log(res);
        // });
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/GetCategory");
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

<PathHead pageName="File > Account Code Maintenance" screen='Get_Item' pageLink="/MainPage"/>

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
          handleEnterKeyPress(ENTER4, e)
        }
        ref={ENTER3}
        style={{ height: '24px'  ,width:'270px'}}
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
                    
                    ref={ENTER4}
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

export default AccountCod;

// import Header from '../../Header/Header';
// import React, { useState } from 'react';
// import axios from 'axios';

// function AccountCod() {
//   const [values, setValues] = useState({
//     FCtgDscc: '',
//     FCtgStss: '',
//     loading: false,
//   });

//   const [alert, setAlert] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleInputChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleImageChange = (e) => {
//     console.log(e.target.files)
//     setSelectedImage(e.target.files[0]);
//   };

// //   const handleFormSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!selectedImage) {
// //       setAlert('Please select an image.');
// //       return;
// //     }
  
// //     setValues((prevState) => ({
// //       ...prevState,
// //       loading: true,
// //     }));
  
// //     try {
// //       const formData = new FormData()
// //       formData.append('FCtgDsc', values.FCtgDscc);
// //       formData.append('FCtgSts', values.FCtgStss);
// //       // formData.append('FCtgPic', selectedImage); // Append the selected image file to formData
// //   formData.append('pic' , selectedImage);
// //       axios.post(
// //         'https://www.crystalsolutions.com.pk/csres/add_category.php',
// //         formData,
// //         {
// //           headers: { 'Content-Type': 'multipart/form-data' },
// //         }
// //       ).then((res) => {
// //         console.log(res);
// //       });
      
  
// //       // if (response.status === 200) {
// //       //   setAlert('Image uploaded successfully.');
// //       //   console.log('Image uploaded successfully.');
// //       //   // Perform any additional actions on success
// //       // } else {
// //       //   throw new Error('Error storing user data');
// //       // }
// //     } catch (error) {
// //       setAlert('Error uploading image.');
// //       console.error(error);
// //     } finally {
// //       setValues((prevState) => ({
// //         ...prevState,
// //         loading: false,
// //       }));
// //     }
// //   };
  

//   return (
//     <>
//       <div className="col-12" style={{ color: 'black' }}>
//         <Header />
//         <div
//           className="row"
//           style={{
//             background: 'orange',
//             height: '40px',
//             textAlign: 'left',
//             borderBottom: '3px solid red',
//             borderTop: '3px solid red',
//           }}
//         >
//           <h3>Utilities {'>'} Account Code</h3>
//         </div>
//         <br />
//         <div
//           className="row"
//           style={{
//             marginLeft: '300px',
//             height: '430px',
//             width: '720px',
//             marginRight: '150px',
//             backgroundColor: '#FFD580',
//             color: 'black',
//             border: '10px solid orange',
//           }}
//         >
//           <div className="col-md-12">
//             <form
//               className="form"
//               style={{
//                 width: '600px',
//                 marginTop: '10px',
//                 fontSize: '11px',
//                 fontWeight: 'bold',
//                 textAlign: 'right',
//                 marginLeft: '25px',
//               }}
//             >
//               <div className="form-group" style={{ marginRight: '100px' }}>
                // <div className="row">
                //   <div className="col-md-3" style={{ marginBottom: '30px' }}>
                //     <label htmlFor="code">Id :</label>
                //   </div>
                //   <div className="col-md-9">
                //     <input
                //       type="text"
                //       id="code"
                //       placeholder="Id"
                //       name="FCtgDscc"
                //       className="form-control"
                //       value={values.FCtgDscc}
                //       onChange={handleInputChange}
                //     />
                //   </div>
                // </div>
                // <div className="row">
                //   <div className="col-md-3" style={{ marginBottom: '30px' }}>
                //     <label htmlFor="required">Description :</label>
                //   </div>
                //   <div className="col-md-9">
                //     <input
                //       type="text"
                //       name="FCtgStss"
                //       value={values.FCtgStss}
                //       onChange={handleInputChange}
                //       className="form-control"
                //       placeholder="Description"
                //     />
                //   </div>
                // </div>
                // <div className="row">
                //   <div className="col-md-3" style={{ marginBottom: '30px' }}>
                //     <label htmlFor="type">Status :</label>
                //   </div>
                //   <div className="col-md-9">
                //     <select id="type" className="form-control">
                //       <option value="">Yes</option>
                //       <option value="type1">No</option>
                //     </select>
                //   </div>
                // </div>
                // <div className="row">
                //   <div className="col-md-3" style={{ marginBottom: '30px' }}>
                //     <label htmlFor="type">Group :</label>
                //   </div>
                //   <div className="col-md-9">
                //     <select id="type" className="form-control">
                //       <option value="">Customer</option>
                //       <option value="type1">Expense</option>
                //       <option value="type1">Expense</option>

                //     </select>
                //   </div>
                // </div>
                // <div className="row">
                //   <div className="col-md-3" style={{ marginBottom: '30px' }}>
                //     <label htmlFor="code">Debit :</label>
                //   </div>
                //   <div className="col-md-9">
                //     <input
                //       type="text"
                //       id="code"
                //       placeholder="Purchase"
                //       name="FCtgDscc"
                //       className="form-control"
                //       value={values.FCtgDscc}
                //       onChange={handleInputChange}
                //     />
                //   </div>
                // </div>
                // <div className="row">
                //   <div className="col-md-3" style={{ marginBottom: '30px' }}>
                //     <label htmlFor="required">Credit :</label>
                //   </div>
                //   <div className="col-md-9">
                //     <input
                //       type="text"
                //       name="FCtgStss"
                //       value={values.FCtgStss}
                //       onChange={handleInputChange}
                //       className="form-control"
                //       placeholder="Sales Man Rate"
                //     />
                //   </div>
                // </div>
               



               




//                 <div style={{ marginRight: '50px' }}>
//                   <button
//                     className="btn btn-primary"
//                     style={{
//                       backgroundColor: 'orange',
//                       color: 'black',
//                       width: '280px',
//                     }}
//                     // onClick={handleFormSubmit}
//                   >
//                     Add Item
//                   </button>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//         <br />
//       </div>
//     </>
//   );
// }

// export default AccountCod;















