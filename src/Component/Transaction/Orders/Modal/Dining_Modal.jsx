import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';
import { useTheme } from '../../../../ThemeContext';

const DiningOrderModal = ({ show, onHide, handleNewOrderClick, getWaiter, handleWaiterChange1, getTable, handleTableChange1 }) => {
  const [selectedWaiterId, setSelectedWaiterId] = useState(null);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const { secondaryColor, primaryColor } = useTheme();

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="xl"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1) !important' }}
    >
      <Modal.Header closeButton style={{ backgroundColor: primaryColor, color: secondaryColor }}>
        <Modal.Title>Dining Order</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          <Col md={4}>
            <Row>
              {getWaiter.map((item) => (
                <Col key={item.w_id} xs={6} className="d-flex align-items-center">
                  <Card
                    style={{
                      width: '100%',
                      height: '6vh',
                      marginBottom: '10px',
                      cursor: '-webkit-grab',
                      backgroundColor: selectedWaiterId === item.w_id ? 'gray' : primaryColor,
                      color: selectedWaiterId === item.w_id ? primaryColor : secondaryColor,
                    }}
                    onClick={() => {
                      setSelectedWaiterId(item.w_id);
                      handleWaiterChange1(item.w_id);
                    }}
                  >
                    <Card.Body>
                      <Card.Title style={{ fontSize: '12px' }}>{item.w_name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={8}>
            <Row>
              {getTable.map((item) => (
                <Col key={item.t_id} xs={6} md={2} className="d-flex align-items-center">
                  <Card
                    style={{
                      width: '100%',
                      height: '6vh',
                      marginBottom: '10px',
                      cursor: '-webkit-grab',
                      backgroundColor: selectedTableId === item.t_id ? 'gray' : primaryColor,
                      color: secondaryColor,
                    }}
                    onClick={() => {
                      setSelectedTableId(item.t_id);
                      handleTableChange1(item.t_id);
                    }}
                  >
                    <Card.Body className="d-flex flex-column justify-content-center">
                      <Card.Title style={{ fontSize: '12px' }}>{item.t_name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="danger" onClick={handleNewOrderClick}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DiningOrderModal;
