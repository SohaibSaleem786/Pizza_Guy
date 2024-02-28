

  

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Header from './MainComponent/Header/Header';


// function AddCategory1() {
//   const [values, setValues] = useState({
//     FCtgDsc: '',
//     FCtgSts: '',
//     loading: false,
//   });

//   const [alert, setAlert] = useState(null);

//   const handleInputChange = (e) => {
//     setValues({ ...values, [e.target.name]: e.target.value });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setValues((prevState) => ({
//       ...prevState,
//       loading: true,
//     }));

//     try {
//       const response = await axios.post(
//         'https://www.crystalsolutions.com.pk/csres/add_category.php',
//         {
//           FCtgDsc: values.FCtgDsc,
//           FCtgSts: values.FCtgSts,
//         },
//         {
//           headers: { 'Content-Type': 'application/json' },
//         }
//       );

//       if (response.ok) {
//         // User data stored successfully
//       } else {
//         // Error storing user data
//         throw new Error('Error storing user data');
//       }
//     } catch (error) {
//       console.error('Error storing user data:', error);
//       setAlert({ type: 'error', message: 'Error storing user data' });
//     } finally {
//       setValues((prevState) => ({
//         ...prevState,
//         loading: false,
//       }));
//     }
//   };

//   // const [selectedImage, setSelectedImage] = useState(null);

//   // const handleImageChange = (event) => {
//   //   const file = event.target.files[0];
//   //   setSelectedImage(URL.createObjectURL(file));
//   // };

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
//           <h3>Category &gt; Add Category</h3>
//         </div>
//         <br />
//         <br />
//         <div
//           className="row"
//           style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <div
//             className="col-md-6"
//             style={{
//               backgroundColor: '#FFD580',
//               color: 'black',
//               border: '10px solid orange',
//               borderRadius: '10px',
//               padding: '20px',
//             }}
//           >
//             <form>
//               {/* <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                 <label
//                   htmlFor="imageInput"
//                   style={{
//                     backgroundColor: 'orange',
//                     color: 'white',
//                     padding: '10px 20px',
//                     borderRadius: '5px',
//                     border: 'none',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   Select Image
//                 </label>
//                 <input
//                   type="file"
//                   id="imageInput"
//                   onChange={handleImageChange}
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                 />
//               </div>
//               {selectedImage && (
//                 <div style={{ textAlign: 'center', marginBottom: '20px' }}>
//                   <img
//                     src={selectedImage}
//                     alt="Selected"
//                     width="400"
//                     height="200"
//                     style={{ borderRadius: '10px' }}
//                   />
//                 </div>
//               )} */}
//               <div className="row">
//                 <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                   <label htmlFor="code">Name:</label>
//                 </div>
//                 <div className="col-md-9">
//                   <input
//                     type="text"
//                     id="code"
//                     placeholder="Name"
//                     name="FCtgDsc"
//                     className="form-control"
//                     value={values.FCtgDsc}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div className="row">
//                 <div className="col-md-3" style={{ marginBottom: '30px' }}>
//                   <label htmlFor="code">Status:</label>
//                 </div>
//                 <div className="col-md-9">
//                   <input
//                     type="text"
//                     id="code"
//                     placeholder="Status"
//                     name="FCtgSts"
//                     className="form-control"
//                     value={values.FCtgSts}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//               </div>
//               <div style={{ textAlign: 'center' }}>
//                 <button
//                   className="btn btn-primary"
//                   style={{
//                     backgroundColor: 'orange',
//                     color: 'black',
//                     width: '180px',
//                     borderRadius: '5px',
//                     border: 'none',
//                     padding: '10px 20px',
//                     fontSize: '16px',
//                     fontWeight: 'bold',
//                   }}
//                   onClick={handleFormSubmit}
//                 >
//                   {values.loading ? 'Submitting...' : 'SUBMIT'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         {/* <br /> */}
//         {/* <Footer /> */}
//       </div>
//     </>
//   );
// }

// export default AddCategory1;





