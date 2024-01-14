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
import { Link, useParams } from "react-router-dom";

// import trashDelete from "../../../assets/images/trash-delete.svg";

const Table = ({
  dados,
  fnDelete = null,
  fnUpdate = null,
  fnShowComentaries = null,
}) => {
  // console.log(dados);

  const { idEvento } = useParams();

  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Coments
          </th>
        </tr>
      </thead>
      <tbody>
        {dados.map((tp) => {
          return (
            <tr className="table-data__head-row" key={tp.idEvento}>
              <td
                className="table-data__data table-data__data--big"
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
                className="table-data__data table-data__data--big table-data__data--handover"
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

              <td className="table-data__data table-data__data--big">
                {tp.tiposEvento.titulo}
              </td>

              <td className="table-data__data table-data__data--big">
                {dateFormateDbToView(tp.dataEvento)}
              </td>

              <td className="table-data__data table-data__data--little">
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

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  idevento={tp.idEvento}
                  src={trashDelete}
                  alt="Ícone de lixeira. Deleta o evento."
                  onClick={(e) => fnDelete(e.target.getAttribute("idevento"))}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <Link to={`/detalhes-evento/${tp.idEvento}`}>
                  <img
                    className="table-data__icon"
                    idevento={tp.idEvento}
                    src={eyeIcon}
                    alt="Ícone de olho. Abre a guia de detalhes do evento."
                    // onClick={(e) => fnShowComentaries(e.target.getAttribute("idevento"))}
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
