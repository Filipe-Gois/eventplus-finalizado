import React from "react";
import "./ImageIlustrator.css";
import imageDefault from "../../assets/images/default-image.jpeg";
import NocontentImage from "../../assets/images/notFoundIllustration.png";

const ImageIllustrator = ({
  alteText,
  imageRender = imageDefault,
  additionalClass = "",
  style,
}) => {
  return (
    <figure className="illustrator-box" style={style}>
      <img
        src={imageRender}
        alt={alteText}
        className={`illustrator-box__image ${additionalClass}`}
      />
    </figure>
  );
};

export default ImageIllustrator;

export const NoContentIllustration = ({ additionalClass = "" }) => {
  return (
    <figure
      className="illustrator-box"
      style={{ alignSelf: "center", justifySelf: "center" }}
    >
      <img
        src={NocontentImage}
        alt={"Nada encontrado"}
        className={`illustrator-box__image ${additionalClass}`}
      />
    </figure>
  );
};
