import React from "react";

const SelectBox = ({ label, name, options = [], value, onChange, error }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <span>{error}</span>}
  </div>
);

export default SelectBox;
