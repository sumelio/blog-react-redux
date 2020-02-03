import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../general/spinner/spinner';
import Fatal from "../general/fatal";

import * as taskActions from "../../actions/taskActions";

const { getAll } = taskActions;


class Tasks extends React.Component {
   componentDidMount() {
    if(!Object.keys(this.props.tasks).length) {
    	this.props.getAll();
    }
   }
	render() {
		return (
			<div>
			  <button>
			    <Link to="/tasks/save">
			     Agregar
			    </Link>
			  </button>
              { this.showContent()}
			</div>
		);
	}


 showContent = () => {
   const { tasks , loading, error } = this.props;

   if (loading) return <Spinner/>;
   if (error) return <Fatal message={error}/>;
  
   return Object.keys(tasks).map( (userId, key) => (
      <div key={key}>
         <h2>
           Usuario con id { userId }
         </h2>
         <div className='contentTasks' >
           { this.setTasks(userId)}
         </div>
      </div>          
   	))
 }

 setTasks = (userId) => {
   const { tasks } = this.props;
   const byUser = {
   	...tasks[userId]
   };

   return Object.keys(byUser).map( (taskId , key) => (
      <div key={key}>
      <input 
       type='checkbox' 
       defaultChecked={byUser[taskId].completed}
      />

      {
      	byUser[taskId].title
      }
        <button 
          className="buttonTask">
            <Link to={`/tasks/save/${userId}/${taskId}`} >Editar</Link>
          </button>
        <button 
          className="buttonTask">Borrar</button>
      </div>
   	));
 };

}


const mapStateToProps = ({taskReducer}) => taskReducer;


const mapDispatchToProps = {
   getAll
};

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);