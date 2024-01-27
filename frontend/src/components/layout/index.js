import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Layout = () => {
  const router = useLocation();
  const { pathname } = router;
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && pathname !== "/login" && pathname !== "/signup")
      navigate("/login");
  }, [user, navigate, pathname]);
  return (
    <>
      {!(pathname === "/signup" || pathname === "/login") && <Navbar />}
      <Outlet />
    </>
  );
};
export default Layout;
