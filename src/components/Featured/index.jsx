import React from "react";
import photos from "../../data";
import "./style.scss";
import img1 from "../../img/img1.jpg"
import img2 from "../../img/img2.jpg"
export default function Featured() {
  const [firstImage, secondImage] = photos;
  return (
    <section className="featured-section"  data-scroll-section>
      <div className="featured-row-layout">
        <h6>Premium Estate Hops</h6>
        <img src={img1} alt="fitstImage" data-scroll/>
      </div>
      <div className='featured-column-layout'>
        <h6>Masterful Distillers</h6>
        <img src={img2} alt="secondImage" data-scroll/>
      </div>
    </section>
  );
}
