import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "./styled.css";
export default function SelectHover({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();

  function handleOptionClick(option) {
    setSelectedOption(option);
    history.push(`/home/${option}`)
  }

  return (
    <div className="select-with-hover">
      <div
        className="selected-option"
        onClick={() =>
          setSelectedOption(selectedOption === null ? options[0] : null)
        }
      >
        {selectedOption ? selectedOption.label : "Loại vải"}
      </div>
      <div className="options-container">
        <div className="options">
          {options.map((option) => (
            <div
              key={option.value}
              className="option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
