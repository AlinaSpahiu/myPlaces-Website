import React from "react";

import UsersList from "../components/UsersList"

const Users = () =>{
    const USERS = [
        {
            id: 'u1',
            image: "https://ca.slack-edge.com/TJNQP8XCG-UUX39CPPS-9bffb2a085c7-512",
            name: "Alina Spahiu",
            placeCount:2
        },
        {
            id: 'u2',
            image: "https://ca.slack-edge.com/TJNQP8XCG-UJTEDK7BQ-g6a7a9aa35d0-512",
            name: "Riccardo Gulin",
            placeCount: 1
        },
        {
            id: '3',
            image: "https://ca.slack-edge.com/TJNQP8XCG-UJQKLH1HV-494c924b5c2a-512",
            name: "Diego Banovaz",
            placeCount: 0 
        }, {
            id: '3',
            image: "https://ca.slack-edge.com/TJNQP8XCG-UJF5YCSTV-9c84c1b89d6a-512",
            name: "Stefano Casasola",
            placeCount: 0 
        }
    ];
  return(
    
   <UsersList items={USERS}/>
  
  
    )}
export default Users