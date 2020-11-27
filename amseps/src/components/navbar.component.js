import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component{
    render(){
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">AMSEPS</Link>
                <div className="collaps navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Catalog</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/post_thread" className="nav-link">New Thread</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}
