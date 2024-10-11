import React from "react";
import useIntersectionObserver from "./useIntersectionObserver";

const SectionWrapper = ({ children }) => {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });

  return (
    <div ref={ref} className={`fade-up ${isVisible ? "fade-up-active" : ""}`}>
      {children}
    </div>
  );
};

export default SectionWrapper;
