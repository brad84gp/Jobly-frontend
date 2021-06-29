import React, { useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { Navbar, NavbarBrand, Nav, NavItem, Collapse, NavbarToggler, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


import './Navbar.css'


const Navlinks = () => {
    const history = useHistory()

    const dispatch = useDispatch()

    const userLoggedIn = useSelector(store => store.loggedIn)

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen)

    function logout(){
        dispatch({ type : 'LOGGING_OUT' })
        dispatch({ type : 'TOKEN_VALUE', payload : null})
        history.push("/")
    }

    function toProfile(){
        history.push("/profile")
    }

    const UserLoggedIn = () => {
        return(
            <div className="Navbar">
                <Navbar expand='md'>
                    <NavbarBrand id="title"href="/">React-Jobly</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar id="Nav-ul-2">
                            <NavItem id="item">
                                <NavLink id="navItem-2" to="/companies">Companies</NavLink>
                            </NavItem>
                            <NavItem id="item">
                                <NavLink  id="navItem-2" to="/jobs">Jobs</NavLink>
                            </NavItem>
                            <UncontrolledDropdown id="dropdown-menu">
                                <DropdownToggle nav caret id="menu">
                                    Menu
                                </DropdownToggle>
                                <DropdownMenu right  >
                                    <DropdownItem id="drop-item">
                                        <a onClick={toProfile}>Profile</a>
                                    </DropdownItem>
                                    <DropdownItem id="drop-item">
                                        <a onClick={logout}>Logout</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }

    const UserNotLoggedIn = () => {
        return(
            <div className="Navbar">
                <Navbar expand='md'>
                    <NavbarBrand id="title" to="/">React-Jobly</NavbarBrand>
                    <Nav className="mr-auto" navbar id="Nav-ul">
                        <NavItem id="item">
                            <NavLink id="navItem" to="/login"><Button color="primary" id="btn">Login</Button></NavLink>
                        </NavItem>
                        <NavItem id="item">
                            <NavLink id="navItem" to="/signup"><Button color="primary" id="btn">Sign Up</Button></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }

    return (
        <div>
            {userLoggedIn === true ? <UserLoggedIn /> : <UserNotLoggedIn /> }
        </div>
    )

}

export default Navlinks