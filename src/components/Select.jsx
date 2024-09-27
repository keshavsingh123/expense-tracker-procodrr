import React from "react";

function Select({
  id,
  label,
  name,
  value,
  onChange,
  error,
  options,
  defaultOpt,
}) {
  return (
    <div className="input-container">
      <label id={id}>{label}</label>
      <select id={id} name={name} value={value} onChange={onChange}>
        {defaultOpt && (
          <option value="" hidden>
            {defaultOpt}{" "}
          </option>
        )}

        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      <p className="error">{error}</p>
    </div>
  );
}

export default Select;
