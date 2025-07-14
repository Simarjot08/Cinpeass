import React from 'react';

function Input({ title, type, name, value, onChange }) {
  return (
    <input
      className="border-b-2 border-gray-200 pl-5  text-white focus:text-white text-lg focus:bg-black-40 focus:border-2"
      placeholder={title}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
