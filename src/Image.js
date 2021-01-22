import React from "react";
import "./index.css";
import "./App.css";

const Image = ({
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

  var caption = title.slice(0, title.indexOf("."));
  return (
    /*} <div className="image-container">
      <img src={item} alt="gallery" />
      <div className="movie-info">
        <h4>{caption}</h4>
        <i
          onClick={() => handleComplete(id)}
          alt=""
          className={complete ? "fa fa-heart fav" : "fa fa-heart-o empty"}
        ></i>

        <i onClick={() => remove(id)} className="fa fa-trash del"></i>

        <i
          onClick={() => fileDownloadHandler(item)}
          className="fa fa-download down"
        ></i>
        <label className="change">
          <input type="file" onChange={handleItem} />
          <span>+</span>
        </label>
      </div>
  </div>*/

    <div className="wrap">
      <img src={item} alt="gallery" />
      <div className="movie-info">
        <h4>{caption}</h4>
        <i
          onClick={() => handleComplete(id)}
          alt=""
          className={complete ? "fa fa-heart fav" : "fa fa-heart-o empty"}
        ></i>

        <i onClick={() => remove(id)} className="fa fa-trash del"></i>

        <i
          onClick={() => fileDownloadHandler(item)}
          className="fa fa-download down"
        ></i>
        <label className="change">
          <input type="file" onChange={handleItem} />
          <span>+</span>
        </label>
      </div>
    </div>
  );
};

export default Image;
