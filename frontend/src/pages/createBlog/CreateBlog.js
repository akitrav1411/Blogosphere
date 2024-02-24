import classes from "./CreateBlog.module.css";
import { Button, TagSelector } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { saveBlogsToDb } from "../../store/reducer/blogSlice";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCalling } from "../../utils";
import { allTags } from "../../store/reducer/tagSlice";

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
const getEntireData = async (blogId) => {
  const res = await apiCalling("get", `/blogs/${blogId}`);
  return res;
};

export const CreateBlog = () => {
  const [checked, setChecked] = useState(false);
  const [showTagSelector, setShowTagSelector] = useState(false);
  const [tagsSelected, setTagsSelected] = useState([]);
  const {
    tags: { tags },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;
  const [imageData, setImageData] = useState(null);

  const form = useForm({
    resolver: yupResolver(blogSchema),
    mode: "all",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    dispatch(allTags());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      const selectedBlog = await getEntireData(id);
      reset({
        title: selectedBlog.title,
        content: selectedBlog.content,
      });
      setTagsSelected(
        selectedBlog.tags.map((id) => {
          return tags.filter((tag) => tag._id === id)[0];
        })
      );
    };

    if (id && tags?.length) {
      fetchData();
    }
  }, [id, reset, tags]);

  const onSubmit = (data) => {
    const { content, title } = data;
    const blogEntry = {
      title,
      content,
      isPublished: checked,
      isDeleted: false,
      image: imageData,
      tags: tagsSelected.map((tag) => tag._id),
    };
    dispatch(
      saveBlogsToDb({ blogEntry, onSuccess: () => navigate("/profile") })
    );
  };

  const encodeImageFileAsURL = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await convertBase64(file);
    console.log(base64);
    setImageData(base64);
  };
  const handleCloseTagSelector = (tagsArray = []) => {
    setShowTagSelector((prev) => !prev);
    const tagsObject = [].concat(
      ...tagsArray.map((id) => {
        return tags.filter((tag) => tag._id === id);
      })
    );
    setTagsSelected(tagsObject);
  };
  return showTagSelector ? (
    <TagSelector
      handleCloseTagSelector={handleCloseTagSelector}
      tagsSelected={tagsSelected.map((tags) => tags._id)}
    />
  ) : (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${classes["form-container"]} wrapper`}
      >
        <div className={classes["form-content"]}>
          <div className={classes["title-image"]}>
            <input
              className={classes["input-container"]}
              type="text"
              id="title"
              {...register("title")}
              placeholder="Title"
            ></input>
            {!!errors.title && (
              <p className={classes["error-message"]}>{errors.title.message}</p>
            )}
            <div
              className={`${classes["upload"]} ${
                imageData ? classes["image-bg"] : ""
              }`}
            >
              <label
                htmlFor="image"
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {!imageData ? (
                  <p className={classes.imageUpload}>Upload image</p>
                ) : (
                  <div
                    style={{
                      backgroundImage: `url(${imageData})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      flex: 1,
                      height: "100%",
                      cursor: "pointer",
                    }}
                  ></div>
                )}
                <input
                  id="image"
                  type="file"
                  onChange={encodeImageFileAsURL}
                  style={{ display: "none" }}
                />
              </label>
            </div>
          </div>
          <textarea
            id="content"
            type="text"
            {...register("content")}
            className={`${classes["input-container"]} ${classes.textarea}`}
            placeholder="Content"
          ></textarea>
          {!!errors.content && (
            <p className={classes["error-message"]}>{errors.content.message}</p>
          )}
          <div className={classes["file-upload"]}>
            <label className="checkbox">
              <input
                type="checkbox"
                onChange={() => setChecked((prev) => !prev)}
              ></input>
              Publish
            </label>
          </div>
          <div className="tags-container">
            {tagsSelected.map((tag) => (
              <p className="single-tag">{tag.tag}</p>
            ))}
          </div>
          <div className={classes["button-container"]}>
            <Button
              className={classes.button}
              onClick={() => setShowTagSelector((prev) => !prev)}
            >
              Select tags
            </Button>
            <Button type="submit" className={classes.button}>
              Save
            </Button>
            <Button
              className={classes.button}
              onClick={() => {
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
