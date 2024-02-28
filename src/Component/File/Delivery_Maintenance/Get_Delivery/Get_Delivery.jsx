import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import Edit from "../../../../image/edit.png";
import "../Get_Delivery/Get_Delivery.css";
import { useTheme } from "../../../../ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchDelivery } from "../../../../Redux/Action";

const Get_Delivery = () => {
  const dispatch = useDispatch();
  const deliverydata = useSelector((state) => state.delivery);
  useEffect(() => {
    dispatch(fetchDelivery());
  }, [dispatch]);
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();

  const handleMenuItemClick = () => {
    navigate("/Add_Delivery");
  };

  const [filterValue, setFilterValue] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);
  const filteredData = deliverydata?.data
    ? deliverydata.data.filter((row) =>
        row.dvdsc.toLowerCase().includes(filterValue.toLowerCase())
      )
    : [];
  const handleRowClick = (item) => {
    if (selectedRow === item.dvid) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Delivery/${item.dvid}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(item.dvid);
    }
  };
  return (
    <>
      <Header />

      <PathHead
        pageName="File > Delevery Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />
      <div className="col-12" style={{ fontFamily: fontFamily }}>
        <br />
        <br />
        <div>
          <div
            className="col-12 delivery-container"
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
                style={{
                  backgroundColor: primaryColor,
                  height: "4%",
                  fontSize: "11px",
                  color: secondaryColor,
                  width: "15%",
                  marginRight: "2%",
                }}
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
                maxHeight="65vh"
                striped
                bordered
                small
                responsive
              >
                <MDBTableHead>
                  <tr>
                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        zIndex: 1,
                      }}
                    >
                      ID
                    </th>

                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        zIndex: 1,
                      }}
                    >
                      Description
                    </th>

                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        zIndex: 1,
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,
                        fontWeight: "bold",
                        position: "sticky",
                        top: -1,
                        zIndex: 1,
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </MDBTableHead>

                <MDBTableBody>
                  {filteredData.map((item) => (
                    <tr key={item.dvid} onClick={() => handleRowClick(item)}>
                      <td>{item.dvid}</td>
                      <td style={{ textAlign: "left", width: "60%" }}>
                        {item.dvdsc}
                      </td>
                      <td>{item.dvsts}</td>
                      <td style={{ textAlign: "right" }}>{item.dvamt}</td>
                    </tr>
                  ))}
                  {Array.from({
                    length: Math.max(
                      0,
                      Math.floor((100 * window.innerHeight) / 100) / 50
                    ),
                  }).map((_, index) => (
                    <tr key={`blank-${index}`}>
                      {Array.from({
                        length: 4,
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
      </div>
      <Footer />
    </>
  );
};

export default Get_Delivery;
