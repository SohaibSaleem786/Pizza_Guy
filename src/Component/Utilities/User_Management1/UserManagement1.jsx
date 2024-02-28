import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import {
  Card,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
  Form,
} from "react-bootstrap";
const UserManagement1 = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState({ columns: [], rows: [] });
  const { primaryColor } = useTheme();
  const { secondaryColor } = useTheme();
  const [Length, setLength] = useState("");

  const handleMenuItemClick = () => {
    navigate("/AddUser1");
  };

  useEffect(() => {
    fetch("https://crystalsolutions.com.pk/malikspicy/user_list.php")
      .then((response) => response.json())
      .then((apiData) => {
        const transformedData = apiData.map((item) => ({
          id: item.id,
          tusrid: item.tusrid,
          tusrnam: item.tusrnam,
          tusrpwd: item.tusrpwd,
          tusrsts: item.tusrsts,
          tusrtyp: item.tusrtyp,
          tmobnum: item.tmobnum,
          temladd: item.temladd,
        }));

        const columns = [
          { label: "ID", field: "id", sort: "asc" },
          { label: "User ID", field: "tusrid", sort: "asc" },
          { label: "Name", field: "tusrnam", sort: "asc" },
          { label: "Password", field: "tusrpwd", sort: "asc" },
          { label: "Status", field: "tusrsts", sort: "asc" },
          { label: "Type", field: "tusrtyp", sort: "asc" },
          { label: "Mobile Number", field: "tmobnum", sort: "asc" },
          { label: "Email Address", field: "temladd", sort: "asc" },
          { label: "Edit", field: "temladd", sort: "asc" },
          { label: "Menu", field: "temladd", sort: "asc" },
        ];

        setData({ columns, rows: transformedData });
        setLength(apiData.length);

        console.log(apiData); // Log the fetched data
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredRows = data.rows.filter((row) =>
    row.tusrnam.toLowerCase().includes(searchText.toLowerCase())
  );

  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const rowHeight = 36; // Set this value based on your actual row height

  // Calculate the number of rows based on 70% of the viewport height
  const numberOfRows = Math.floor((0.7 * windowHeight) / rowHeight);

  // Generate the rows dynamically
  const blankRows = Array.from({
    length: Math.max(0, numberOfRows - filteredRows.length),
  }).map((_, index) => (
    <tr key={`blank-${index}`}>
      {Array.from({ length: 10 }).map((_, colIndex) => (
        <td key={`blank-${index}-${colIndex}`}>&nbsp;</td>
      ))}
    </tr>
  ));
  return (
    <>
      <Header />

      {/* <PathHead pageName="Utilities > UserManagement" /> */}
      <PathHead
        pageName="Utilities > UserManagement"
        screen="Get_Item"
        pageLink="/MainPage"
      />
      <div className="col-12" style={{ color: "black" }}>
        <br />
        <div
          style={{
            marginLeft: "5%",
            marginRight: "5%",
            maxWidth: "100%",
            padding: "5px",
            backgroundColor: "white",
            border: "1px solid black",
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
              maxHeight="66vh"
              striped
              bordered
              small
              responsive
            >
              {/* 'responsive' class added to the table to make it responsive */}
              <MDBTableHead>
                <tr>
                  {data.columns.map((column, columnIndex) => (
                    <th
                      key={columnIndex}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                      }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredRows.map((row, index) => (
                  <tr key={index}>
                    {Object.keys(row).map((key, columnIndex) => {
                      let columnContent;
                      if (key === "tusrpwd") {
                        // Render asterisks (*) instead of the actual password
                        columnContent = "*****";
                      } else {
                        columnContent = row[key];
                      }

                      // Determine the style based on the column index
                      const columnStyle = {
                        textAlign:
                          columnIndex === 1 ||
                          columnIndex === 2 ||
                          columnIndex === 7
                            ? "left"
                            : columnIndex === 6
                            ? "right"
                            : "center",
                        width:
                          columnIndex === 1 || columnIndex === 2
                            ? "15%"
                            : columnIndex === 6
                            ? "10%"
                            : "auto",
                      };

                      return (
                        <td key={key} style={columnStyle}>
                          {columnContent}
                        </td>
                      );
                    })}

                    <td>
                      <div>
                        <Link to={`/EditUser/${row.tusrid}`}>
                          <button
                            style={{
                              backgroundColor: primaryColor,
                              color: secondaryColor,
                              border: "none",
                              height: "22px",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Edit
                          </button>
                        </Link>
                      </div>
                    </td>
                    <td>
                      <div>
                        <Link to={`/MenuUser/${row.id}`}>
                          <button
                            style={{
                              backgroundColor: primaryColor,
                              color: secondaryColor,
                              border: "none",
                              height: "22px",
                              padding: "5px 10px",
                              cursor: "pointer",
                            }}
                          >
                            Menu
                          </button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {blankRows}
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
        </div>

        <Footer />
      </div>
    </>
  );
};

export default UserManagement1;
