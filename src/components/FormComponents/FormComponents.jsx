import React from "react";
import "./FormComponents.css";
import "./Table.css";
import editPen from "../../assets/images/edit-pen.svg";
import trashDelete from "../../assets/images/trash-delete.svg";
import eyeIcon from "../../assets/images/eyeIcon.svg";
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
}) => {
  return (
    <table className={`table-component ${addtionalClass}`}>
      <thead className="table-component__head">
        <tr className="head__row">
          {dados[0].map((elementoHead, indice) => {
            return (
              <th className="row__data row__data--head" key={indice}>
                {elementoHead}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody className="table-component__body">
        {dados[1].map((elementoTr, indice) => {
          return (
            <tr className="body__row" key={indice}>
              {Object.keys(elementoTr).map((chave, indice) => {
                return (
                  <td className="row__data row__data--body" key={indice}>
                    {elementoTr[chave]}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
