import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const Title = () => {
  const useStyles = makeStyles((theme) => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Image Gallery
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary">
          This Application allows you to upload,delete,change and download a
          collection of desired Photos.
        </Typography>
      </Container>
    </div>
  );
};

export default Title;
