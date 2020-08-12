import React from "react";

import Card from "../../shared/components/UIElements/Card"
import UserItem from "./UserItem"
import "./UsersList.css"

const UsersList = props =>{
    // Atehere jane dy mundesi: ose do kthehet faqja bosh pa asnje user, ose do kthehet me listen e userave.
    if(props.items.length === 0) { // props.items.length - items e emerojm si te duam. props e marrm nga jashte.
        return <div className="center"> 
                  <Card> <h2> No users found. </h2> </Card>
               </div>
    } else {
        return <div className="top-center">
        
        <ul className="users-list">
            { props.items.map( (user) => { 
                return <UserItem key={user.id} 
                                 id={user.id} 
                                 image={user.image} 
                                 name={user.name} 
                                 placeCount={user. placeCount} 
                         /> }) }
               </ul>
               </div>
    }
 }

export default UsersList