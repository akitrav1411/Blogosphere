import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allTags } from "../../store/reducer/tagSlice";
import classes from "./allTags.module.css";
import { Button } from "../button";
const TitleCase = (s) => {
  return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
};
export const AllTags = () => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.tags);
  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);
  return tags ? (
    <div className={classes["parent-container"]}>
      <div className={classes["tags-container"]}>
        <h2 className={classes.heading}>
          Discover more of what matters to you
        </h2>
        <div className={classes["tags"]}>
          {tags.map((tag) => (
            <Button key={tag._id} className={classes["tag-btn"]}>
              {TitleCase(tag.tag)}
            </Button>
          ))}
        </div>
      </div>
    </div>
  ) : null;
};
