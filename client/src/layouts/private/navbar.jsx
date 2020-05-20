import React, { useState } from 'react';
import cookie from 'react-cookies';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBLink,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
} from 'mdbreact';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MDBNavbar color="unique-color-dark" dark expand="md">
        <MDBNavbarBrand>
          <NavLink to="/">
            <strong className="white-text">Room Rental</strong>
          </NavLink>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  Room
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem>
                    <NavLink to="/room/new">Add Room</NavLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <NavLink to="/room/book">Add Booking</NavLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <NavLink to="/room/details">Details</NavLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <NavLink to="/room/delete">Delete a Room</NavLink>
                  </MDBDropdownItem>
                  <MDBDropdownItem>
                    <NavLink to="/room/update">Update a Room</NavLink>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBLink
                className="waves-effect waves-light"
                onClick={() => cookie.remove('x-auth-token')}
              >
                Log Out
              </MDBLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </>
  );
};

export default NavBar;
