// import './HomePage1.css';
import { React, useState } from "react";
import NavBar from "../Navbar/Navbar";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { useLocation } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import Metal from '../../../image/grmetal.png';
import Malik from '../../../image/malik.png'
import { useTheme } from "../../../ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import dashboard from '../../../image/dashboard.jpg';
import Order_Dashboard from "../../Transaction/Orders/OrderDashboard";
import { Link, useNavigate } from "react-router-dom";

function HomePage1() {
  const navigate = useNavigate();
  const location = useLocation();
  const { primaryColor, secondaryColor } = useTheme();
  const [showNavBar, setShowNavBar] = useState(true);

  const toggleNavbar = () => {
    setShowNavBar(!showNavBar);
  };
  const userid = location?.state?.userid || null;
  const permissions = location?.state?.permissions || [];

  const Order_Dashboardddd = () => {
    navigate("/Order_Dashboard");
  };

  const Order_Kitchennnn = () => {
    navigate("/Order_Kitchen");
  };
  return (
    <>
    <Header />
    <NavBar />

    <div className="col-12" style={{ position: 'relative' }}>
  <img
    src={dashboard}
    alt="Login"
    className="login-image"
    style={{ height: "88vh", width: "100%" }}
  />
  <div style={{ position: 'absolute', top: '72%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%' }}>
    <button
      className="btn btn-danger mr-3"
      style={{
        fontSize: '18px',
        padding: '10px 20px',
        borderRadius: '8px',
      }}
      onClick={() => Order_Kitchennnn()}
    >
      <FontAwesomeIcon icon={faUtensils} className="mr-2" />
      Kitchen
    </button>
    <button
      className="btn btn-success"
      style={{
        fontSize: '18px',
        padding: '10px 20px',
        borderRadius: '8px',
      }}
      onClick={() => Order_Dashboardddd()}

    >
      <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
      Order Now
    </button>
  </div>
</div>

    {/* <div
      className="d-flex flex-column flex-grow-1 home-page-container"
      style={{
        height: 'calc(100vh - 40px)',  // Adjusted height to account for padding
        backgroundImage: `url(${dashboard})`,
        backgroundSize: 'cover',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
      }}
    >
      
    </div> */}

    <Footer  />
  </>
  );
}

export default HomePage1;




{/* <div className="container-fluid HomePage1 row justify-content-center align-items-center">
        <div className="col-12 col-md-8 col-lg-6 text-center home-page-content">
          <img src={Malik} alt="Malik Spicy Restaurant" style={{ width: '30%' }} />
          <h1
            className="mt-4 mb-5"
            style={{ color: primaryColor, fontSize: '48px', fontWeight: 'bold' }}
          >
            Welcome to Malik Spicy Restaurant
          </h1>
          <div className="mt-4">
            <button
              className="btn btn-danger mr-3"
              style={{
                fontSize: '18px',
                padding: '10px 20px',
                borderRadius: '8px',
              }}
            >
              <FontAwesomeIcon icon={faUtensils} className="mr-2" />
              Kitchen
            </button>
            <button
              className="btn btn-success"
              style={{
                fontSize: '18px',
                padding: '10px 20px',
                borderRadius: '8px',
              }}
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Order Now
            </button>
          </div>
        </div>
      </div> */}