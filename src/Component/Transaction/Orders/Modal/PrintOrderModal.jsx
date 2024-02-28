import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody, MDBTableFoot } from "mdbreact";
import { useTheme } from "../../../../ThemeContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Example import statement, adjust as needed

const PrintOrderModal = ({
  show,
  onHide,
  // getpricepercentagediscount,
  //   totalItem,
  //   tamtItems,
  Length,
  //   detailItem,
  newOrderData,
  priceDiscount,
  handlePriceDiscountChange,
  percentageDiscount,
  handlePercentageDiscountChange,
  totalAmount,
  getpricefrommodal,
  handleClick,
  isInvoiceGenerated,
  ref,
  fetchData,
  PendfetchData,
  refreshState,
  setShowPrintModal,
  handleShowPrintModal,
  InvoiceGenereateAPI,
}) => {
  const { primaryColor, secondaryColor, apiLinks } = useTheme();
  const navigate = useNavigate();

  const [tamtItems, settamtItems] = useState([]);
  const [totalItem, settotalItem] = useState([]);
  const [detailItem, setDetailItem] = useState([]);
  const [getorder, setorder] = useState([]);

  // const [Length, setLength] = useState("");
  console.log("filteredRows:", detailItem);
  console.log("newOrderDatass:", newOrderData?.id);
  const showOrderListt = newOrderData?.id;

  useEffect(() => {
    setorder(newOrderData?.id);
  }, [newOrderData?.id]);
  console.log("getorder", getorder);
  const fetchMenuItems = () => {
    if (!showOrderListt) {
      // console.error("Order ID is not available");
      return;
    }

    const apiUrl = `${apiLinks}/Cart_Item.php`;
    const formData = new URLSearchParams({
      orderid: getorder,
    }).toString();

    axios
      .post(apiUrl, formData)
      .then((response) => {
        settamtItems(response.data.totalAmt.toLocaleString());
        settotalItem(response.data.totalitem);
        setDetailItem(response.data.detail);
        console.log("Total Items: ", response.data.totalitem);
        console.log("Total Amount: ", response.data.totalAmt);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // const disAmmt = perDicAmtt,
  function Discount() {
    const data = {
      orderId: getorder,
      disAmt  : getpricefrommodal,
    };
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/Discount.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
    
          
          setAlertData({
            type: "success",
            message: `${response.data.message}`,
          });
          setTimeout(() => {
            setAlertData(null);
            
            handleClick();
          }, 500);
       
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
  const [alertData, setAlertData] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, [getorder]);

  const [showPrice, setShowPrice] = useState(true);
  const [showPercentage, setShowPercentage] = useState(false);
  const handleToggle = (type) => {
    if (type === "price") {
      
      setShowPrice(true);
      setShowPercentage(false);
    } else if (type === "percentage") {
      setShowPrice(false);
      setShowPercentage(true);
    }
  };

  
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.1) !important",
      }}
    >
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#ac1e1e", color: "white" }}
      >
        <Modal.Title>Add Discount</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="col-12">
          <MDBTable striped bordered small responsive maxHeight="43vh">
            <MDBTableHead>
              <tr>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Sr.
                </th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Item
                </th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Price
                </th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                  }}
                >
                  Qnt
                </th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontWeight: "bold",
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    width: "90px",
                  }}
                >
                  Total
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {detailItem &&
                detailItem.map((item, index) => (
                  <tr key={index}>
                    <td style={{ width: "1%" }}>{index + 1}</td>
                    <td style={{ width: "50%", textAlign: "left" }}>
                      {item.titmdsc}
                    </td>
                    <td>{item.tsalrat}</td>
                    <td>{item.titmqnt}</td>
                    <td>{item.salamt}</td>
                  </tr>
                ))}
              {Array.from({
                length: Math.max(
                  0,
                  Math.floor((100 * window.innerHeight) / 100) / 100
                ),
              }).map((_, index) => (
                <tr key={`blank-${index}`}>
                  {Array.from({
                    length: 5,
                  }).map((_, colIndex) => (
                    <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
                  ))}
                </tr>
              ))}
            </MDBTableBody>
            <MDBTableFoot style={{ position: "sticky", bottom: 0, zIndex: 2 }}>
              <tr>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                ></th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                ></th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    textAlign: "left",
                  }}
                ></th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  {totalItem}
                </th>
                <th
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  {tamtItems}
                </th>
              </tr>
            </MDBTableFoot>
          </MDBTable>
        </div>
        <table>
          <tbody style={{ textAlign: "right" }}>
            <tr>
              <td>
                <button
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontSize: "12px",
                    height: "30px",
                    width: "100%",
                    border: "none",
                    borderRadius: "5px",
                    background: showPrice ? "green" : primaryColor, // Change background color if showPrice is true
                  }}
                  onClick={() => {
                    handleToggle("price");
                  }}
                >
                  Fixed
                </button>
              </td>

              <td>
                <button
                  style={{
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                    fontSize: "12px",
                    height: "30px",
                    width: "100%",
                    border: "none",
                    borderRadius: "5px",
                    background: showPercentage ? "green" : primaryColor, // Change background color if showPercentage is true
                  }}
                  onClick={() => {
                    handleToggle("percentage");
                   
                  }}
                >
                  Percentage
                </button>
              </td>
              <td>
                {showPrice && (
                  <input
                    type="number"
                    placeholder="Price Discount"
                    style={{ width: "70px", textAlign: "right" }}
                    value={priceDiscount}
                    onChange={handlePriceDiscountChange}
                  />
                )}
              </td>
              <td>
                {showPercentage && (
                  <input
                    type="number"
                    placeholder="Percentage Discount"
                    style={{ width: "70px", textAlign: "right" }}
                    maxLength={3}
                    value={percentageDiscount}
                    onChange={handlePercentageDiscountChange}
                  />
                )}
              </td>
            </tr>
            <tr>
              <td>Net Payable:</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClick}>
          No
        </Button>

        <Button
          onClick={Discount}
          style={{
            backgroundColor: primaryColor,
            color: secondaryColor,
          }}
        >
          Yes
         
        </Button>

        <></>
      </Modal.Footer>
    </Modal>
  );
};

export default PrintOrderModal;