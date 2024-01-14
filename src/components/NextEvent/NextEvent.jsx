import React from "react";
import "./NextEvent.css";
import { Link, useParams } from "react-router-dom";

import { Tooltip } from "react-tooltip";

// importar a função lá do arquivo stringFunction (destructuring)
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const NextEvent = ({
  title = "",
  description = "",
  eventDate = "",
  idEvento,
  textButton,
}) => {
  const conectar = (idEvento) => {};

  return (
    <article className="event-card">
      <h2
        className="event-card__title"
        data-tooltip-id={idEvento}
        data-tooltip-content={title.length > 10 ? title : null}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvento} className="tooltip" />
        {title.substr(0, 10)}
        {title.length > 10 ? " ..." : null}
      </h2>

      <p
        className="event-card__description"
        data-tooltip-id={idEvento}
        data-tooltip-content={description.length > 10 ? description : null}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvento} className="tooltip" />
        {description.substr(0, 10)}
        {description.length > 10 ? " ..." : null}
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {dateFormatDbToView(eventDate)}
      </p>

      <Link
        onClick={() => {
          conectar(idEvento);
        }}
        className="event-card__connect-link"
        to={`/detalhes-evento/${idEvento}`}
      >
        {textButton}
      </Link>
    </article>
  );
};

export default NextEvent;
