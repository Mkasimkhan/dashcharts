import React from 'react';

const SelectInput = ({ label, value, onChange, data, id }) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="form-select mt-1 block w-full px-4 py-2 rounded border"
      >
        {data?.map((item, index) => (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
