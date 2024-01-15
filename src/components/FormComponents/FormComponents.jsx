import React from "react";
import "./FormComponents.css";
import "./Table.css";
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
  dados = [[], [{}], []],
  addtionalClass = "",
  fnDelete = null,
  fnUpdate = null,
  showEye = false,
  fnDetails = null,
}) => {
  // const arrayFiltrado = dado

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
                className="row__data row__data--head"
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

      {/* <tbody className="table-component__body">
        {dados[1].map((elementoTr, indice) => {
          return (
            <tr className="body__row" key={indice}>
              {Object.keys(elementoTr).map((chave, indice) => {
                return (
                  <td
                    data-tooltip-id="iten-tooltip"
                    data-tooltip-content={
                      elementoTr[chave].length > 10 ? elementoTr[chave] : null
                    }
                    data-tooltip-place="top"
                    className="row__data row__data--body"
                    key={indice}
                  >
                    {typeof elementoTr[chave].toString() === "string" ? (
                      <>
                        {elementoTr[chave].toString().substr(0, 10)}
                        {elementoTr[chave].toString().length > 10 ? " ..." : ""}
                      </>
                    ) : null}
                  </td>
                );
              })}
              <td>
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={fnUpdate}
                />
              </td>

              <td>
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={fnDelete}
                />
              </td>
            </tr>
          );
        })}
      </tbody> */}

      <tbody className="table-component__head">
        {dados[1].map((elementoTr, indice) => {
          return (
            <tr className="head__row" key={indice}>
              {Object.keys(elementoTr).map((chave, indice) => {
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
                        {elementoTr[chave].toString().length > 10 ? " ..." : ""}
                      </>
                    ) : null}
                  </td>
                );
              })}
              <td className="row__data row__data--head">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => fnUpdate()}
                />
              </td>

              <td className="row__data row__data--head row__data--body">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={(e) => fnDelete(elementoTr.idInstituicao)}
                />
              </td>

              {showEye ? (
                <td className="row__data row__data--head row__data--body">
                  <img
                    className="table-data__icon"
                    src={eyeIcon}
                    alt=""
                    onClick={() => fnDetails()}
                  />
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>

      <tbody className="table-component__head">
        {dados[1].map((elementoTr, index) => {
          return (
            <tr className="head__row" key={index}>
              {Object.keys(elementoTr).map((chave, indice) => {
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
                    {typeof elementoTr[chave].toString() === "string" ||
                    indice < indice - 2 ? (
                      <>
                        {elementoTr[chave].toString().substr(0, 10)}
                        {elementoTr[chave].toString().length > 10 ? " ..." : ""}
                      </>
                    ) : null}
                  </td>
                );
              })}

              <td className="row__data row__data--head">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => {
                    fnUpdate({ idInstituicao: elementoTr[0] });
                  }}
                />
              </td>

              <td className="row__data row__data--head row__data--body">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={(e) => fnDelete()}
                />
              </td>

              {showEye ? (
                <td className="row__data row__data--head row__data--body">
                  <img
                    className="table-data__icon"
                    src={eyeIcon}
                    alt=""
                    onClick={() => fnDetails()}
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
