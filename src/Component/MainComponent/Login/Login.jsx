// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
import Resturant from '../../../image/Resturant.jpg';
import Malik from "../../../image/malik.png";
// import Crystal from "../../../image/logo.png";
// import axios from "axios";
// // import { useAuth } from "../../AuthContext"; // Adjust the path based on your project structure
// import { ToastContainer, toast } from "react-toastify";
// import Alert from "@mui/material/Alert";
// import GRMETAL from '../../../image/grmetal.png';
// import Metal from '../../../image/metal.jpg'
// import { useTheme } from "../../../ThemeContext";
// function Login() {
//   const navigate = useNavigate();
//   const userid = useRef();
//   const password = useRef();
//   const [alertData, setAlertData] = useState(null);
//   const { primaryColor,secondaryColor ,fontFamily} = useTheme();

//   const [userData, setUserData] = useState({
//     userid: "",
//     password: "",
//     loading: false,
//   });

//   // const { isLoggedIn, userData, login } = useAuth();

//   function UserLogin() {
//     const data = {
//       userid: userid.current.value,
//       password: password.current.value,
//     };
//     const formData = new URLSearchParams(data).toString();

//     axios
//       .post("https://crystalsolutions.com.pk/malikspicy/login.php", formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       })
//       .then((response) => {
//         if (response.data.error === 200) {
//           localStorage.setItem("isLoggedIn", "true");
//           localStorage.setItem("user", JSON.stringify(response.data.user));
//           // navigate("/MainPage");
//           setAlertData({
//             type: "success",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//             navigate("/MainPage");
//           }, 500);
//           // Display a success toast
//           // toast.success("Login successful!", {
//           //   position: toast.POSITION.TOP_CENTER,
//           // });
//         } else {
//           console.log(response.data.message);

//           setAlertData({
//             type: "error",
//             message: `${response.data.message}`,
//           });
//           setTimeout(() => {
//             setAlertData(null);
//           }, 2000);
//         }
//       })
//       .catch((error) => {
//         // Handle errors
//         console.error("Error:", error);
//       });
//   }

//   return (
//     <>
//     <div style={{
//           position: "relative",
//           width: "100%",
//           height: "100vh",
//           overflow: "hidden",
//           fontFamily:fontFamily,
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
//       <div className="row">
//         <div className="col-6 ">
//           <img
//             src={Resturant}
//             alt="Login"
//             className="login-image"
//             style={{ height: "78%", width: "100%" }}
//           />
//         </div>
//         <div className="col-6" style={{ padding: "4%" }}>
//           <div
//             style={{
//               borderTop: `3px solid ${primaryColor}`,
//   borderRight: `3px solid ${primaryColor}`,
//   borderLeft: `3px solid ${primaryColor}`,
//   borderBottom: `3px solid ${primaryColor}`,
//             }}
//           >
//             <div className="col" style={{ marginLeft: "25%" }}>
//               <br />
//               <img
//                 src={Malik}
//                 alt="Login"
//                 style={{ marginLeft: "6%", height: "200px", width: "50%" }}
//               />

//               <div>
//                 <input
//                   type="text"
//                   id="userid"
//                   name="userid"
//                   ref={userid}
//                   style={{ width: "65%", padding: "2%", marginBottom: "2%" }}
//                   placeholder="ID"
//                   required
//                 />
//                 <br />
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   ref={password}
//                   style={{ width: "65%", padding: "2%", marginBottom: "2%" }}
//                   placeholder="Password"
//                   required
//                 />
//               </div>
//               <br />
//               <button
//                 style={{
//                   backgroundColor: primaryColor,
//                   border: `1px solid ${primaryColor}`,
//                   width: "65%",
//                   padding: "2%",
//                   color: "white",
//                 }}
//                 type="submit"
//                 className="login-button"
//                 disabled={userData.loading}
//                 onClick={UserLogin}
//               >
//                 Log In
//               </button>       
//               <br />
//               <br />
//               <button
//                 style={{
//                   backgroundColor: primaryColor,
//                   border: `1px solid ${primaryColor}`,
//                   width: "65%",
//                   padding: "2%",
//                   color: "white",
//                 }}
//                 type="submit"
//                 className="login-button"
//                 disabled={userData.loading}
//               >
//                 Home Delivery
//               </button>

//               <p style={{ display: "inline-block;", marginLeft: "10%" }}>
//                 <img
//                   src={Crystal}
//                   style={{ height: "21%", width: "15%", marginRight: "5%",          fontFamily:fontFamily,
//                 }}
//                 />
//                 Crystal Solution
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       </div>

//     </>
//   );
// }

// export default Login;




import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../Login/Login.css';
import Shop from '../../../image/metal.jpg';
import Metal from "../../../image/grmetal.png";
import Crystal from "../../../image/logo.png";
import axios from "axios";
// import { useAuth } from "../../AuthContext"; // Adjust the path based on your project structure
import { ToastContainer, toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import GRMETAL from '../../../image/grmetal.png';
import { useTheme } from "../../../ThemeContext";
function Login() {
  const navigate = useNavigate();
  const userid = useRef();
  const password = useRef();
  const [alertData, setAlertData] = useState(null);
  const { primaryColor,secondaryColor,apiLinks } = useTheme();

  const [userData, setUserData] = useState({
    userid: "",
    password: "",
    loading: false,
  });

  // const { isLoggedIn, userData, login } = useAuth();

  function UserLogin() {
    const data = {
      userid: userid.current.value,
      password: password.current.value,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/login.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("user", JSON.stringify(response.data.user));
          // navigate("/MainPage");
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            navigate("/MainPage",{replace: true }); 
          }, 500);
          // Display a success toast
          // toast.success("Login successful!", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
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
  }


   // Create refs for each input field
   const Enter1 = useRef(null);
   const Enter2 = useRef(null);
   const Enter3 = useRef(null);
 
 
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
    <div style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          fontFamily: 'Verdana',
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
      <div className="row" >
        <div className="col-6 ">
          <img
            src={Resturant}
            alt="Login"
            className="login-image"
            style={{ height: "100vh", width: "100%" }}
          />
        </div>
        <div className="col-6" style={{ padding: "7vh"  ,position: "absolute",
                top: "50%",
                left: "75%",
                transform: "translate(-50%, -50%)",}}>
          <div
            style={{
              borderTop: `3px solid ${primaryColor}`,
  borderRight: `3px solid ${primaryColor}`,
  borderLeft: `3px solid ${primaryColor}`,
  borderBottom: `3px solid ${primaryColor}`,
            }}
          >
            <div className="col" style={{ marginLeft: "25%" }}>
              <br />
              <img
                src={Malik}
                alt="Login"
                style={{ marginLeft: "6%", height: "33vh", width: "50%" }}
              />

              <div>
                <input
                  type="text"
                  id="userid"
                  name="userid"
                  ref={userid }
                  style={{ width: "65%", padding: "2%", marginBottom: "2%" }}
                  placeholder="ID"
                  required
                  onKeyDown={(e) =>
                    handleEnterKeyPress(password, e)
                  }
                />
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  ref={password }
                  style={{ width: "65%", padding: "2%", marginBottom: "2%" }}
                  placeholder="Password"
                  required
                  onKeyDown={(e) =>
                    handleEnterKeyPress(Enter3, e)
                  }
                />
              </div>
              <br />
              <button
                style={{
                  backgroundColor: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  width: "65%",
                  padding: "2%",
                  color: secondaryColor,
                }}
                type="submit"
                className="login-button"
                disabled={userData.loading}
                onClick={UserLogin}
                
                ref={Enter3}
              >
                Log In
              </button>       
              <br />
              <br />
              {/* <button
                style={{
                  backgroundColor: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  width: "65%",
                  padding: "2%",
                  color: secondaryColor,
                }}
                type="submit"
                className="login-button"
                disabled={userData.loading}
              >
                Home Delivery
              </button> */}

              <p style={{ display: "inline-block;", marginLeft: "10%" }}>
                <img
                  src={Crystal}
                  style={{ height: "21%", width: "15%", marginRight: "5%" }}
                />
                Crystal Solution
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>

    </>
  );
}

export default Login;


