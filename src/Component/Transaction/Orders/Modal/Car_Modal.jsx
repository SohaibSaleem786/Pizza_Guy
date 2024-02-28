import React, { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";


const CarOrderModal = ({
  show,
  onHide,
  handleNewOrderClickCar,
  getWaiter,
  handleWaiterChange1,
  primaryColor,
  secondaryColor,
  selectedWaiterId,receiveCarOrderValues,
}) => {

    const [values, setValues] = useState({
        namee: "" 
      });
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
      };
    
   
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: "#ac1e1e", color: "white" }}>
        <Modal.Title>Car Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <Row>
              {getWaiter.map((item) => (
                <Col key={item.w_id} xs={6} className="d-flex align-items-center">
                  <Card
                    style={{
                      width: "100%",
                      height: "6vh",
                      marginBottom: "10px",
                      cursor: "-webkit-grab",
                      backgroundColor: selectedWaiterId === item.w_id ? "gray" : primaryColor,
                      color: secondaryColor,
                    }}
                    onClick={() => handleWaiterChange1(item.w_id)}
                  >
                    <Card.Body>
                      <Card.Title style={{ fontSize: "12px" }}>{item.w_name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={8}>
            <Row>
              <Col xs={12} md={12} className="d-flex align-items-center">
                <table>
                  <tbody style={{ textAlign: "right" }}>
                    <tr>
                      <td>Car Number:</td>
                      <td>
                        <input
                          type="text"
                          placeholder="Car Number"
                          name="namee"
                          value={values.namee}
                          onChange={handleInputChange}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="danger" onClick={() => handleNewOrderClickCar(values.namee)}>
          Yes, Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CarOrderModal;
