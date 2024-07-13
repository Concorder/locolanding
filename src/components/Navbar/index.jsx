import React from "react";
import "./style.scss";
import LogoSvg from "../Logosvg";
import cartSvg from "../../img/icons/cart.svg"
export default function Navbar() {
  return (
    <div className="navbar" data-scroll-section >
      <LogoSvg width={"130px"} fill={"#000"}/>

      <div>Crart Beer Brewery</div>

      <div><img width={"50px"} src={cartSvg} alt="" /></div>
    </div>
  );
}
