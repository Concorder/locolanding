import React from "react";
import "./style.scss";
import LogoSvg from "../Logosvg";
import cartSvg from "../../img/icons/cart.svg"
import { useBasket } from "../Basket";
export default function Navbar() {
  const { count, openBasket } = useBasket();
  return (
    <div className="navbar" data-scroll-section >
      <LogoSvg width={"130px"} fill={"#000"}/>

      <div className="navbar-tagline">Craft Beer Brewery</div>

      <button className="navbar-cart" type="button" onClick={openBasket} aria-label={`Open basket, ${count} bottles`} aria-haspopup="dialog"><img width={"32px"} src={cartSvg} alt="" /><span>{count}</span></button>
    </div>
  );
}
