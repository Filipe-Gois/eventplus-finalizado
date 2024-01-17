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
              <th
                data-tooltip-id="iten-tooltip"
                data-tooltip-content={
                  elementoHead.length > 10 ? elementoHead : null
                }
                data-tooltip-place="top"
                className={`row__data row__data--head `}
                key={indice}
              >
                <Tooltip id={"iten-tooltip"} className="tooltip--black" />
                {elementoHead.substr(0, 10)}
                {elementoHead.length > 10 ? " ..." : null}
              </th>
            );
          })}
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
                    <td
                      data-tooltip-id="iten-tooltip"
                      data-tooltip-content={
                        elementoTr[chave].length > 10 ? elementoTr[chave] : null
                      }
                      data-tooltip-place="top"
                      className="row__data row__data--head"
                      key={indice}
                    >
                      {typeof elementoTr[chave].toString() === "string" ? (
                        <>
                          {elementoTr[chave].toString().substr(0, 10)}
                          {elementoTr[chave].toString().length > 10
                            ? " ..."
                            : ""}
                        </>
                      ) : null}
                    </td>
                  );
                })}

              {showUpdate ? (
                <td
                  className="row__data row__data--head row__icons"
                  key={Math.random()}
                >
                  <img
                    className="table-data__icon"
                    src={editPen}
                    alt=""
                    onClick={() => {
                      console.log(elementoTr);

                      fnUpdate(elementoTr[0]);
                    }}
                  />
                </td>
              ) : null}

              {showDelete ? (
                <td
                  className="row__data row__data--head row__data--body row__icons"
                  key={Math.random()}
                >
                  <img
                    className="table-data__icon"
                    src={trashDelete}
                    alt=""
                    onClick={() => fnDelete(elementoTr[0])}
                  />
                </td>
              ) : null}

              {/* {console.log(elementoTr[1(][-1+1)])} */}

              {showEye ? (
                <td
                  className="row__data row__data--head row__data--body row__icons"
                  key={Math.random()}
                >
                  <img
                    className="table-data__icon"
                    src={eyeIcon}
                    alt=""
                    onClick={() => fnShowDetails(elementoTr[0])}
                  />
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
