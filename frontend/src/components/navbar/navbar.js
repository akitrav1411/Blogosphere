import { useDispatch, useSelector } from "react-redux";
import classes from "./navbar.module.css";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../store/reducer/userSlice";
import { useState } from "react";
import { HamburgerBtn } from "../../assets";
import { Image } from "../image";
import { Button } from "../button";
export const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [showBtn, setShowBtn] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/login");
  };
  const handleHamburgerHandler = () => {
    setShowBtn((prev) => !prev);
  };
  const handleCloseHandler = () => {
    setShowBtn((prev) => !prev);
  };
  return (
    <nav className={classes["main-navbar"]}>
      <div className={`${classes["navbar-container"]} wrapper`}>
        <div className={classes["logo-container"]}>
          <h1 className={classes.heading} onClick={() => navigate("/")}>
            Blogosphere
          </h1>
        </div>
        {user && (
          <>
            <div className={classes["logout-container"]}>
              <a className={classes["navbar-tags"]} href="/create">
                Create blog
              </a>
              <a className={classes["navbar-tags"]} href="/myblogs">
                My blogs
              </a>
              <Button
                color="secondary"
                className={classes["logout-button"]}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <p
                className={classes["user-icon"]}
                onClick={() => navigate("/profile")}
              >
                {user.firstname.charAt(0).toUpperCase()}
              </p>
            </div>
            {showBtn ? (
              <button
                onClick={handleHamburgerHandler}
                className={classes["hamburger-btn"]}
              >
                <Image src={HamburgerBtn} />
              </button>
            ) : (
              <div onClick={handleCloseHandler} className={classes.overlay}>
                <div className={classes.hamburger}>
                  <div className={classes["logout-profile"]}>
                    <Button
                      color="secondary"
                      className={classes["logout-button"]}
                      onClick={() => navigate("/myblogs")}
                    >
                      My Blogs
                    </Button>
                    <Button
                      color="secondary"
                      className={classes["logout-button"]}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => navigate("/profile")}
                      className={classes["user-icon"]}
                    >
                      Profile
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};
