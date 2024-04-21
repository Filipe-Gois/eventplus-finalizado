import React from "react";
import "./Container.css";

const Container = ({ children, addtionalClass = "" }) => {
  return <div className={`container ${addtionalClass}`}>{children}</div>;
};

export default Container;
