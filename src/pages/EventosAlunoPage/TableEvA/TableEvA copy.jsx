import React, { useState } from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunctions";
import ToggleSwitch from "../../../components/Toggle/Toggle";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Notification from "../../../components/Notification/Notification";
import eyeIconBlack from "../../../assets/images/eye-icon--black.svg";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEvA.css";
import { Link } from "react-router-dom";

const Table = ({
  dados,
  fnConnect = null,
  fnShowModal = null,
  fnPresenca = null,
}) => {
  const [notifyUser, setNotifyUser] = useState({}); //Componente Notification

  return (
    <>
      <table className="tbal-data">
        <thead className="tbal-data__head">
          <tr className="tbal-data__head-row tbal-data__head-row--red-color">
            <th className="tbal-data__head-title tbal-data__head-title--big">
              Evento
            </th>
            <th className="tbal-data__head-title tbal-data__head-title--big">
              Data
            </th>
            <th className="tbal-data__head-title tbal-data__head-title--big">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {dados.map((e) => {
            return (
              <tr className="tbal-data__head-row" key={Math.random()}>
                <td className="tbal-data__data tbal-data__data--big">
                  {e.nomeEvento}
                </td>

                <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                  {/* {e.dataEvento} */}
                  {dateFormateDbToView(e.dataEvento)}
                </td>

                <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                  {/* imagem do comentário - abre o modal */}
                  {new Date(e.dataEvento) < Date.now() ? (
                    <img
                      className="tbal-data__icon"
                      // idevento={e.idEvento}
                      src={comentaryIcon}
                      alt=""
                      onClick={() => {
                        fnShowModal(e.idEvento);
                      }}
                    />
                  ) : (
                    <ToggleSwitch
                      toggleActive={e.situacao}
                      manipulationFunction={
                        new Date(e.dataEvento) > Date.now()
                          ? () => {
                              fnConnect(
                                e.idEvento,
                                e.situacao ? "unconnect" : "connect",
                                e.idPresencaEvento //parâmetro opcional
                              );
                            }
                          : () => {
                              setNotifyUser({
                                titleNote: "Erro",
                                textNote: `Evento não está mais disponível.`,
                                imgIcon: "danger",
                                imgAlt:
                                  "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
                                showMessage: true,
                              });
                            }
                      }
                    />
                  )}

                  <Link to={`/detalhes-evento/${e.idEvento}`}>
                    <img
                      className="table-data__icon"
                      src={eyeIconBlack}
                      alt=""
                    />
                  </Link>
                  {/* {new Date(e.dataEvento) > Date.now() ? (
                    
                  ) : null} */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
