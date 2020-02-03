import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as taskActions from "../../actions/taskActions";

const { 
	changeUserId, 
	changeTitle,
	addTask,
	resetSave } = taskActions;


class Save extends React.Component {


	componentDidMount() {
		console.log(this.props)
	  const {
		match: { params: { userId, taskId }},
		tasks,
		changeTitle,
		changeUserId
	  } = this.props;

	  if ( userId && taskId ) {
	  	const { title } = tasks[userId][taskId];
	  	changeTitle(title);
        changeUserId(userId);
	  }
	}

	changeUserId = (event) => {
		this.props.changeUserId(event.target.value); 
	}

	changeTitle = (event) => {
		this.props.changeTitle(event.target.value); 
	}

	saveUser = () => {
		const { 
			userId, 
			title, 
			add,
			match: { params: { userId, taskId }},
		    tasks,
		    changeTitle,
		    changeUserId,
		    edit } = this.props;

		const taskNew = {
			userId,
			title,
			completed: false
		}

        if(userId && taskId) {
        	const task = tasks[userId][taskId];
        	const taskEdited = {
        		...taskNew,
        		completed: task.completed,
        		id: task.id 
        	}

        	edit(taskEdited);
        }

		this.props.addTask(taskNew);
	}

	disabled = () => {
		const { userId, title, loading } = this.props;
		if (loading || !userId || !title ) return true;
		return false;
	}

	checkStateSave = () => {
		if(this.props.goBack) {

           this.props.resetSave();
		  return <Redirect to='/task' />;	
		}
		return '';
	}

	render() {
		console.log(this.props)
		return (
			<div>
			  {
			  	 this.checkStateSave()
			  }
			  <h1>Guardar Tareas </h1>
			  Usuario Id:
			  <input 
			    type="number" 
			    value={this.props.userId}
			    onChange={this.changeUserId}/>
			  <br/><br/>
			  Titulo:
			  <input 
			    type="text" 
			    value={this.props.title} 
			    onChange={this.changeTitle}/>
			  <br/><br/>
			  <button 
               onClick={this.saveUser}
               disabled={ this.disabled()}
			  >
			    Guardar 
			  </button>
			</div>
		);
	}
}

const mapStateToProps = ({taskReducer}) => taskReducer;

const mapDispatchToProps = {
   changeUserId,
   changeTitle,
   addTask,
   resetSave
};

export default  connect(mapStateToProps,mapDispatchToProps)(Save);