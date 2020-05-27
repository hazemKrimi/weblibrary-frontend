import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import auth from './Auth';

const MainNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">WebLibrary</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                {auth.getSession() ? 
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/home">Home</NavLink>
                        </NavItem>
                        {auth.getSession().type === "author" && 
                            <NavItem>
                                <NavLink href="/create-book">Create</NavLink>
                            </NavItem>
                        }
                        <NavItem>
                            <NavLink href="/settings">{auth.getSession().username}</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => auth.logout()}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                : 
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/login">Login</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/signup/">Sign Up</NavLink>
                        </NavItem>
                    </Nav>
                }
            </Collapse>
        </Navbar>
    );
};

export default MainNav;