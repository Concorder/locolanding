import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import hopsImage from "../../img/img1.jpg";
import lagerBottle from "../../img/lager.png";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function IntroReveal({ scrollReady = false }) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const frontRef = useRef(null);

  useGSAP(
    () => {
      const scroller = document.querySelector("#main-container");
      if (!scrollReady || !sectionRef.current || !frontRef.current || !scroller) return;

      gsap.fromTo(
        frontRef.current,
        { clipPath: "circle(150% at 50% 50%)" },
        {
          clipPath: "circle(0% at 50% 50%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            scroller,
            start: "top top",
            end: "+=160%",
            // Keep GSAP's pin transform separate from Locomotive's section transform.
            pin: stageRef.current,
            scrub: 1,
            anticipatePin: 1,
          },
        }
      );

      ScrollTrigger.refresh();
    },
    { scope: sectionRef, dependencies: [scrollReady], revertOnUpdate: true }
  );

  return (
    <section className="intro-reveal" data-scroll-section data-scroll-persistent ref={sectionRef}>
      <div className="intro-reveal__stage" ref={stageRef}>
        <div className="intro-reveal__block intro-reveal__block--back">
          <div className="intro-reveal__content">
            <div className="intro-reveal__copy">
              <p className="intro-reveal__eyebrow">Meet Golden Harvest</p>
              <h2 className="intro-reveal__title">Golden<br />Harvest.</h2>
              <p className="intro-reveal__description">Light bread and grain, a little floral hop, and a clean finish. Our lager is an easy place to start.</p>
              <div className="intro-reveal__notes"><span>Golden Harvest</span><span>Lager / Crisp &amp; golden</span></div>
            </div>
            <div className="intro-reveal__visual intro-reveal__visual--beer">
              <span className="intro-reveal__halo" aria-hidden="true" />
              <img className="intro-reveal__bottle" src={lagerBottle} alt="Burgbräu Golden Harvest lager bottle" />
            </div>
          </div>
        </div>
        <div
          className="intro-reveal__block intro-reveal__block--front"
          ref={frontRef}
        >
          <div className="intro-reveal__content">
            <div className="intro-reveal__copy">
              <p className="intro-reveal__eyebrow">What goes into a beer</p>
              <h2 className="intro-reveal__title">Start with<br />the hops.</h2>
              <p className="intro-reveal__description">Floral in a lager. Citrus and pine in an IPA. Hops bring aroma and bitterness; malt gives them something to work with.</p>
              <div className="intro-reveal__notes"><span>Water, malt, hops, yeast.</span></div>
            </div>
            <div className="intro-reveal__visual intro-reveal__visual--hops">
              <img className="intro-reveal__hops" src={hopsImage} alt="Green hop cones spilling from a glass onto a wooden table" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
