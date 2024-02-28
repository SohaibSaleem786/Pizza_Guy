import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import Kitchen from "../../../image/Kitchen.jpg";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { fetchKitchen } from "../../../Redux/Action";

const Order_Kitchen = ({ refreshKitchen }) => {
  const dispatch = useDispatch();
  const kitchendata = useSelector((state) => state.kitchen);
  useEffect(() => {
    dispatch(fetchKitchen());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchKitchen());
    console.log("refreshKitchen", refreshKitchen);
  }, [refreshKitchen]);
  const [alertData, setAlertData] = useState(null);
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks } = useTheme();

  const tableHeaderStyle = {
    backgroundColor: secondaryColor,
    color: primaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: 0,
    zIndex: 1,
    padding: "10px",
    textAlign: "left",
  };

  const customScrollbarStyle = `
    ::-webkit-scrollbar {
      width: 2px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #888;
      border-radius: 6px;
    }
  `;

  const ClickonReadybutton = async (id) => {
    dispatch(fetchKitchen());        

    try {
      const formData = new FormData();
      formData.append("id", id);

      axios
        .post(`${apiLinks}/ReadyOrder.php`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.data.error === 200) {
            dispatch(fetchKitchen());   
            console.log(response.data.message);

            }
             else {
              dispatch(fetchKitchen());   
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
        .catch((error) => {});
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
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
      <PathHead
        pageName="Order > Kitchen Screen"
        screen="Get_Item"
        pageLink="/MainPage"
      />
      <div className="col-12" style={{ position: "relative" }}>
        <img
          src={Kitchen}
          alt="Login"
          className="login-image"
          style={{ height: "88vh", width: "100%" }}
        />
        <style>{customScrollbarStyle}</style>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            overflowX: "hidden",
            fontSize: "16px",
            padding: "20px",
            maxHeight: "91vh",
          }}
        >
          {/* <Row xs={4} sm={4} md={4} lg={4} xl={4} className="g-4"></Row> */}
          <Row xs={1} md={2} lg={4} xl={4} xxl={5} className="g-4">
            {kitchendata.data?.map((row) => (
              <Col key={row.id} className="mb-3">
                <Card
                  style={{
                    width: "108%",
                    height: "35vh",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    backgroundColor: primaryColor,
                    color: secondaryColor,
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{ fontSize: "20px", color: secondaryColor }}
                    >
                      Order #{row.id}
                    </Card.Title>
                    <div
                      style={{
                        overflowX: "auto",
                        fontSize: "10px",
                        maxHeight: "150px",
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginBottom: "10px",
                        }}
                      >
                        <thead>
                          <tr style={{ textAlign: "center" }}>
                            <th style={tableHeaderStyle}>Description</th>
                            <th style={tableHeaderStyle}>Quantity</th>
                            <th style={tableHeaderStyle}>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.order.map((item) => (
                            <tr
                              key={item.id}
                              style={{ border: "1px solid #ddd" }}
                            >
                              <td style={{ textAlign: "left" }}>
                                {item.titmdsc}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.titmqnt}
                              </td>
                              <td>
                                {item.status === "NOT READY" ? (
                                  <button
                                    className="btn btn-danger mr-3"
                                    style={{
                                      fontSize: "11px",
                                      padding: "5px 10px",
                                      width: "100px",
                                      borderRadius: "8px",
                                    }}
                                    onClick={() => ClickonReadybutton(item.id)}
                                  >
                                    NOT READY
                                  </button>
                                ) : (
                                  <button
                                    className="btn btn-success"
                                    style={{
                                      fontSize: "11px",
                                      padding: "5px 10px",
                                      width: "100px",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    READY NOW
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Order_Kitchen;
