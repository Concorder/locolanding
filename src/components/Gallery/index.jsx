import React, {useEffect, useRef, useState} from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "../../hooks/useOnScreen";

import amberBottle from "../../img/amber.png"
import stoutBottle from "../../img/stout.png"
import lagerBottle from "../../img/lager.png"
import ipaBottle from "../../img/IPAt.png"

import lagerBg from "../../img/beer2.png"
import amberBg from "../../img/beer4.png"
import stoutBg from "../../img/beer3.png"
import ipaBg from "../../img/beer5.png"

import cn from "classnames";
import "./style.scss";
import gsap from "gsap";
import {useGSAP} from "@gsap/react"
gsap.registerPlugin(useGSAP);

const images = [
    {
        src: lagerBg,
        bottle: lagerBottle,
        title: "Golden Harvest",
        subtitle: "Lager",
        category: "Crisp grain fields",
    },
    {
        src: amberBg,
        bottle: amberBottle,
        title: "Amber Arcadia",
        subtitle: "Amber Ale",
        category: "Caramel malt embrace",
    },
    
    {
        src: ipaBg,
        bottle: ipaBottle,
        title: "Wildwood",
        subtitle: "India Pale Ale (IPA)",
        category: "Citrus pine explosion",
    },
    {
        src: stoutBg,
        bottle: stoutBottle,
        title: "Frostbite Stout",
        subtitle: "Imperial Stout",
        category: "Rich chocolatey mint",
    },
    
    
];


export default function Gallery({src, index, columnOffset, preloader}) {
    const [activeImage, setActiveImage] = useState(1);

    const ref = useRef(null);
    const container = useRef()
    const scrollEl = document.querySelector("#main-container");
    useGSAP(() => {
        console.log(ref.current.offsetWidth);
        console.log(ref.current.clientWidth);
        const sections = gsap.utils.toArray(".gallery-item-wrapper");
        
        // console.log("scroller:"+scrollEl)
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                start: "top top",
                trigger: ref.current,
                scroller: scrollEl,
                pin: true,
                scrub: 1,
                // snap: 1 / (sections.length - 1),
                end: () => `+=${ref.current.offsetWidth}`,
            },
        });
        console.log(sections)
        ScrollTrigger.refresh();

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
                    <span>{images.length}</span>
                </div>
                {images.map((image, index) => (
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
                         src,
                         bottle,
                         category,
                         subtitle,
                         title,
                         updateActiveImage,
                         index,
                     }) {
    const ref = useRef(null);

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
                    <h1 className="gallery-info-title">{title}</h1>
                    <h2 className="gallery-info-subtitle">{subtitle}</h2>
                    <p className="gallery-info-category">{category}</p>
                </div>
                <div
                    className="gallery-item-image"
                    style={{backgroundImage: `url(${src})`}}
                >
                    <img className="gallery-bottle" src={bottle} alt="bottle" />
                </div>
            </div>
            <div></div>
        </div>
    );
}