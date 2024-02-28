import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { fetchAccountCode } from "../../../../Redux/Action";

const Get_AccountMaintenance = () => {
  const dispatch = useDispatch();
  const accountCodeData = useSelector((state) => state.accountCode);
  const [getaccount, setaccount] = useState(accountCodeData?.data); // Null check added here
  console.log("account code data", accountCodeData);
  useEffect(() => {
    dispatch(fetchAccountCode());
  }, [dispatch]);

  useEffect(() => {
    setaccount(accountCodeData?.data); // Update getaccount when accountCodeData changes
  }, [accountCodeData]);

  console.log('account code data', accountCodeData);
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();
  const [filterValue, setFilterValue] = useState("");

  const handleMenuItemClick = () => navigate("/Account_Code_Maintenance");

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

  const filteredData = getaccount?.filter((item) =>
    item.accdsc.toLowerCase().includes(filterValue.toLowerCase())
  );
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (row) => {
    if (selectedRow === row.id) {
      navigate(`/UpdateCategory/${row.tctgid}`);
    } else {
      setSelectedRow(row.id);
    }
  };

  const blankRowStyle = {
    minHeight: "calc(71vh - 160px)",
  };
  
  return (
    <>
      <Header />
      <PathHead
        pageName="File > Account Code Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />
      <br />
      <br />
      <div
        className="col-12"
        style={{
          fontFamily: fontFamily,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="col-12"
          style={{
            padding: "10px",
            border: "1px solid black",
            backgroundColor: "white",
            maxWidth: "60%",
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
                  <th style={tableCellStyle}>Code</th>
                  <th style={tableCellStyle}>Description</th>
                  <th style={tableCellStyle}>Address</th>
                  <th style={tableCellStyle}>Mobile</th>
                </tr>
              </MDBTableHead>

              <MDBTableBody>
                {filteredData?.map((item) => (
                  <tr key={item.id} onClick={() => handleRowClick(item)}>
                    <td>{item.id}</td>
                    <td style={{ width: "15%" }}>{item.acccode}</td>
                    <td style={{ textAlign: "left", width: "30%" }}>
                      {item.accdsc}
                    </td>
                    <td style={{ textAlign: "left", width: "60%" }}>
                      {item.accadd}
                    </td>
                    <td>{item.accmobile}</td>
                  </tr>
                ))}
                {Array.from({
                  length: Math.max(0, 11 - (filteredData?.length || 0)),
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
                    {filteredData?.length}
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

export default Get_AccountMaintenance;
