"use client";

import About from "./components/About";
import Brands from "./components/Brands";
import Copyright from "./components/Copyright";
import FAQ from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Services from "./components/Services";


export default function Home() {

  
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Brands />
      <FAQ />
      <Footer />
      <Copyright />
    </>
  );
}

