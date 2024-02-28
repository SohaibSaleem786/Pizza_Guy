// import React from 'react';
// import { MDBTable, MDBTableHead, MDBTableBody } from 'mdbreact';

// const PrintableReceipt = ({ newOrderData, detailItem, priceDiscount, percentageDiscount, totalAmount }) => {
//   return (
//     <div style={{ fontFamily: 'Courier, monospace', fontSize: '12px' }}>
//       <div style={{ textAlign: 'center' }}>
//         <h2>Malik Spicy Restaurant</h2>
//         <p>
//           176 A Sector C Commercial <br />
//           Bahria Town Lahore <br />
//           Delivery: 042-37862888/0 0300-7888478 <br /> 0300-7888479/0300-7888480
//         </p>
//       </div>

//       <div style={{ border: '3px solid black', margin: '10px auto', width: '70%' }}>
//         <h3>Sales Receipt</h3>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <p>Token Number: {newOrderData?.id}</p>
//         <p>Invoice Number: 432140</p>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <p>Date and Time: 01/03/2024 01:41:46 PM</p>
//       </div>

//       <MDBTable small>
//         <MDBTableHead>
//           <tr>
//             <th>Sr.</th>
//             <th>Item</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//           </tr>
//         </MDBTableHead>
//         <MDBTableBody>
//           {detailItem?.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.titmdsc}</td>
//               <td>{item.tsalrat}</td>
//               <td>{item.titmqnt}</td>
//               <td>{item.salamt}</td>
//             </tr>
//           ))}
//         </MDBTableBody>
//       </MDBTable>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <p>Total Items: {totalItem}</p>
//         <p>Total Amount: {tamtItems}</p>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//         <p>Amount Payable: {totalAmount}</p>
//       </div>
//     </div>
//   );
// };

// export default PrintableReceipt;