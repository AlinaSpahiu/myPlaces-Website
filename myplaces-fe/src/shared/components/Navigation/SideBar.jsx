import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition} from 'react-transition-group'

import "./styles/SideBar.css";

const SideBar = props => {

    const content = <CSSTransition in={props.show} timeout={50000} classNames="slide-in-left"  mountOnEnter unmountOnExit> 
        <aside className="side-drawer" onClick={props.onClick}> {props.children} </aside>
        </CSSTransition> 
    return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
}

export default SideBar;