import React from "react";
import "./Logo.css";

const Logo = ({
  addtionalClassParagraph = "",
  addtionalClassSpan = "",
  manipulationFunction = null,
}) => {
  return (
    <h1
      onClick={manipulationFunction}
      className={`paragraph ${addtionalClassParagraph}`}
    >
      <span className={`paragraph--e ${addtionalClassSpan}`}></span>v
      <span className={`paragraph--e ${addtionalClassSpan}`}></span>nt+
    </h1>
  );
};

export default Logo;
