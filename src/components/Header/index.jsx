import React from "react";

// import gsap from "gsap";
// import SplitText from "../../utils/Split3.min";
// import heroImage from "../../img/hero2.png";
import "./style.scss";
import LogoSvg from "../Logosvg";
import heroImage from "../../img/hero2.png";


export default function Header(preHeroImage) {
  console.log(preHeroImage)
  // useEffect(() => {
  //   const split = new SplitText("#header-text", {
  //     type: "lines",
  //     linesClass: "lineChildren",
  //   });
    
    // const splitParent = new SplitText("#header-text", {
    //   type: "lines",
    //   linesClass: "lineParent",
    // });

  //   gsap.to(split.lines, {
  //     duration: 1,
  //     y: 0,
  //     opacity: 1,
  //     stagger: 0.1,
  //     ease: "power2",
  //   });
  // }, []);

  return (
    <section className="header-container" data-scroll-section>
      {/* <ul className="header-menu">
        <li>Intro</li>
        <li>About</li>
        <li>Featured</li>
      </ul> */}
      <div className="header-container__image">
      <LogoSvg fill={"#fff"}/>
      <img src={heroImage} alt="test" />
      </div>
      
      
    </section>
  );
}
