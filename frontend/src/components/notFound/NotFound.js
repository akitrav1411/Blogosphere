import classes from "./NotFound.module.css";
export const NotFound = (props) => {
  return (
    <div className={`${classes["notFound-container"]} wrapper`}>
      <h1 className={classes.heading}>{`No ${props.heading} found`}</h1>
    </div>
  );
};
