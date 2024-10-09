import React from "react";
import Input from "./Input";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="flex w-full items-center justify-between h-20 bg-black text-white  rounded-md text-xl">
      <div className="ml-3 p-2 ">Hotel_Booking.com</div>

      <div className="flex space-x-5 w-full justify-center">
        <NavLink to="/"> Home </NavLink>
        <NavLink to="/hotels"> Hotels </NavLink>
        <NavLink to="/about"> About </NavLink>
        <NavLink to="/account"> Account </NavLink>
      </div>
      <div>
        <Input
          text="Search"
          onSearch={(e) => {
            console.log("e.targt.value", e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default Nav;
