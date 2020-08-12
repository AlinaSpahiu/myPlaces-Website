import React from "react";
import Avatar from "../../shared/components/UIElements/Avatar"
import Card from "../../shared/components/UIElements/Card"
import {Link} from "react-router-dom"
import "./UserItem.css";


const UsersList = (props) =>{ 
return(
    <li className="user-item">
       
            {/* always will have different link for different users */}
            <Card className="user-item__content">
            <Link to={`/${props.id}/places`}> 
            <div className="user-item__image ">
                <Avatar image={props.image} alt={props.name}/>
                </div>
                <div className="user-item__info">
                    <h2>{props.name}</h2>
                    <h5>{props. placeCount} {props. placeCount === 1? `Place` : `Places` } </h5>  
            </div>
            </Link>
            </Card>
      
    </li>
)}
export default UsersList