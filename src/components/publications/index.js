import React, { Component } from 'react'
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as publicationActions from "../../actions/publicationActions";
import Spinner from '../general/spinner/spinner';

const { getAll: usersGetAll } = userActions;
const { getUserById } = publicationActions;


class Publications extends Component {
    
    async componentDidMount() {
        if (this.props.userReducer.users.length === 0) {
            await this.props.usersGetAll();
        }

        this.props.getUserById(this.props.match.params.key);
    }
    render() {
        if (this.props.publicationReducer.loading) {
            return ( <Spinner />);
          }

        const userId = parseInt(this.props.match.params.key, 10) + 1;
        console.log(`publications of ${this.props.match.params.key + 1}`,
            this.props.publicationReducer
            .publications.filter(p => p.userId ===  userId) );
        return (
            <div>
                <h1>
                    Publicaciones
                </h1>
                {this.props.userReducer.users[this.props.match.params.key] && this.props.userReducer.users[this.props.match.params.key].name}
            </div>
        )
    }
}
const mapStateToProps = ({ userReducer, publicationReducer }) => {
    return { userReducer, publicationReducer };
};
  
const mapDispatchToProps = {
    usersGetAll,
    getUserById
};
  
  export default connect(mapStateToProps,
    mapDispatchToProps)(Publications);