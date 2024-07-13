import React, { Suspense, useState, useRef, useLayoutEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../CustomCursor";
import Header from "../components/Header";
import Featured from "../components/Featured";
import About from "../components/About";
import useLocoScroll from "../hooks/useLocoScroll";
import "../styles/home.scss";
import Gallery from "../components/Gallery";
import logoImg from "../img/herologo2.png"
// const LazyGallery = React.lazy(() => import("../components/Gallery"));
import heroImage from "../img/hero2.png";
const Home = () => {
  const ref = useRef(null);
  const [preloader, setPreloader] = useState(true);

  // Custom hook to control scrolling behavior
 

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setPreloader(false);
      
    }, 3000); // Preloader appears for 3 seconds
    return () => clearTimeout(timer);
  }, [preloader]);
  useLocoScroll(!preloader);
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <>
          <CustomCursor />
          {preloader ? (
              <div className="loader-wrapper absolute">
               <img src={logoImg} alt="" />
               <div
        style={{
          display: 'none',
          backgroundImage: `url(${heroImage})`,
        }}
      ></div>
                
              </div>
          ) : (
              <div
                  className="main-container"
                  id="main-container"
                  data-scroll-container
                  ref={ref}
              >
                <Navbar />
                <Header preHeroImage={heroImage}/>
                <About />
                <Featured />
                <Gallery/>
                <Footer />
              </div>
          )}
        </>
      </Suspense>
  );
};

export default Home;
