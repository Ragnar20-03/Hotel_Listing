import React from "react";
import Input from "./Input";

function Nav() {
  return (
    <div className="flex w-full items-center justify-between h-20 bg-black text-white  rounded-md text-xl">
      <div className="ml-3 p-2 ">Hotel_Booking.com</div>

      <div className="flex space-x-5 w-full justify-center">
        <a href="#"> Home </a>
        <a href="#"> Hotels </a>
        <a href="#"> About </a>
        <a href="#"> Account </a>
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
