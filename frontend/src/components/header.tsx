import React, { Fragment, useState} from "react";
import { NavLink } from "react-router-dom";

function Header() {

  function setNavClassList(isActive : boolean, isPending : boolean) : string {
    let common : string = "mx-2 text-white";
    if(isPending) {
      return common + " pending"
    }
    else if(isActive) {
      return common + " active"
    } 
    return common
  }

  return (
    <nav className="md:mx-auto bg-green-800 p-2 w-full">
      <NavLink 
      id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar"
      className={({ isActive, isPending }) => setNavClassList(isActive, isPending) } 
      to="/books">
        Books
      </NavLink>
      <NavLink className={({ isActive, isPending }) => setNavClassList(isActive, isPending)} to="/reports">
        Reports
      </NavLink>
    </nav>
  );
}
export default Header;
