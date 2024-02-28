import React from "react";
import "../Footer/Footer.css";
import { useTheme } from "../../../ThemeContext";
function Footer() {
  const { primaryColor,secondaryColor } = useTheme();
  return (
    <footer className="bg-light text-center text-black fixed-bottom">
      <div
        className="text-center "
        style={{ 
          // backgroundColor:primaryColor,
          // color:secondaryColor,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
           height: "30px" }}
      >
        <a className="text-dark" href="">
          Privacy Policy
        </a>{" "}
        |{" "}
        <a className="text-dark" href="">
          Terms of Use
        </a>{" "}
        | © 2023 Crystal Solution. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
