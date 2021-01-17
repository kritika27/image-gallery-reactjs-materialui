import React from "react";
import "./index.css";

const Title = ({ onSearchChange, search, debounced, defaultValue }) => {
  return (
    <div className="title">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 style={{ textAlign: "center", marginRight: "20px" }}>
          Travel Diaries
        </h1>
        <input
          style={{
            border: "none",
            outline: "none",
            borderBottom: "2px solid blue",
          }}
          placeholder="Search"
          defaultValue="hello"
          onChange={onSearchChange}
        />
      </div>
      <h2>Image Gallery</h2>
      <p>
        "An Artist has no home in Europe except in Paris." -Friedrich Nietzsche
      </p>
    </div>
  );
};

export default Title;
