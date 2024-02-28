import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBTable, MDBTableBody, MDBTableHead, MDBTableFoot } from "mdbreact";
import Header from "../../../MainComponent/Header/Header";
import Footer from "../../../MainComponent/Footer/Footer";
import PathHead from "../../../MainComponent/PathHead/PathHead";
import { useTheme } from "../../../../ThemeContext";
import "./Get_Waiter.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchWaiter } from "../../../../Redux/Action";

const Get_Waiter = () => {
  const dispatch = useDispatch();
  const waiterdata = useSelector((state) => state.waiter);
  useEffect(() => {
    dispatch(fetchWaiter());
  }, [dispatch]);
  const navigate = useNavigate();
  const { primaryColor, secondaryColor, apiLinks, fontFamily } = useTheme();
  const handleMenuItemClick = () => {
    navigate("/Add_Waiter");
  };

  const [filterValue, setFilterValue] = useState("");

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (item) => {
    if (selectedRow === item.w_id) {
      // If the clicked row is already selected, navigate to the update screen
      navigate(`/Update_Waiter/${item.w_id}`);
    } else {
      // Set the selectedRow state to the clicked row id
      setSelectedRow(item.w_id);
    }
  };

  const filteredData = waiterdata?.data
    ? waiterdata.data.filter((row) =>
        row.w_name.toLowerCase().includes(filterValue.toLowerCase())
      )
    : [];
  return (
    <>
      <Header />

      <PathHead
        pageName="File > Waiter Maintenance"
        screen="Get_Item"
        pageLink="/MainPage"
      />
      <div className="col-12 " style={{ fontFamily: fontFamily }}>
        <br />
        <div>
          <div
            className="col-12 Waiter-containerr"
            style={{
              padding: "20px",
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
                      Address
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
                      Mobile
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
                  </tr>
                </MDBTableHead>

                <MDBTableBody>
                  {filteredData.map((item) => (
                    <tr
                      key={item + 1}
                      onClick={() => handleRowClick(item)}
                      style={{ height: "27px" }}
                    >
                      <td style={{ width: "1%" }}>{item.w_id}</td>
                      <td style={{ width: "30%", textAlign: "left" }}>
                        {item.w_name}
                      </td>
                      <td style={{ width: "40%", textAlign: "left" }}>
                        {item.w_add}
                      </td>
                      <td style={{ textAlign: "right" }}>{item.w_mobile}</td>
                      <td style={{ width: "10%" }}>{item.w_status}</td>
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
                        length: 5,
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
                    >
                      {" "}
                      {filteredData.length}
                    </th>
                    <th
                      colSpan={6}
                      style={{
                        backgroundColor: primaryColor,
                        color: secondaryColor,

                        textAlign: "left",
                      }}
                    ></th>
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

export default Get_Waiter;
