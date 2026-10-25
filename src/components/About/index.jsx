import React, { useEffect, useRef } from "react";
import hops from "../../img/img1.jpg";
import brewery from "../../img/img2.jpg";
import "./style.scss";

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!window.IntersectionObserver) return;

    const elements = sectionRef.current.querySelectorAll(
      ".about-section__photo, .about-section__lead, .about-section__body, .about-section__signoff"
    );
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("is-reveal-pending");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });

    elements.forEach((element) => {
      element.classList.add("is-reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("is-reveal-pending"));
    };
  }, []);

  return (
    <section ref={sectionRef} className="about-section" data-scroll-section aria-labelledby="about-title">
      <div className="about-section__copy">
        <p className="about-section__eyebrow">About Burgbräu</p>
        <h2 id="about-title">Beer worth<br /><span>making time for.</span></h2>
        <p className="about-section__lead">A lager after a long day. An IPA over dinner. Something dark when the evening runs on.</p>
        <p className="about-section__body">That's where we start. We brew beers with distinct flavors, from the clean grain notes of Golden Harvest to the roasted malt of Frostbite Stout. Different styles, each with its own place at the table.</p>
        <p className="about-section__body">Take a look around. Find one you like. Bring someone along.</p>
        <p className="about-section__signoff">Burgbräu <span>Craft beer brewery</span></p>
      </div>
      <div className="about-section__photos">
        <figure className="about-section__photo about-section__photo--brewery">
          <img src={brewery} alt="Brewing equipment inside the brewery" />
          <figcaption>In the brewhouse</figcaption>
        </figure>
        <figure className="about-section__photo about-section__photo--hops">
          <img src={hops} alt="Fresh green hop cones on a wooden table" />
          <figcaption>It starts with the ingredients.</figcaption>
        </figure>
      </div>
    </section>
  );
}
