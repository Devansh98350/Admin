
import React from 'react';

const TextInput = ({ label, name, value, onChange, type = 'text', error }) => (
  <div>
    <label>{label}</label>
    <input type={type} name={name} value={value} onChange={onChange} />
    {error && <span>{error}</span>}
  </div>
);

export default TextInput;
