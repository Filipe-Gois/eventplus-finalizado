import React, { useContext } from "react";
import "./TableDE.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import { UserContext } from "../../../context/AuthContext";

const TableDE = ({ dados }) => {
  const { userData } = useContext(UserContext);

  return (
    <table className="table-data">
      {/* cabeçalho */}
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Comentário
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Usuário
          </th>

          {userData.nome && userData.role === "Administrador" ? (
            <th className="table-data__head-title table-data__head-title--little">
              Exibe
            </th>
          ) : null}
        </tr>
      </thead>

      <tbody>
        {dados.map((tp) => {
          return (
            <tr className="table-data__head-row" key={tp.idComentarioEvento}>
              <td
                className={`table-data__data table-data__data--big ${
                  !tp.exibe && "table-data__data--ofensivo"
                }`}
              >


                  


                {tp.descricao}
              </td>
              <td className="table-data__data table-data__data--little">
                {tp.usuario.nome}
              </td>

              {userData.nome && userData.role === "Administrador" ? (
                <td className="table-data__data table-data__data--little">
                  {tp.exibe ? "Sim" : "Não"}
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableDE;
