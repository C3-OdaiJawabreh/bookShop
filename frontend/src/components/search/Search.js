import React, { useState } from "react";
import "../../App.css";

export const Search = () => {
  const [value, setValue] = useState("");
  const [searchVal, setSearchVal] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="App">
      <select onChange={handleChange}>
        <option value="Select">Select</option>
        <option value="type">Type</option>
        <option value="name">Name</option>
        <option value="author">Author</option>
      </select>
      <input
        onChange={(e) => {
          setSearchVal(e.target.value);
        }}
      ></input>
      <button></button>
    </div>
  );
};
