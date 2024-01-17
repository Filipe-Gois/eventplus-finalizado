import React from "react";
// import "./TableEv.css";
// import editPen from "../../../assets/images/edit-pen.svg";
import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import eyeIcon from "../../../assets/images/eyeIcon.svg";

import { dateFormateDbToView } from "../../../Utils/stringFunctions";

// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

// import trashDelete from "../../../assets/images/trash-delete.svg";

const Table = ({
  dados,
  fnDelete = null,
  fnUpdate = null,
  fnShowComentaries = null,
  addtionalClass = "",
}) => {
  return (
    <table className={`table-component ${addtionalClass}`}>
      <thead className="table-component__head">
        <tr className="head__row">
          <th className={`row__data row__data--head `}>Evento</th>
          <th className={`row__data row__data--head `}>Descrição</th>
          <th className={`row__data row__data--head `}>Tipo Evento</th>
          <th className={`row__data row__data--head `}>Data</th>
          <th className={`row__data row__data--head `}>Editar</th>
          <th className={`row__data row__data--head `}>Deletar</th>
          <th className={`row__data row__data--head `}>Detalhes</th>
        </tr>
      </thead>
      <tbody className="table-component__head">
        {dados.map((tp) => {
          return (
            <tr className="head__row" key={tp.idEvento}>
              <td
                className="row__data row__data--head"
                data-tooltip-id="description-tooltip"
                data-tooltip-content={
                  tp.nomeEvento.length > 10 ? tp.nomeEvento : null
                }
                data-tooltip-place="top"
              >
                <Tooltip id={tp.idEvento} className="tooltip--black" />

                {tp.nomeEvento.substr(0, 10)}
                {tp.nomeEvento.length > 10 ? " ..." : null}
              </td>

              <td
                className="row__data row__data--head"
                data-tooltip-id="description-tooltip"
                data-tooltip-content={
                  tp.descricao.length > 10 ? tp.descricao : null
                }
                data-tooltip-place="top"
              >
                <Tooltip
                  id={"description-tooltip"}
                  className="tooltip--black"
                />

                {tp.descricao.substr(0, 10)}
                {tp.descricao.length > 10 ? " ..." : null}
                {/* <Tooltip id="description-tooltip" className="custom-tootip" /> */}
              </td>

              <td className="row__data row__data--head">
                {tp.tiposEvento.titulo}
              </td>

              <td className="row__data row__data--head">
                {dateFormateDbToView(tp.dataEvento)}
              </td>

              <td className="row__data row__data--head row__icons">
                <img
                  className="table-data__icon"
                  idevento={tp.idEvento}
                  src={editPen}
                  alt="Ícone de lápis. Deixa os dados do evento selecionados para edição."
                  onClick={(e) =>
                    // dá pra passar o obhjeto tp direto?
                    fnUpdate({
                      //showUpdateForma(??)
                      idEvento: tp.idEvento,
                      nomeEvento: tp.nomeEvento,
                      dataEvento: tp.dataEvento,
                      descricao: tp.descricao,
                      idInstituicao: tp.idInstituicao, //por enquanto chumbado
                      idTipoEvento: tp.idTipoEvento,
                    })
                  }
                />
              </td>

              <td className="row__data row__data--head row__icons">
                <img
                  className="table-data__icon"
                  idevento={tp.idEvento}
                  src={trashDelete}
                  alt="Ícone de lixeira. Deleta o evento."
                  onClick={(e) => fnDelete(e.target.getAttribute("idevento"))}
                />
              </td>

              <td className="row__data row__data--head row__icons">
                <Link to={`/detalhes-evento/${tp.idEvento}`}>
                  <img
                    className="table-data__icon"
                    idevento={tp.idEvento}
                    src={eyeIcon}
                    alt="Ícone de olho. Abre a guia de detalhes do evento."
                    onClick={(e) => console.log(tp.idEvento)}
                  />
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
