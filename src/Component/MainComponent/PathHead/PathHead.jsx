import React from "react";
import { useTheme } from "../../../ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import Left from '../../../image/left.png';
import Back from '../../../image/back.png';

// function PathHead({ pageName ,screen }) {
//   const { primaryColor, secondaryColor, pathHeight } = useTheme();
//   const navigate = useNavigate();

//   return (
//     <div
//       className="row"
//       style={{
//         background: primaryColor,
//         color: secondaryColor,
//         fontWeight: "bold",
//         height: pathHeight,
//         borderBottom: "1px solid red",
//         borderTop: "1px solid red",
//         display: "flex",
//         alignItems: "center", // Center vertically
//         justifyContent: "left", // Align to the left
//       }}
//     >
//        {screen === "CartItem" || screen === "OrderCategory" || screen === "OrderItem" || screen === "Checkout" ? (
//         <div>
//           {/* <button onClick={() => navigateToMainPage()}>Back</button> */}
//         </div>
//       ) : null}






//       <p style={{
//         marginLeft: '2%',
//       }}> 
//       {/* <img
//       src={Left}
//       alt="ITTEFAQ ELECTRONICS"
//       style={{ width: "2%" , marginRight: '2%'}}
//     /> */}
//     { pageName}</p>
      
//       {/* Media query for small screens */}
//       <style>
//         {`
//           @media (max-width: 768px) {
//             p {
//               font-size: 11px; 
//             }
           
//           }
//         `}
//       </style>
//     </div>
//   );
// }
function PathHead({ pageName, screen ,pageLink}) {
  const { primaryColor, secondaryColor, pathHeight } = useTheme();
  const navigate = useNavigate();



  return (
<div
  className="row"
  style={{
    background: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    height: pathHeight,
    borderBottom: "1px solid red",
    borderTop: "1px solid red",
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    fontFamily: 'Verdana',
  }}
>
  <div className="col-12" style={{ display: "flex", alignItems: "center" }}>
    {screen === "Item" || screen === "Get_Item" || screen === "Update_Item" ? (
      <img
      onClick={() => navigate(pageLink, { replace: true })}
      src={Back}
  alt="Login"
  className="login-image"
  style={{ marginLeft: '0.5%',height: "2rem", width: "2%" }}
/>

    ) : null}
    <div style={{ marginLeft: '1%' }}>
      {pageName}
    </div>
  </div>
</div>



  );
}

export default PathHead;
