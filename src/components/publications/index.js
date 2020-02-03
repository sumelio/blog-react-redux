import React, { Component } from 'react'
import { connect } from "react-redux";
import * as userActions from "../../actions/userActions";
import * as publicationActions from "../../actions/publicationActions";
import Spinner from '../general/spinner/spinner';
import Fatal from "../general/fatal";
import Comments from "./Comments";

const { getAll: usersGetAll } = userActions;
const { getUserById, openClose, getComments } = publicationActions;


class Publications extends Component {
    
    async componentDidMount() {
      console.log('this.props',this.props)
        const {
          usersGetAll,
          getUserById,
          userReducer: { users },
          match: { params: { key }}
        } = this.props;

        if ( ! users.length) {
            await usersGetAll();
        }

        if( this.props.userReducer.error ) {
            return;
        }


        if ( ! ('publicationKey' in this.props.userReducer.users[key]) ) {
            await getUserById(key);
        }
    } // async componentDidMount()


    setUser = () => {
        const { 
            userReducer,
            publicationReducer,
            match: { params: { key }} 
        } = this.props;

        if (userReducer.error) {
            return <Fatal message={ userReducer.error } />
        }

       if (publicationReducer.error) {
            return <Fatal message={ publicationReducer.error } />
        }

        if (userReducer.loading || !userReducer.users.length) {
            return <Spinner />
        }

        const { name } = userReducer.users[key];
        return (<h1>Publicacioness {name} </h1>)
    }

    setPublications = () => {
        const {
            publicationReducer,
            publicationReducer: { publications },
            userReducer,
            userReducer: { users },
            match: { params: { key }} 
        } = this.props;

        if ( ! users.length) {
            return;
        }

        if (userReducer.error) return;
        if (publicationReducer.loading) {
            return <Spinner/>;
        }

        if (publicationReducer.error) {
            return <Fatal message={publicationReducer.error} />
        }

        if (!publications.length) return;

        if ( ! ('publicationKey' in this.props.userReducer.users[key]) ) return;


      const  {
        publicationKey
      } = this.props.userReducer.users[key];
      
       return this.showInfo( publications, publicationKey );
    }

    showInfo = (publications, publicationKey) => {
        return publications[publicationKey - 1].map (
           ( {title, body, opened, comments, id}, key ) => 
             <div 
               className="publication" 
               key={id} 
               onClick= { ()=> this.showComments( publicationKey, key, comments)} >
               <h2> { title }</h2>
               <h3> { body }</h3>
               {
                  opened? <Comments comments={comments}/> : ''
               }
               
             </div>
           
        )
    }

    showComments = (pubKey, key, comments) => {
        this.props.openClose( pubKey, key);
        if( ! comments.length ) {
          this.props.getComments(pubKey, key);
        }
    }

    render() {
        if (this.props.publicationReducer.loading) {
            return ( <Spinner />);
          }

        const userId = parseInt(this.props.match.params.key, 10) + 1;
        console.log(`this.props `, this.props);
        return (
            <div>
              
                { this.setUser() }
                { this.setPublications() }
            </div>
        )
    }
}
const mapStateToProps = ({ userReducer, publicationReducer }) => {
    return { userReducer, publicationReducer };
};
  
const mapDispatchToProps = {
    usersGetAll,
    getUserById,
    openClose,
    getComments
};
  
  export default connect(mapStateToProps,
    mapDispatchToProps)(Publications);