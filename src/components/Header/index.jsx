import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import LogoSvg from "../Logosvg";
import backgroundImage from "../../img/hero_banner__Layer-0.png";
import mountainImage from "../../img/hero_banner__Background.png";
import foregroundImage from "../../img/hero_banner__Layer-1.png";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Header({ scrollReady = false }) {
  const sceneRef = useRef(null);

  useGSAP(() => {
    const scroller = document.querySelector("#main-container");
    if (!scrollReady || !sceneRef.current || !scroller) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          scroller,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray("[data-parallax-speed]", sceneRef.current).forEach((layer) => {
        timeline.to(layer, {
          y: () => sceneRef.current.offsetHeight * Number(layer.dataset.parallaxSpeed),
          ease: "none",
        }, 0);
      });
    });
    ScrollTrigger.refresh();
    return () => media.revert();
  }, { scope: sceneRef, dependencies: [scrollReady], revertOnUpdate: true });

  return (
    <section className="header-container" data-scroll-section aria-label="Burgbräu craft brewery">
      <div className="hero-scene" ref={sceneRef}>
        <div className="hero-layer hero-layer--sky" data-parallax-speed="0.28" aria-hidden="true"><img src={backgroundImage} alt="" fetchPriority="high" decoding="async" /></div>
        <div className="hero-layer hero-layer--mountains" data-parallax-speed="0.14" aria-hidden="true"><img src={mountainImage} alt="" fetchPriority="high" decoding="async" /></div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-logo" data-parallax-speed="0.08">
          <p className="hero-eyebrow">Rooted in nature. Raised by craft.</p>
          <h1><span className="hero-accessible-title">Burgbräu — Craft Beer Brewery</span><span aria-hidden="true"><LogoSvg fill="#f5f0ec" /></span></h1>
          <p className="hero-tagline">A bold spirit. A taste of the wild.</p>
        </div>
        <div className="hero-layer hero-layer--foreground" data-parallax-speed="-0.08" aria-hidden="true"><img src={foregroundImage} alt="" decoding="async" /></div>
        <div className="hero-caption"><span>Inspired by the great outdoors</span><span>Scroll to explore <span aria-hidden="true">↓</span></span></div>
      </div>
    </section>
  );
}
