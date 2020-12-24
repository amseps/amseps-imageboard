import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap'

export default class Bottombar extends Component{
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">AMSEPS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/home">home</Nav.Link>
                    <Nav.Link href="/rules">rules</Nav.Link>
                    </Nav>
            </Navbar.Collapse>
        </Navbar>
        );
    }
}
