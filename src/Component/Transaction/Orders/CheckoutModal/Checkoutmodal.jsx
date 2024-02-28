import React, { useState, useEffect } from 'react';
import { Container, Form, Modal, Button, Row, Col, Card } from 'react-bootstrap';
import { useTheme } from '../../../../ThemeContext';
import axios from 'axios';
import Alert from "@mui/material/Alert";

const CheckoutModal = ({ show, onHide, totalAmount, getdiscountamount ,orderid,handleCheckoutClose,setShowCheckoutModalfun,tamtItems,totalItem,getpayable}) => {
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();
  const [alertData, setAlertData] = useState(null);

  const [selectedCreditId, setSelectedCreditId] = useState("");
  const [getMOP, setDataMOP] = useState([]);
  const [getdatacredit, setDataCredit] = useState([]);
  const [showCreditDropdown, setShowCreditDropdown] = useState(false);
  const [clickedCreditCardIndex, setClickedCreditCardIndex] = useState(null);

  useEffect(() => {
    const fetchDataMOP = async () => {
      try {
        const response = await fetch(`${apiLinks}/get_payment_mode.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const apiData = await response.json();
        setDataMOP(apiData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataMOP();
  }, []);
  const [getmopid, setmopid] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiLinks}/GetAccount.php`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const apiData = await response.json();
        setDataCredit(apiData);
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (index) => {
    console.log(getMOP[index].paydsc);
    setmopid(getMOP[index].id);
    if (getMOP[index].paydsc === 'Credit') {
      setShowCreditDropdown(true);
      setClickedCreditCardIndex(index);
    } else {
      setShowCreditDropdown(false);
    }
    setClickedCreditCardIndex(index); // Update the clicked card index
  };
  const totalAmountString = totalAmount.toString().split(",").join("");
  function Checkout() {
    const data = {
        orderId: orderid,
        accCode: selectedCreditId,
        payMod: getmopid,
        orderAmt: tamtItems.split(",").join(""),
        netAmt : totalAmountString,
        qty :  totalItem,
        discount: getdiscountamount.split(",").join(""),
    };

    console.log(data);
    const formData = new URLSearchParams(data).toString();

    axios
      .post(`${apiLinks}/CheckOut.php`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        if (response.data.error === 200) {
          // onHide();
            setAlertData({
                type: "success",
                message: `${response.data.message}`,
              });
              setSelectedCreditId('');
              setShowCheckoutModalfun(false);
              handleCheckoutClose();

              setTimeout(() => {
                setAlertData(null);

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
  return (
    
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1) !important' }}
    >
        {alertData && (
        <Alert severity={alertData.type} >{alertData.message}</Alert>
      )}
      <Modal.Header closeButton style={{ backgroundColor: '#ac1e1e', color: 'white' }}>
        <Modal.Title>Check Out </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <Row>
              {getMOP.map((item, index) => (
                <Col key={item.id} xs={6} className="d-flex align-items-center">
                  <Card
                    style={{
                      width: '100%',
                      height: '6vh',
                      cursor: '-webkit-grab',
                      marginBottom: '10px',
                      backgroundColor: clickedCreditCardIndex === index ? 'gray' : '#ac1e1e',
                      color: 'white',
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <Card.Body>
                      <Card.Title style={{ fontSize: '12px' }}>{item.paydsc}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={8}>
            {showCreditDropdown && clickedCreditCardIndex !== null && (
              <Row>
                <Col xs={6} md={2} className="d-flex align-items-center">
                  <Form.Group controlId="status">
                    <Form.Control
                      as="select"
                      name="categoryIdd"
                      onChange={(e) => {
                        setSelectedCreditId(e.target.value);
                      }}
                      id="categoryIdd"
                      style={{
                        height: '27px',
                        fontSize: '11px',
                        width: '120px',
                        color: 'black',
                      }}
                      className="form-control"
                    >
                      {getdatacredit.map((item) => (
                        <option key={item.acccode} value={item.acccode}>
                          {item.accdsc}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="danger" onClick={Checkout}>Yes, Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
