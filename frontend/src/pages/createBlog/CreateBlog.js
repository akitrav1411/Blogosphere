import classes from "./CreateBlog.module.css";
import { Button } from "../../components";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blogSchema } from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { saveBlogsToDb } from "../../store/reducer/blogSlice";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CreateBlog = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { blogs } = useSelector((state) => state.blogs);
  const imageRef = useRef(null);
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
    if (id) {
      const { userBlog } = blogs;
      const selectedBlog = userBlog.find((blog) => blog._id === id);
      reset({
        title: selectedBlog.title,
        content: selectedBlog.content,
      });
    }
  }, [id, blogs, reset]);

  const onSubmit = (data) => {
    const { content, title } = data;
    const blogEntry = {
      title,
      content,
      isPublished: checked,
      isDeleted: false,
      image: imageRef.current,
    };
    dispatch(
      saveBlogsToDb({ blogEntry, onSuccess: () => navigate("/profile") })
    );
  };
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
  const encodeImageFileAsURL = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    console.log(base64);
    imageRef.current = base64;
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${classes["form-container"]} wrapper`}
      >
        <div className={classes["form-content"]}>
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
            <label className={classes.checkbox}>
              <input
                type="checkbox"
                onChange={() => setChecked((prev) => !prev)}
              ></input>
              Publish
            </label>
            <input id="image" type="file" onChange={encodeImageFileAsURL} />
          </div>
          <div className={classes["button-container"]}>
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
