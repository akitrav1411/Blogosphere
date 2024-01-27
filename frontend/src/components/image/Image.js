import classes from "./image.module.css";
export const Image = (props) => (
  <img
    className={`${classes["img"]} ${props.className}`}
    src={props.src}
    alt=""
    onClick={props.onClick}
  ></img>
);
