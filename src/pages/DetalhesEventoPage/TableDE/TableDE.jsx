import React from "react";
import "./TableDE.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";

const TableDE = ({ dados }) => {
    return (
        <table className="table-data">
            {/* cabeçalho */}
            <thead className="table-data__head">
                <tr className="table-data__head-row">
                    <th className="table-data__head-title table-data__head-title--big">
                        Usuário
                    </th>
                    <th className="table-data__head-title table-data__head-title--little">
                        Comentário
                    </th>
                </tr>
            </thead>

            {/* corpo */}
            <tbody>
                {dados.map((tp) => {
                    return (
                        <tr className="table-data__head-row" key={tp.idComentarioEvento}>
                            <td className="table-data__data table-data__data--big">
                                {tp.usuario.nome}
                            </td>

                            <td className="table-data__data table-data__data--little">
                                {tp.descricao}
                            </td>


                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default TableDE;
