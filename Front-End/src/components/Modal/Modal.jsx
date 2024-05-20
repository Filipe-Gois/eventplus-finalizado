import React, { useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";
import Notification from "../Notification/Notification";

import { Button, InputDefault } from "../FormComponents/FormComponents";
import "./Modal.css";
import EventLogo from "../../assets/images/logo-pink.svg";
import Logo from "../../components/Logo/Logo";

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
  exibe = true,
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
              } ${!exibe ? "comentary__text--ofensivo" : ""}`}
            >
              {comentaryText}
            </p>

            <hr className="comentary__separator" />
          </div>
          {idComentario === null ? (
            <>
              <InputDefault
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
          ) : exibe ? (
            <Logo
              addtionalClassParagraph="event-logo__paragraph--modal"
              addtionalClassSpan="event-logo__span--modal"
            />
          ) : (
            <p className="event-logo__paragraph--modal event-logo__paragraph--warning__commentary">
              Comentário impróprio!
            </p>
          )}
        </article>
      </div>
    </>
  );
};

export default Modal;
