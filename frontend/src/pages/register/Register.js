import classes from "./Register.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { saveUsertodb, login } from "../../store/reducer/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "./validation";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Loader } from "../../components";

export const Register = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const form = useForm({
    resolver: yupResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      dob: "2001-12-12",
    },
    mode: "all",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const whenSubmitted = async (data) => {
    dispatch(isLogin ? login(data) : saveUsertodb(data));
  };
  return loading ? (
    <Loader />
  ) : (
    <div className={`${classes["login-container"]} wrapper`}>
      <div className={`${classes["logo-container"]}`}>
        <h1 className={`${classes["heading"]}`}>Blogosphere</h1>
        <p className={`${classes["tagline"]}`}>
          <i>like atmosphere like Blogosphere</i>
        </p>
      </div>
      <div className={`${classes["form-container"]}`}>
        <form
          onSubmit={handleSubmit(whenSubmitted)}
          className={classes["form-data"]}
        >
          {!isLogin && (
            <>
              <div className={`${classes["name-container"]}`}>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="Firstname"
                    id="firstname"
                    {...register("firstname")}
                  ></input>
                  {!!errors.firstname && (
                    <p className={classes["error-message"]}>
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="Lastname"
                    id="lastname"
                    {...register("lastname")}
                  ></input>
                  {!!errors.lastname && (
                    <p className={classes["error-message"]}>
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>
              <div className={`${classes["name-container"]}`}>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="text"
                    placeholder="Username"
                    id="username"
                    {...register("username")}
                  ></input>
                  {!!errors.username && (
                    <p className={classes["error-message"]}>
                      {errors.username.message}
                    </p>
                  )}
                </div>
                <div className={classes["input-group"]}>
                  <input
                    className={`${classes["input-container"]}`}
                    type="date"
                    id="dob"
                    {...register("dob")}
                  ></input>
                  {!!errors.dob && (
                    <p className={classes["error-message"]}>
                      {errors.dob.message}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
          <div className={classes["input-group"]}>
            <input
              className={`${classes["input-container"]}`}
              type="email"
              placeholder="Email"
              {...register("email")}
            ></input>
            {!!errors.email && (
              <p className={classes["error-message"]}>{errors.email.message}</p>
            )}
          </div>
          <div className={classes["input-group"]}>
            <input
              className={`${classes["input-container"]}`}
              type="password"
              placeholder="Password"
              {...register("password")}
            ></input>
            {!!errors.password && (
              <p className={classes["error-message"]}>
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className={`${classes["login-button"]}`}>
            {isLogin ? `Login` : `Signup`}
          </Button>

          {!isLogin ? (
            <p
              onClick={() => navigate("/login")}
              className={`${classes["question"]}`}
            >
              Already have an account ?
            </p>
          ) : (
            <p
              onClick={() => navigate("/signup")}
              className={`${classes["question"]}`}
            >
              Don't have an account ?
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
