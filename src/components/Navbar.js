import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem, Button} from 'reactstrap';


export const NavBar = props => (
        <div>
            <Navbar color="faded" light expand="md">
                <NavbarBrand href="/">TodoApp</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                          <p>Hello, {props.username}</p>
                      </NavItem>
                        <NavItem>
                            <Button color="success">LogIn</Button>
                        </NavItem>
                        <NavItem>
                            <Button color="success" >SignUp</Button>
                        </NavItem>
                    </Nav>
            </Navbar>
        </div>
)