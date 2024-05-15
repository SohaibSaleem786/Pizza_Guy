import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../MainComponent/Header/Header";
import "./AddCategory.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import Footer from "../../MainComponent/Footer/Footer";

function AddCategory() {
  const [values, setValues] = useState({
    FCtgDscc: "",
    remarkss: "",
    FCtgStss: "",

    loading: false,
  });
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [alertData, setAlertData] = useState(null);
  const [alert, setAlert] = useState(null);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  function handleImageChange1(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage1(file);
      const imgElement = document.getElementById("pic-preview"); // Replace 'image1-preview' with the actual ID of your preview element
      imgElement.src = URL.createObjectURL(file);
    }
  }

  const UserId = 33;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const value = {
      FCtgStss: selectedStatus,
    };
    if (!selectedImage1) {
      setAlert("Please select an image.");
      return;
    }

    setValues((prevState) => ({
      ...prevState,
      loading: true,
    }));

    try {
      const formData = new FormData();
      formData.append("FCtgDsc", values.FCtgDscc);
      formData.append("remarks", values.remarkss);

      formData.append("FCtgSts", value.FCtgStss);
      formData.append("pic", selectedImage1);

      axios
        .post(`${apiLinks}/add_category.php`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        // .then((res) => {
        //   console.log(res);
        // });
        .then((response) => {
          if (response.data.error === 200) {
            setAlertData({
              type: "success",
              message: `${response.data.message}`,
            });
            setTimeout(() => {
              setAlertData(null);
              navigate("/GetCategory");
            }, 3000);
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

      // Reset form values after submission
      setValues({
        FCtgDscc: "",
        FCtgStss: "",
        loading: false,
      });

      setAlert("Image uploaded successfully.");
    } catch (error) {
      setAlert("Error uploading image.");
      console.error(error);
    } finally {
      setValues((prevState) => ({
        ...prevState,
        loading: false,
      }));
    }
  };

  //////////////////////// PRESS ENTER TO MOVE THE NEXT FIELD //////////////////

  // Create refs for each input field
  const ENTER1 = useRef(null);
  const ENTER2 = useRef(null);
  const ENTER3 = useRef(null);
  const ENTER4 = useRef(null);

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
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
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
        <Header />

        <PathHead
          pageName="File > Category Maintenance > Add Category"
          screen="Get_Item"
          pageLink="/GetCategory"
        />

        <div
          className="col-12"
          style={{ color: "black", fontWeight: "bold", fontFamily: fontFamily }}
        >
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "5px",
              backgroundColor: "#f5f5f5",
              minHeight: "100vh",
            }}
          >
            <div
              className="col-md-12 form-container"
              style={{
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                padding: "10px",
                width: "100%",
                maxWidth: "500px",
                margin: "20px 0",
                fontSize: "12px",
                border: "1px solid black",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Form onSubmit={handleFormSubmit}>
                <div className="row">
                  <div className="col-12">
                    <table>
                      <tbody>
                        {/* display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "flex-end",
                        marginRight: '10px', */}
                        <tr>
                          <td>
                            <Form.Group
                              controlId="description"
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <Form.Label>Description:</Form.Label>
                            </Form.Group>
                          </td>
                          <td colSpan={2}>
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Description"
                                name="FCtgDscc"
                                value={values.FCtgDscc}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(ENTER2, e)
                                }
                                ref={ENTER1}
                                style={{ height: "24px", width: "270px" }}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Group
                              controlId="description"
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <Form.Label>Remarks:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              controlId="description"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                type="text"
                                placeholder="Remarks"
                                name="remarkss"
                                value={values.remarkss}
                                onChange={handleInputChange}
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(ENTER3, e)
                                }
                                ref={ENTER2}
                                style={{ height: "24px" }}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <Form.Group
                              controlId="status"
                              style={{
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "flex-end",
                                marginRight: "10px",
                              }}
                            >
                              <Form.Label>Status:</Form.Label>
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group
                              controlId="status"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Form.Control
                                as="select"
                                name="FCtgStss"
                                value={selectedStatus}
                                onChange={(e) =>
                                  setSelectedStatus(e.target.value)
                                }
                                onKeyDown={(e) =>
                                  handleEnterKeyPress(ENTER4, e)
                                }
                                ref={ENTER3}
                                style={{
                                  height: "30px",
                                  width: "100px",
                                  fontSize: "11px",
                                }}
                              >
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                              </Form.Control>
                            </Form.Group>
                          </td>
                          <td></td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                marginBottom: "30px",
                              }}
                            >
                              <div style={{ flex: 1, textAlign: "center" }}>
                                <label
                                  htmlFor="pic"
                                  style={{
                                    display: "block",
                                    marginBottom: "10px",
                                    textAlign: "left",
                                  }}
                                >
                                  Category Pic:{" "}
                                </label>
                                <label
                                  htmlFor="pic"
                                  style={{
                                    cursor: "pointer",
                                    display: "block",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: "100px",
                                      height: "100px",
                                      border: "2px dashed #bbb",
                                      borderRadius: "5px",
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "11px",
                                        color: "#aaa",
                                        marginBottom: "5px",
                                      }}
                                    >
                                      Click to Upload
                                    </span>
                                    <label
                                      htmlFor="pic"
                                      style={{ cursor: "pointer" }}
                                    >
                                      <img
                                        id="pic-preview"
                                        src=""
                                        alt="Upload"
                                        style={{
                                          width: "50px",
                                          height: "50px",
                                          display: "block",
                                        }}
                                      />
                                      <input
                                        type="file"
                                        id="pic"
                                        style={{ display: "none" }}
                                        onChange={handleImageChange1}
                                      />
                                    </label>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td></td>
                          <td>
                            <Button
                              className="btn btn-primary"
                              style={{
                                backgroundColor: primaryColor,
                                height: "4%",
                                fontSize: "11px",
                                color: secondaryColor,
                                width: "50%",
                              }}
                              onClick={handleFormSubmit}
                              ref={ENTER4}
                            >
                              SUBMIT
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
      <div style={{ flex: 1,  textAlign: 'center' }}>
        <label htmlFor="pic" style={{ display: 'block', marginBottom: '10px' }}>Category Pic: </label>
        <label htmlFor="pic" style={{ cursor: 'pointer', display: 'block' }}>
          <div style={{  width: '100px', height: '100px', border: '2px dashed #bbb', borderRadius: '5px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#aaa', marginBottom: '5px' }}>Click to Upload</span>
            <label htmlFor="pic" style={{ cursor: 'pointer' }}>
              <img id="pic-preview" src="" alt="Upload" style={{ width: '50px', height: '50px', display: 'block' }} />
              <input type="file" id="pic" style={{ display: 'none' }} onChange={handleImageChange1} />
            </label>
          </div>
        </label>
      </div>
                  </div> */}
                </div>
              </Form>
            </div>
          </div>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddCategory;
