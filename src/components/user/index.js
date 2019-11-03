import React, { Component } from "react";
import { connect } from "react-redux";

import "./user.css";

import * as userActions from "../../actions/userActions";
import Spinner from "../general/spinner";
import Fatal from "../general/fatal";
import UserTable from "./userTable";

class Users extends Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    if (this.props.loading) {
      return ( <Spinner />);
    }
    if (this.props.error) {
      return (<Fatal message={this.props.error}/>);
    }
    return (<UserTable />);
  }
}

const mapStateToProps = reducers => {
  return reducers.userReducer;
};
export default connect(
  mapStateToProps,
  userActions
)(Users);