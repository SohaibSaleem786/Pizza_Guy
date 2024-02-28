import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../MainComponent/Header/Header";
import Footer from "../../MainComponent/Footer/Footer";
import PathHead from "../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../ThemeContext";
import Edit from "../../../image/edit.png";
import "../Get_Category/GetCategory.css";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory } from "../../../Redux/Action";
const GetCategory = () => {
  const dispatch = useDispatch();
  const categorydata = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();



  const handleMenuItemClick = () => navigate("/AddCategory");

  const buttonStyle = {
    backgroundColor: primaryColor,
    height: "4%",
    fontSize: "11px",
    color: secondaryColor,
    width: "15%",
    marginRight: "2%",
  };

  const tableCellStyle = {
    backgroundColor: primaryColor,
    color: secondaryColor,
    fontWeight: "bold",
    position: "sticky",
    top: -1,
    zIndex: 1,
  };
  const [filterValue, setFilterValue] = useState(""); 
  const [selectedRow, setSelectedRow] = useState('');
  const handleRowClick = (row) => {
    if (selectedRow === row.tctgid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/UpdateCategory/${row.tctgid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(row.tctgid)
    }
  };

  const blankRowStyle = {
    minHeight: "calc(71vh - 160px)", // Adjust the value based on your needs
  };

  const filteredData = categorydata && categorydata.data
  ? categorydata.data.filter((item) =>
      item.tctgdsc.toLowerCase().includes(filterValue.toLowerCase())
    )
  : [];


  return (
    <>
      <Header />
      <PathHead
        pageName="File > Category Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />
      <div className="col-12" style={{ fontFamily: fontFamily }}>
        <br />
        <br />
        <div
          className="col-12 button-container"
          style={{
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "white",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="btn btn-primary"
              onClick={handleMenuItemClick}
              style={buttonStyle}
            >
              ADD
            </button>
            <div style={{ marginLeft: "auto" }}>
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </div>
          </div>
          <div style={{ fontSize: "12px", width: "100%", overflowX: "auto" }}>
            <MDBTable
              scrollY
              maxHeight="61vh"
              striped
              bordered
              small
              responsive
              minHeight="70vh"
            >
              <MDBTableHead>
                <tr>
                  <th style={tableCellStyle}>ID</th>
                  <th style={tableCellStyle}>Index</th>
                  <th style={tableCellStyle}>Description</th>
                  <th style={tableCellStyle}>Status</th>
                  <th style={tableCellStyle}>Picture</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredData.map((item) => (
                  <tr key={item.tctgid} onClick={() => handleRowClick(item)}>
                    <td>{item.tctgid}</td>
                    <td style={{ width: "1%" }}>{item.ctindexs}</td>
                    <td style={{ textAlign: "left", width: "60%" }}>
                      {item.tctgdsc}
                    </td>
                    <td>{item.tctgsts}</td>
                    <td>
                      <img
                        src={`${apiLinks}/ctgImg/${item.tctgpic}`}
                        alt="Category"
                        style={{ width: "50px", height: "22px  " }}
                      />
                    </td>
                  </tr>
                ))}
                {Array.from({
                  length: Math.max(0, 11 - filteredData.length),
                }).map((_, index) => (
                  <tr key={`blank-${index}`} style={blankRowStyle}>
                    {Array.from({ length: 5 }).map((_, colIndex) => (
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
                    colSpan={11}
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                      textAlign: "left",
                    }}
                  >
                    {filteredData.length}
                  </th>
                </tr>
              </MDBTableFoot>
            </MDBTable>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GetCategory;
