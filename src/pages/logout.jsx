import { useEffect } from "react";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/features/auth/userSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await authServices.logout();

        if (response.status === 200) {
          toast.success("Logged out successfully!");

          // ✅ Remove user details from localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          // ✅ Clear Redux state
          dispatch(clearUser());

          setTimeout(() => {
            navigate("/", { replace: true });
          }, 1000);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || "Logout failed!");
      }
    };

    logoutUser();
  }, [navigate, dispatch]);

  return <div>Logging Out... Please Wait...</div>;
};

export default Logout;
