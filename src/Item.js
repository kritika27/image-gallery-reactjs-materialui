import React from "react";
import "./index.css";

const Item = ({
  id,
  item,
  list,
  setList,
  complete,
  setItem,
  title,
  hovered,
  setHovered,
}) => {
  const remove = (id) => {
    setList(list.filter((el) => el.id !== id));
  };

  const handleComplete = (id) => {
    setList(
      list.map((it) => {
        if (it.id === id) {
          return {
            ...it,
            favorite: !it.favorite,
          };
        }
        return it;
      })
    );
  };

  const fileDownloadHandler = async (pictureUrl) => {
    console.log(pictureUrl);
    const response = await fetch(pictureUrl);
    response.blob().then((blob) => {
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "picture.jpeg";
      a.click();
    });
  };
  console.log(hovered);
  const handleItem = (e) => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            file: URL.createObjectURL(e.target.files[0]),
          };
        }

        return el;
      })
    );
  };

  const handleEnter = (id) => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            hovered: true,
          };
        }

        return el;
      })
    );
  };
  const handleLeave = (id) => {
    setList(
      list.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            hovered: false,
          };
        }

        return el;
      })
    );
  };

  return (
    <div
      className=" image-container"
      onMouseEnter={() => handleEnter(id)}
      onMouseLeave={() => handleLeave(id)}
    >
      <img
        style={{ width: "300px", height: "300px" }}
        src={item}
        alt="gallery"
        className="image-grid"
      />
      {hovered && (
        <div>
          <i
            onClick={() => handleComplete(id)}
            className={complete ? "fa fa-heart fav" : "fa fa-heart-o empty"}
          ></i>
          <i onClick={() => remove(id)} className="fa fa-trash favorite"></i>

          <i
            onClick={() => fileDownloadHandler(item)}
            className="fa fa-download down"
          ></i>
        </div>
      )}
      <p>{title}</p>

      <label>
        <input type="file" onChange={handleItem} />
        <span>+</span>
      </label>
    </div>
  );
};

export default Item;
