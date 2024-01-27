import classes from "./loader.module.css";
export const Loader = () => {
  return (
    <div className={`${classes["custom-container"]} wrapper`}>
      <div className={classes["loader-container"]}>
        <div className={classes.ball}>L</div>
        <div className={classes.ball}>o</div>
        <div className={classes.ball}>a</div>
        <div className={classes.ball}>d</div>
        <div className={classes.ball}>i</div>
        <div className={classes.ball}>n</div>
        <div className={classes.ball}>g</div>
      </div>
    </div>
  );
};
