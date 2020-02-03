import React from "react";
import "./../../css/index.css";

const Fatal = props => (
  <div className="center">
    <h2 className="fatal">{props.message}</h2>
  </div>
);
export default Fatal;
