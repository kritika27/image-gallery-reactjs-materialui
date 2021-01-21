import React, { useState } from "react";

import Image from "./Image";
import { v4 as uuidv4 } from "uuid";

import "./index.css";
import "./App.css";

const UploadForm = ({ list, setList, filterTodos }) => {
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(false);

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

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleChange = (e) => {
    let selected = e.target.files[0];
    console.log(selected.name);

    if (selected && types.includes(selected.type)) {
      setTitle(selected.name);
      setFile(URL.createObjectURL(e.target.files[0]));
      getBase64(selected).then((base64) => {
        localStorage["fileBase64"] = base64;
        console.debug("file stored", base64);
      });
      setError("");
    } else {
      setFile("");
      setError("Please upload an image file (png or jpg)");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="upload">
          <input type="file" onChange={handleChange} />
          <span>+</span>
        </label>
        <button className="btn">Upload</button>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{title}</div>}
        </div>
      </form>
      <section className="movies">
        {filterTodos.map((c, id) => (
          <Image
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
      </section>
    </div>
  );
};

export default UploadForm;
