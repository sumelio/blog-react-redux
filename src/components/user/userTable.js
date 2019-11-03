import React from "react";
import { connect } from "react-redux";

import "./../../css/index.css";

const UserTable = props => {
  const putRows = () =>
    props.users.map(({ id, name, email, website }, key) => (
      <tr key={id}>
        <td>{name}</td>
        <td>{email}</td>
        <td>{website}</td>
        <td>{key}</td>
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
