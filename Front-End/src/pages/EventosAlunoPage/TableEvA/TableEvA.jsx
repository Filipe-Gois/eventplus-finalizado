import React, { useState } from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunctions";
import ToggleSwitch from "../../../components/Toggle/Toggle";
// importa a biblioteca de tootips ()
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import Notification from "../../../components/Notification/Notification";
import eyeIconEVA from "../../../assets/images/eye-iconEVA.svg";
import eyeIconRed from "../../../assets/images/eye-icon--red.svg";

// import trashDelete from "../../../assets/images/trash-delete.svg";
import "./TableEvA.css";
import { Link } from "react-router-dom";

const Table = ({
  dados,
  fnConnect = null,
  fnShowModal = null,
  fnPresenca = [],
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
                  {new Date(e.dataEvento) < Date.now() && e.situacao ? (
                    <svg
                      className="tbal-data__icon"
                      width="21"
                      height="21"
                      viewBox="0 0 18 16"
                      fill="#201849"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => {
                        fnShowModal(e.idEvento);
                      }}
                    >
                      <path d="M18 7.42857C18 11.5321 13.9713 14.8571 9.00052 14.8571C7.6963 14.8571 6.45887 14.6286 5.34097 14.2179C4.92263 14.5286 4.24064 14.9536 3.43209 15.3107C2.58839 15.6821 1.57244 16 0.56351 16C0.335008 16 0.131113 15.8607 0.0432276 15.6464C-0.044658 15.4321 0.00455792 15.1893 0.162752 15.025L0.173298 15.0143C0.183844 15.0036 0.197906 14.9893 0.218999 14.9643C0.257668 14.9214 0.31743 14.8536 0.391254 14.7607C0.535387 14.5821 0.728735 14.3179 0.925598 13.9893C1.27714 13.3964 1.61111 12.6179 1.6779 11.7429C0.623272 10.5286 0.0010425 9.03929 0.0010425 7.42857C0.0010425 3.325 4.02972 0 9.00052 0C13.9713 0 18 3.325 18 7.42857Z" />
                    </svg>
                  ) : // <img
                  //   className="tbal-data__icon"
                  //   // idevento={e.idEvento}
                  //   src={comentaryIcon}
                  //   alt=""
                  //   onClick={() => {
                  //     fnShowModal(e.idEvento);
                  //   }}
                  // />
                  new Date(e.dataEvento) > Date.now() ? (
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
                  ) : null}

                  <Link
                    className="table-data__icon--aluno"
                    to={`/detalhes-evento/${e.idEvento}`}
                  >
                    {/* <img
                      className="table-data__icon--img"
                      src={eyeIconEVA}
                      alt=""
                    /> */}
                    <svg
                      className="table-data__icon--img"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#201849"
                      width="25"
                      height="25"
                      viewBox="0 -960 960 960"
                    >
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
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
