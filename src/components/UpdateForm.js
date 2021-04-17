import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Image from "./Image";
import "../index.css";

const UploadForm = ({ list, setList, filterTodos }) => {
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    const newItem = {
      id: uuidv4(),
      title: title,
      file: file,
      favorite: false,
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

  const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className="upload">
          <input type="file" onChange={handleChange} />
          <span>+</span>
        </label>
        <Button type="submit" variant="contained" color="primary">
          Upload Image
        </Button>
        <div className="output">
          {error && <div className="error">{error}</div>}
          {file && <div>{title}</div>}
        </div>
      </form>
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {filterTodos.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Image
                  id={card.id}
                  item={card.file}
                  list={list}
                  setList={setList}
                  complete={card.favorite}
                  setItem={setFile}
                  title={card.title}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </div>
  );
};

export default UploadForm;
