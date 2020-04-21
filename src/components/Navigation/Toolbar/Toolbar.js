import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import Menu from '../../Menu/Menu';

const toolbar = (props) =>(

    <header className={classes.Toolbar}>    
        <Menu show={props.show}/>
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>    
);


export default toolbar;