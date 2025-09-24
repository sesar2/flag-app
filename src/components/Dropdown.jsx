import { useState } from "react";

const Dropdown = ({ options, setState, state, isOpen, setIsOpen, page }) => {
  return (
    <div className="dropdown">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="select"
        style={page === "quiz" ? { width: "93%" } : { width: "130px" }}
      >
        {state}{" "}
        <img
          className={!isOpen ? "arrow" : "arrow-open"}
          src="src\assets\chevron-down-svgrepo-com.svg"
          alt=""
        />
      </div>
      <div className="options">
        {options.map(
          (option, i) =>
            isOpen && (
              <div
                key={i}
                onClick={() => {setState(option); setIsOpen(false)}}
                className={
                  state === option ? "region-option active" : "region-option"
                }
              >
                {option}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Dropdown;
