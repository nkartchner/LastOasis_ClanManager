import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.default,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center"
  },
  loader: {
    animation: "spin infinite 20s linear",
    height: "80px"
  }
}));

export default styles;
