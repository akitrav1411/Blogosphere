import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";

const Layout = () => {
  const router = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  const { pathname } = router;

  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/signup")
      navigate("/login");
  }, [user, pathname, navigate]);

  return (
    <>
      {!(pathname === "/signup" || pathname === "/login") && <Navbar />}
      <Outlet />
    </>
  );
};

export default Layout;
