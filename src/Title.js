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
        <input
          style={{
            border: "none",
            outline: "none",
            marginTop: "10px",
            borderBottom: "2px solid blue",
          }}
          placeholder="Search Photos.."
          defaultValue="Search Cat"
          onChange={onSearchChange}
        />
      </div>
      <h2>Image Gallery</h2>
      <p>
        This Application allows you to upload,delete,change and download a
        collection of desired Photos.
      </p>
    </div>
  );
};

export default Title;
