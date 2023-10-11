import React from "react";

function TextArea({ title, name, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={name}>{title ? title : ""}</label>
      <textarea
        
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : ""}
        
      ></textarea>
    </div>
  );
}

export default TextArea;
