import React, { Suspense, useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../CustomCursor";
import Header from "../components/Header";
import Featured from "../components/Featured";
import About from "../components/About";
import Gallery from "../components/Gallery";
import useLocoScroll from "../hooks/useLocoScroll";
import "../styles/home.scss";

const LazyGallery = React.lazy(() => import("../components/Gallery"));

const Home = () => {
  const ref = useRef(null);
  const [preloader, setPreloader] = useState(true);

  // Custom hook to control scrolling behavior
  useLocoScroll(!preloader);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPreloader(false);
    }, 1000); // Preloader appears for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
      <Suspense fallback={<div>Loading...</div>}>
        <>
          <CustomCursor />
          {preloader ? (
              <div className="loader-wrapper absolute">
                <h1>Flirty flowers</h1>
                <h2>Rio de Janeiro</h2>
              </div>
          ) : (
              <div
                  className="main-container"
                  id="main-container"
                  data-scroll-container
                  ref={ref}
              >
                <Navbar />
                <Header />
                <Featured />
                <About />
                <LazyGallery />
                <Footer />
              </div>
          )}
        </>
      </Suspense>
  );
};

export default Home;
