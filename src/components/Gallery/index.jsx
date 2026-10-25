import React, {useEffect, useRef, useState} from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "../../hooks/useOnScreen";
import { beers, formatPrice } from "../../utils/beers";
import { useBasket } from "../Basket";



import cn from "classnames";
import "./style.scss";
import gsap from "gsap";
import {useGSAP} from "@gsap/react"
gsap.registerPlugin(useGSAP);




export default function Gallery({src, index, columnOffset, preloader}) {
    const [activeImage, setActiveImage] = useState(1);

    const ref = useRef(null);
    const container = useRef()
    const scrollEl = document.querySelector("#main-container");
    useGSAP(() => {
        if (!ref.current) return;

        const sections = gsap.utils.toArray(".gallery-item-wrapper");
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    start: "top top",
                    trigger: ref.current,
                    scroller: scrollEl,
                    pin: true,
                    scrub: 1,
                    end: () => `+=${ref.current.offsetWidth}`,
                },
            });
            ScrollTrigger.refresh();
        });

        return () => mm.revert();
    },[preloader, scrollEl]);

    const handleUpdateActiveImage = (index) => {
        setActiveImage(index + 1);
    };

    return (
        <section data-scroll-section ref={container} className="section-wrapper gallery-wrap">

            <div className="gallery" ref={ref}>
                <div className="gallery-counter">
                    <span>{activeImage}</span>
                    <span className="divider"/>
                    <span>{beers.length}</span>
                </div>
                {beers.map((image, index) => (
                    <GalleryItem
                        key={index}
                        index={index}
                        {...image}
                        updateActiveImage={handleUpdateActiveImage}
                    />
                ))}
            </div>
        </section>
    );
}

function GalleryItem({
                         id,
                         price,
                         src,
                         bottle,
                         category,
                         tastingNotes,
                         subtitle,
                         title,
                         updateActiveImage,
                         index,
                     }) {
    const ref = useRef(null);
    const { add, quantities } = useBasket();

    const onScreen = useOnScreen(ref, 0.5);

    useEffect(() => {
        if (onScreen) {
            updateActiveImage(index);
        }
    }, [onScreen, index, updateActiveImage]);

    return (
        <div
            className={cn("gallery-item-wrapper", {"is-reveal": onScreen})}
            ref={ref}
        >
            <div></div>
            <div className={"gallery-item"}>
                <div className="gallery-item-info">
                    <h1 className="gallery-info-title" style={{ color: ["#cbc555", "#e76a44", "#e39f3a", "#40b7c7"][index] }}>{title}</h1>
                    <h2 className="gallery-info-subtitle">{subtitle}</h2>
                    <p className="gallery-info-category">{category}</p>
                    <p className="gallery-info-tasting">{tastingNotes}</p>
                    <div className="gallery-info-purchase">
                        <div><strong>{formatPrice(price)}</strong><span> / 330 ml bottle</span><small>+ €0.08 deposit</small></div>
                        <button type="button" disabled={quantities[id] >= 99} onClick={() => add(id)} aria-label={`Add ${title} to basket`}>+ Add{quantities[id] ? ` (${quantities[id]})` : ""}</button>
                    </div>
                </div>
                <div
                    className="gallery-item-image"
                    style={{backgroundImage: `url(${src})`}}
                >
                    <img className="gallery-bottle" src={bottle} alt={`${title} ${subtitle} bottle`} />
                </div>
            </div>
            <div></div>
        </div>
    );
}
