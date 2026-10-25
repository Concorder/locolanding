import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useLayoutEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start) {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    if (!start) return;
    let locoScroll = null;

    const scrollEl = document.getElementById("main-container");
    if (!scrollEl) return;

    locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      class: "is-reveal",
      smartphone: {
        smooth: false,
      },
      tablet: {
        smooth: false,
      },
    });
    locoScroll.on("scroll", () => {
      ScrollTrigger.update();
    });

    ScrollTrigger.scrollerProxy(scrollEl, {
      scrollTop(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
            : locoScroll.scroll.instance.scroll.y;
        }
        return null;
      },
      scrollLeft(value) {
        if (locoScroll) {
          return arguments.length
            ? locoScroll.scrollTo(value, { duration: 0, disableLerp: true })
            : locoScroll.scroll.instance.scroll.x;
        }
        return null;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // Locomotive transforms individual sections, not necessarily scrollEl.
      pinType: document.documentElement.classList.contains("has-scroll-smooth")
        ? "transform"
        : "fixed",
    });

    const lsUpdate = () => {
      if (locoScroll) {
        locoScroll.update();
      }
    };

    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();
    setReady(true);

    // Image and font loading can change the section positions after mounting.
    const refresh = () => ScrollTrigger.refresh();
    scrollEl.addEventListener("load", refresh, true);
    let active = true;
    document.fonts?.ready.then(() => {
      if (active) refresh();
    });

    return () => {
      active = false;
      setReady(false);
      scrollEl.removeEventListener("load", refresh, true);
      if (locoScroll) {
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoScroll.destroy();
        locoScroll = null;
        ScrollTrigger.scrollerProxy(scrollEl, null);

      }
    };
  }, [start]);
  return ready;
}
