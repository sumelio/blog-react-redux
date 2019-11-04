import React from "react";
import "./spinner.css";

const Spinner = () => (
  <div className="loading">
    <div className="lds-facebook">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
);
export default Spinner;
