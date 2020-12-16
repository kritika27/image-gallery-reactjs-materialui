import React, { useState } from "react";
//import ProgressBar from "./ProgressBar";
import Item from "./Item";
import { v4 as uuidv4 } from "uuid";
//import SearchBox from "./SearchBox";
import "./index.css";

const arr = () => {
  let data = localStorage.getItem("gallery");
  if (data) return JSON.parse(localStorage.getItem("gallery"));
  else return [];
};

const UploadForm = () => {
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);

  const [list, setList] = useState([]);

  React.useEffect(() => {
    localStorage.setItem("gallery", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      title: title,
      file: file,
      favorite: false,
      hovered: hovered,
    };
    e.preventDefault();
    if (file) {
      setList([...list, newItem]);
      setFile("");
      setTitle("");
    }
  };

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];
    console.log(selected.name);

    if (selected && types.includes(selected.type)) {
      setTitle(selected.name);
      setFile(URL.createObjectURL(e.target.files[0]));
      setError("");
    } else {
      setFile("");
      setError("Please upload an image file (png or jpg)");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="file" onChange={handleChange} />
          <span>+</span>
        </label>
        <button
          style={{
            color: "white",
            backgroundColor: "blue",
            border: "none",
            padding: "5px",
          }}
        >
          Upload
        </button>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{title}</div>}
        </div>
      </form>
      <div className="img-grid">
        {list.map((c, id) => (
          <Item
            key={id}
            id={c.id}
            item={c.file}
            hovered={c.hovered}
            list={list}
            setList={setList}
            complete={c.favorite}
            setItem={setFile}
            setHovered={setHovered}
            title={c.title}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadForm;
