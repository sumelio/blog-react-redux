import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "./../../css/index.css";
import EyesIcon from "../general/icon/eyes/eyes";

const UserTable = props => {
  const putRows = () =>
    props.users.map(({ id, name, email, website }, key) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{website}</td>
        <td><Link to={`/user/${key}/publications`}> <EyesIcon id={key} /> </Link></td>
      </tr>
    ));
  return (
    <div>
      <h1 className="center-text">Users</h1>
      <table className="tabla">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{putRows()}</tbody>
      </table>
    </div>
  );
};
const mapStateToProps = reducers => {
  return reducers.userReducer;
};
export default connect(mapStateToProps)(UserTable);
