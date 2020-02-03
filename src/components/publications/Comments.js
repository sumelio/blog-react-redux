import React from 'react';

const Comments = (props) => {

 
 return  (
		<ul> {
       props.comments.map( ({ name, email, body } , id) => 
        <li key={id}>
           <b> <u>{email} </u></b> 

           <br/>
           { body }
        </li>
 	    )
       }
       </ul>
	)
}

export default Comments;