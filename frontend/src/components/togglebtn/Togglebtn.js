import React, { useState } from "react";
import classes from "./Togglebtn.module.css";
import { Button } from "../button";
export const ToggleBtn = ({ handleCurrentStatus }) => {
  const [selectedValue, setSelectedValue] = useState("Published");

  const handleToggle = (value) => {
    setSelectedValue(value);
    handleCurrentStatus(value);
  };

  return (
    <div className={classes["toggle-container"]}>
      <Button
        color="secondary"
        className={`${classes["toggle-btn"]} ${
          selectedValue === "Published" ? classes.active : ""
        }`}
        onClick={() => handleToggle("Published")}
      >
        Published
      </Button>
      <Button
        color="secondary"
        className={`${classes["toggle-btn"]} ${
          selectedValue === "Deleted" ? classes.active : ""
        }`}
        onClick={() => handleToggle("Deleted")}
      >
        Deleted
      </Button>
      <Button
        color="secondary"
        className={`${classes["toggle-btn"]} ${
          selectedValue === "Unpublished" ? classes.active : ""
        }`}
        onClick={() => handleToggle("Unpublished")}
      >
        Unpublished
      </Button>
    </div>
  );
};
