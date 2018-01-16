import React, {Component} from "react";


export default class NavBar extends React.Component{
    constructor(){
        super();

    }
    render(){
        return (
            <nav className="navbar navbar-inverse bg-dark">
                <a className="navbar-brand" href="#">Landmark Space</a>
            </nav>
        );
    }
}

