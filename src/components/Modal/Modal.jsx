import React, { useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";
import Notification from "../Notification/Notification";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";
import EventLogo from "../../assets/images/logo-pink.svg";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado.",
  comentado = false,
  showHideModal = false,
  fnDelete = null,
  fnGet = null,
  fnPost = null,
  userId = null,
  idEvento = null,
  idComentario = null,
}) => {
  const [notifyUser, setNotifyUser] = useState({});
  const [comentarioDesc, setComentarioDesc] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    await fnGet(userId, idEvento);
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <div className="modal">
        <article
          className={`modal__box ${
            idComentario !== null ? "comentario-preenchido" : ""
          }`}
        >
          <h3
            className={`modal__title ${
              idComentario !== null ? "comentario-preenchido--title" : ""
            }`}
          >
            {modalTitle}
            <span
              className="modal__close"
              onClick={() => showHideModal(idEvento)}
            >
              x
            </span>
          </h3>

          <div
            className={`comentary ${
              idComentario !== null ? "comentary--preenchido" : ""
            }`}
          >
            <h4 className="comentary__title">Seu comentário</h4>

            {idComentario !== null ? (
              <img
                src={trashDelete}
                className="comentary__icon-delete"
                alt="Ícone de uma lixeira"
                onClick={async () => {
                  await fnDelete(idComentario);
                  await carregarDados();
                }}
              />
            ) : null}

            <p
              className={`comentary__text ${
                idComentario !== null ? "comentary__text--preenchido" : ""
              }`}
            >
              {comentaryText}
            </p>

            <hr className="comentary__separator" />
          </div>
          {idComentario === null ? (
            <>
              <Input
                placeholder="Escreva seu comentário..."
                additionalClass={`comentary__entry`}
                value={comentarioDesc}
                manipulationFunction={(e) => {
                  setComentarioDesc(e.target.value);
                }}
              />
              {/* {comentarioDesc} */}
              <Button
                textButton="Comentar"
                additionalClass={`comentary__button`}
                manipulationFunction={async () => {
                  if (idComentario !== null) {
                    setNotifyUser({
                      titleNote: "Erro",
                      textNote: `Você já comentou neste evento.`,
                      imgIcon: "danger",
                      imgAlt:
                        "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
                      showMessage: true,
                    });
                  } else {
                    await fnPost(comentarioDesc.trim(), userId, idEvento);
                    await carregarDados();
                  }
                  setComentarioDesc(""); //;limpa o campo do input
                }}
              />
            </>
          ) : (
            <img src={EventLogo} alt="" className={`event-logo`} />
          )}
        </article>
      </div>
    </>
  );
};

export default Modal;
