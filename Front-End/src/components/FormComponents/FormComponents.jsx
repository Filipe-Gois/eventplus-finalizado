import React from "react";
import "./FormComponents.css";
import editPen from "../../assets/images/edit-pen.svg";
import trashDelete from "../../assets/images/trash-delete.svg";
import eyeIcon from "../../assets/images/eyeIcon.svg";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import InputMask from "react-input-mask";

export const Input = ({
  type,
  id,
  value,
  required,
  name,
  placeholder,
  manipulationFunction,
  additionalClass = "",
  cnpj = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required ? "required" : ""}
      className={`input-component ${additionalClass}`}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
      maxLength={cnpj ? 18 : ""}
      minLength={cnpj ? 18 : ""}
    />
  );
};

export const Label = ({ htmlFor, labelText }) => {
  return <label htmlFor={htmlFor}>{labelText}</label>;
};

// componente criado na forma tradicional props ao invés do destructuring
export const Button = (props) => {
  return (
    <button
      id={props.id}
      name={props.name}
      type={props.type}
      className={`button-component ${props.additionalClass}`}
      onClick={props.manipulationFunction}
    >
      {props.textButton}
    </button>
  );
};

export const Select = ({
  required,
  id,
  name,
  options = [],
  manipulationFunction,
  additionalClass = "",
  defaultValue,
  defaultOption = "Selecione",
}) => {
  return (
    <select
      name={name}
      id={id}
      required={required}
      className={`input-component ${additionalClass}`}
      onChange={manipulationFunction}
      value={defaultValue}
    >
      <option value="">{defaultOption}</option>
      {options.map((o) => {
        return (
          <option key={Math.random()} value={o.value}>
            {o.text}
          </option>
        );
      })}
    </select>
  );
};

export const Table = ({
  head = [],
  body = [{}],
  idsArray = [],
  dados = [[], [{}], []],
  addtionalClass = "",
  fnDelete = null,
  fnUpdate = null,
  showEye = false,
  showUpdate = false,
  showDelete = false,
  fnShowDetails = null,
}) => {
  return (
    <table className={`table-component ${addtionalClass}`}>
      <thead className="table-component__head">
        <tr className="head__row">
          {dados[0].map((elementoHead, indice) => {
            return (
              <>
                <th
                  data-tooltip-id="iten-tooltip"
                  data-tooltip-content={
                    elementoHead.length > 7 ? elementoHead : null
                  }
                  data-tooltip-place="top"
                  className={`row__data row__data--head`}
                  key={indice}
                >
                  <Tooltip id={"iten-tooltip"} className="tooltip--black" />
                  {elementoHead.substr(0, 7)}
                  {elementoHead.length > 7 ? " ..." : null}
                </th>
              </>
            );
          })}

          <th key={Math.random()} className="row__data row__data--head row__icons--update">
            Editar
          </th>
          <th
            key={Math.random()}
            className={`row__data row__data--head ${
              showEye ? "row__icons--update" : "row__icons--delete"
            }`}
          >
            Excluir
          </th>

          {showEye ? (
            <th key={Math.random() + 1} className="row__data row__data--head row__icons--delete">
              Detalhes
            </th>
          ) : null}
        </tr>
      </thead>

      <tbody className="table-component__head">
        {dados[1].map((elementoTr, indice) => {
          return (
            <tr className="head__row" key={indice}>
              {Object.keys(elementoTr)
                .slice(1)
                .map((chave, indice) => {
                  return (
                    <>
                      <td
                        data-tooltip-id="iten-tooltip"
                        data-tooltip-content={
                          elementoTr[chave].length > 7
                            ? elementoTr[chave]
                            : null
                        }
                        data-tooltip-place="top"
                        className="row__data row__data--head"
                        key={indice}
                      >
                        {typeof elementoTr[chave].toString() === "string" ? (
                          <>
                            {elementoTr[chave].toString().substr(0, 7)}
                            {elementoTr[chave].toString().length > 7
                              ? " ..."
                              : ""}
                          </>
                        ) : null}
                      </td>
                    </>
                  );
                })}

              {showUpdate ? (
                <td
                  className="row__data row__data--head row__icons--update"
                  key={Math.random()}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 14 13"
                    fill="#fff"
                    className="table-data__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      fnUpdate(elementoTr[0]);
                    }}
                  >
                    <path d="M9.92819 0.454385L8.60331 1.6273L12.1619 4.77771L13.4867 3.60479C14.1711 2.99894 14.1711 2.01747 13.4867 1.41162L12.4082 0.454385C11.7239 -0.151462 10.6153 -0.151462 9.93092 0.454385H9.92819ZM7.98467 2.17499L1.6039 7.82633C1.31921 8.07836 1.11118 8.39098 0.996207 8.73267L0.0271838 11.648C-0.04125 11.854 0.0217091 12.0745 0.191425 12.2248C0.361141 12.375 0.61024 12.4308 0.840177 12.3726L4.13321 11.5147C4.51918 11.4129 4.8723 11.2288 5.15698 10.9767L11.5432 5.32539L7.98467 2.17499Z" />
                  </svg>
                  {/* 
                  <img
                    className="table-data__icon"
                    src={editPen}
                    alt=""
                    onClick={() => {
                      console.log(elementoTr);

                      fnUpdate(elementoTr[0]);
                    }}
                  /> */}
                </td>
              ) : null}

              {showDelete ? (
                <td
                  className="row__data row__data--head row__icons--delete"
                  key={Math.random()}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 13 13"
                    fill="#fff"
                    xmlns="http://www.w3.org/2000/svg"
                    className="table-data__icon"
                    onClick={() => fnDelete(elementoTr[0])}
                  >
                    <path d="M3.92321 0.428506L3.71429 0.774701H0.928571C0.414955 0.774701 0 1.12089 0 1.5494C0 1.97791 0.414955 2.3241 0.928571 2.3241H12.0714C12.585 2.3241 13 1.97791 13 1.5494C13 1.12089 12.585 0.774701 12.0714 0.774701H9.28571L9.07679 0.428506C8.92009 0.164624 8.59799 0 8.24687 0H4.75313C4.40201 0 4.07991 0.164624 3.92321 0.428506ZM12.0714 3.0988H0.928571L1.54375 11.3058C1.59018 11.9183 2.19955 12.3952 2.93371 12.3952H10.0663C10.8004 12.3952 11.4098 11.9183 11.4562 11.3058L12.0714 3.0988Z" />
                  </svg>

                  {/* <img
                    className="table-data__icon"
                    src={trashDelete}
                    alt=""
                    onClick={() => fnDelete(elementoTr[0])}
                  /> */}
                </td>
              ) : null}

              {/* {console.log(elementoTr[1(][-1+1)])} */}

              {showEye ? (
                <td
                  className="row__data row__data--head row__icons"
                  key={Math.random()}
                >
                  <svg
                    className="table-data__icon"
                    fill="#FFF"
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 -960 960 960"
                    onClick={() => fnShowDetails(elementoTr[0])}
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
