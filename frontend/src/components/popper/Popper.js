import classes from "./Popper.module.css";
import { Image } from "../image";
import { useState } from "react";
import { Button } from "../button";
import { Cross } from "../../assets";
export const Popper = (props) => {
  const { data } = props;
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleDrawer = () => {
    setOpenDrawer((prev) => !prev);
  };
  return openDrawer ? (
    <div className={`${classes["onpop-up"]} position-bottom-right`}>
      <Image
        onClick={handleDrawer}
        className={classes["cross-img"]}
        src={Cross}
      />
      {data.map((val, index) => (
        <Button
          key={index}
          className={classes.buttons}
          onClick={() => {
            val.onClick();
            handleDrawer();
          }}
        >
          {val.label}
        </Button>
      ))}
    </div>
  ) : (
    <div
      className={`${classes["pop-up"]} ${props.className} position-bottom-right`}
      onClick={handleDrawer}
    >
      <Image src={props.imgsrc} />
    </div>
  );
};
