import React, { useState, useEffect } from "react";
import { Navigation } from "./navigation";
import { Header } from "./header";
import { Features } from "./features";
import { About } from "./about";
import { Services } from "./services";
import { Gallery } from "./gallery";
// import { Testimonials } from "./testimonials";
// import { Team } from "./Team";
import { Contact } from "./contact";
import JsonData from "./data.json";
import SmoothScroll from "smooth-scroll";
import "./Landing.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});


const Landing = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);
  return (
    <div>
    {/* <Navigation /> */}
    <Header data={landingPageData.Header} />
    <Features data={landingPageData.Features} />
    <About data={landingPageData.About} />
    <Services data={landingPageData.Services} />
    <Gallery data={landingPageData.Gallery} />
    {/* <Testimonials data={landingPageData.Testimonials} />
    <Team data={landingPageData.Team} /> */}
    <Contact data={landingPageData.Contact} />
  </div>
  );
};

export default Landing;