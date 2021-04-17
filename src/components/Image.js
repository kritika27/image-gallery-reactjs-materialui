import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Image = ({ id, item, list, setList, complete, title }) => {
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

  const useStyles = makeStyles((theme) => ({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  var caption = title.slice(0, title.indexOf("."));

  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={item}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" component="h2">
            {caption}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <i onClick={() => remove(id)} className="fa fa-trash fa-2x"></i>
          </Button>
          <Button size="small" color="primary">
            <i
              onClick={() => handleComplete(id)}
              alt=""
              className={
                complete ? "fa fa-heart fa-2x fav" : "fa fa-heart-o empty fa-2x"
              }
            ></i>
          </Button>
          <Button size="small" color="primary">
            <i
              onClick={() => fileDownloadHandler(item)}
              className="fa fa-download fa-2x"
            ></i>
          </Button>
          <Button size="small" color="primary">
            <label className="change">
              <input type="file" onChange={handleItem} className="pencil" />
              <span>
                <i className="fa fa-pencil fa-2x"></i>
              </span>
            </label>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Image;
