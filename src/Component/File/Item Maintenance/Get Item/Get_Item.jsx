import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import { useTheme } from "../../../../ThemeContext";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from "../../../../image/edit.png";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
import "../Get Item/Get_Item.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchItem } from "../../../../Redux/Action";

const Get_Item = () => {
  const dispatch = useDispatch();
  const itemdata = useSelector((state) => state.item);
  const [getitemdata, setitemdata] = useState(itemdata?.data); // Null check added here

  console.log("itemdata itemdata data", itemdata);
  useEffect(() => {
    dispatch(fetchItem());
  }, [dispatch]);
  useEffect(() => {
    setitemdata(itemdata?.data); // Update getaccount when accountCodeData changes
  }, [itemdata]);

  console.log("getitemdata getitemdata data", getitemdata);

  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor, secondaryColor } = useTheme();
  const { apiLinks, fontFamily } = useTheme();
  const imageurl = `${apiLinks}/itemimage/`;

  const handleMenuItemClick = () => {
    navigate("/Item");
  };

  const filteredRows = itemdata?.data
    ? itemdata.data.filter((row) =>
        row.TItmDsc.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  ///////////////// here is our selected row
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.TItmId) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Item/${row.TItmId}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.TItmId);
    }
  };
  const tableCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
  };
  return (
    <>
      <Header />
      <PathHead
        pageName="File > Item Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />

      <div
        className="col-12"
        style={{ color: secondaryColor, fontFamily: fontFamily }}
      >
        <br />
        <div
          className="Item-container"
          style={{
            marginLeft: "3%",
            marginRight: "3%",
            maxWidth: "94%",
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <Row>
            <Col xs={12} sm={4} md={4} lg={4} xl={2}>
              <Button
                className="btn btn-primary"
                style={{
                  backgroundColor: primaryColor,
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "100%",
                  marginBottom: "10px",
                }}
                onClick={handleMenuItemClick}
              >
                ADD
              </Button>
            </Col>

            <Col xs={12} sm={4} md={4} lg={4} xl={{ span: 2, offset: 8 }}>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </Col>
          </Row>
          <div style={{ fontSize: "12px", width: "100%", overflowX: "auto" }}>
            <MDBTable
              scrollY
              maxHeight="65vh"
              striped
              bordered
              small
              responsive
              minHeight="70vh"
            >
              <MDBTableHead>
                <tr>
                  <th style={tableCellStyle}>ID</th>
                  <th style={tableCellStyle}>Description</th>
                  <th style={tableCellStyle}>UOM</th>
                  <th style={tableCellStyle}>Status</th>
                  <th style={tableCellStyle}>Cost</th>
                  <th style={tableCellStyle}>Sale</th>
                  <th style={tableCellStyle}>Discount</th>
                  <th style={tableCellStyle}>Category</th>
                  <th style={tableCellStyle}>Type</th>
                  <th style={tableCellStyle}>Pic</th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {filteredRows.map((row, index) => (
                  <tr key={index} onClick={() => handleRowClick(row)}>
                    <td>{row.TItmId}</td>
                    <td style={{ textAlign: "left" }}>{row.TItmDsc}</td>
                    <td>{row.uom}</td>
                    <td>{row.TItmSts}</td>
                    <td>{row.TPurRat}</td>
                    <td>{row.TSalRat}</td>
                    <td>{row.itmdis}</td>
                    <td>{row.tctgdsc}</td>
                    <td>{row.TitmTyp}</td>
                    <td>
                      <img
                        src={imageurl + row.TItmPic}
                        alt="Item Pic"
                        style={{ width: "50px", height: "22px" }}
                      />
                    </td>
                  </tr>
                ))}
                {Array.from({
                  length: Math.max(
                    0,
                    Math.floor((100 * window.innerHeight) / 100) / 33
                  ),
                }).map((_, index) => (
                  <tr key={`blank-${index}`}>
                    {Array.from({
                      length: 10,
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
                    {filteredRows.length}
                  </th>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Get_Item;
