import { Image } from "../image";
import classes from "./Header.module.css";
export const Header = (props) => {
  const { content, imgsrc = "", className = "" } = props;
  return (
    <div className={`${classes["header-container"]} ${className}`}>
      <div className={classes.icon}>
        <Image src={imgsrc}></Image>
      </div>
      <h1 className={classes.heading}> {content}</h1>
    </div>
  );
};
