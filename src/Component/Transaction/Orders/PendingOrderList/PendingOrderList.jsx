import React from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import ReactToPrint from "react-to-print";
import Print from '../../../../image/print.png';
const PendingOrderList = ({
    orderList,
    handleRowClick,
    handleShowPrintModal,
    primaryColor,
    secondaryColor,
    Length,
    showitemsandadditem,
    showcartitemlist,
    ref,
    customScrollbarStyle,
    Receipt,
    getmovedata,
    priceDiscount,
    percentageDiscount,
    totalAmount,
}) => {
  return (
    <div
      style={{
        overflowY: 'auto',
        overflowX: 'hidden',
        fontSize: '11px',
      }}
    >
      <style>{customScrollbarStyle}</style>
      <MDBTable
                    scrollY
                    maxHeight="81vh"
                    striped
                    bordered
                    small
                    responsive
                  >
                    <MDBTableHead>
                      <tr>
                        {orderList.columns.map((column, columnIndex) => (
                          <th
                            key={columnIndex}
                            style={{
                              backgroundColor: primaryColor,
                              color: secondaryColor,
                              fontWeight: "bold",
                              position: "sticky",
                              top: -1,
                              zIndex: 1,
                            }}
                          >
                            {column.label}
                          </th>
                        ))}
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {orderList.rows.map((row, index) => (
                        <tr key={index}>
                          {Object.values(row).map((value, columnIndex) => (
                            <td
                              onDoubleClick={() => handleRowClick(row)}
                              key={columnIndex}
                              style={{
                                textAlign:
                                  columnIndex === 1 || columnIndex === 3
                                    ? "left"
                                    : columnIndex === 3
                                    ? "right"
                                    : "center",
                                width:
                                  columnIndex === 0
                                    ? "1%"
                                    : columnIndex === 1
                                    ? "20%"
                                    : columnIndex === 2
                                    ? "3%"
                                    : "auto",
                              }}
                            >
                              {value}
                            </td>
                          ))}
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showitemsandadditem(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Show Data
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary"
                              // onClick={showcartitemlist}
                              onClick={() => showcartitemlist(row)}
                              style={{
                                backgroundColor: primaryColor,
                                height: "24px",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "100%",
                              }}
                            >
                              Add Item
                            </button>
                          </td>
                          {/* Print icon in the last column */}



                          <td>
                          <ReactToPrint
  bodyClass="print-receipt"
  content={() => ref && ref.current}  // Make sure you define and pass a ref
  trigger={() => (
    <div>
      
      <img
        onClick={() => handleShowPrintModal(row)}
        src={Print}
        alt="Print"
        style={{ height: "4vh", width: "70%" }}
      />
    </div>
  )}
/>
                          {/* <img
        onClick={() => handleShowPrintModal(row)}
        src={Print}
        alt="Print"
        style={{ height: "4vh", width: "70%" }}
      />
                            */}
                            
                             


                          </td>
                          
                        </tr>
                      ))}

<div style={{ display: 'none' }}>
  <Receipt
    getmovedata={getmovedata}
    ref={ref}
    priceDiscount={priceDiscount}
    percentageDiscount={percentageDiscount}
    totalAmount={totalAmount}
  />
</div>


                      {/* Display blank rows to fill up to 91vh */}
                      {Array.from({
                        length: Math.max(
                          0,
                          Math.floor((100 * window.innerHeight) / 100) / 33
                        ),
                      }).map((_, index) => (
                        <tr key={`blank-${index}`}>
                          {Array.from({
                            length: orderList.columns.length,
                          }).map((_, colIndex) => (
                            <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                          ))}
                        </tr>
                      ))}
                      
                    </MDBTableBody>
                    
                    <MDBTableFoot
                      style={{ position: "sticky", bottom: 0, zIndex: 2 }}
                    >
                      <tr>
                        <th
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,
                          }}
                        ></th>
                        <th
                          colSpan={9}
                          style={{
                            backgroundColor: primaryColor,
                            color: secondaryColor,

                            textAlign: "left",
                          }}
                        >
                          {Length}
                        </th>
                      </tr>
                    </MDBTableFoot>
                  </MDBTable>
    </div>
  );
};

export default PendingOrderList;
