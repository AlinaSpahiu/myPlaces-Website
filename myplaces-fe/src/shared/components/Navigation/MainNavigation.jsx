import React, {useState} from "react";
import {Link} from "react-router-dom"

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideBar from './SideBar';
import "./styles/MainNavigation.css";

const MainNavigation = props => {
  const [isToggled, setToggled] = useState(false);
  
  //function for openin the sideBar
  const toggleTrueFalse = () =>setToggled(!isToggled)
 
    return(<>
      {
        isToggled && (
         <SideBar show={isToggled} onClick={isToggled} >
           <nav className="main-navigation__drawer-nav">
             <NavLinks />
           </nav>
          </SideBar>)} 
        <MainHeader>
              <button className="main-navigation__menu-btn"
                      onClick={toggleTrueFalse}>
              <div className="burger">&#9776;</div> 
              </button>

              <h1 className="main-navigation__title"> 
                 <Link to="/"> MyPlaces </Link>  
              </h1>
              
              <nav className="main-navigation__header-nav">
                <NavLinks />
              </nav>
        </MainHeader>
    </>)}

export default MainNavigation