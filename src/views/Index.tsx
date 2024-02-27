
import React, { useEffect, useRef } from "react";
import DemoNavbar from "../components/Navbars/DemoNavbar";
import ImageCarousel from "./IndexSections/ImageCarousel";
import { Tickets } from "../components";

const Index = () => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <DemoNavbar />
      <main ref={mainRef} style={{ minHeight: "100vh" }}>
        <ImageCarousel />
        <Tickets />
      </main>
    </>
  );
}

export default Index;
