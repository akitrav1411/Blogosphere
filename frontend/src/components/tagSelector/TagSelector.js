import { useState } from "react";
import classes from "./TagSelector.module.css";
import { useSelector } from "react-redux";
import { Button } from "../button";
export const TagSelector = (props) => {
  const { tags } = useSelector((state) => state.tags);

  const { handleCloseTagSelector, tagsSelected } = props;

  const [searched, setSearched] = useState();
  const [tagsArray, setTagsArray] = useState(tagsSelected);

  return (
    <div className={classes["overlay-tag"]}>
      <div className={classes["tag-selector-container"]}>
        <input
          className={classes["tag-input"]}
          value={searched}
          placeholder="search here"
          onChange={(e) => setSearched(e.target.value)}
        />
        {!!tags.length && (
          <div className={classes["all-tags"]}>
            {tags.map((tag) => (
              <label key={tag._id} className="checkbox">
                <input
                  type="checkbox"
                  checked={tagsArray.includes(tag._id)}
                  onChange={(e) =>
                    setTagsArray((prev) =>
                      e.target.checked
                        ? [...prev, tag._id]
                        : prev.filter((id) => id !== tag._id)
                    )
                  }
                ></input>
                {tag.tag}
              </label>
            ))}
          </div>
        )}
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}
        >
          <Button onClick={() => handleCloseTagSelector()}>Clear</Button>
          <Button onClick={() => handleCloseTagSelector(tagsArray)}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};
