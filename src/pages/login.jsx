import { toast } from "react-toastify";
import {
  selectEmail,
  selectPassword,
  setPassword,
  setEmail,
} from "../redux/features/auth/loginSlice";
import { setUser } from "../redux/features/auth/userSlice";
import { useDispatch, useSelector } from "react-redux";
import authServices from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authServices.login({ email, password });
      const data = response.data;

      if (data.token) {
        toast.success("Logged in successfully");

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setUser(data.user));
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        navigate(
          data.user?.role === "admin"
            ? "/admin/adminDashboard"
            : "/user/userDashboard"
        );
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
        Login
      </h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
      </form>
      <button className="bg-blue-500 w-full text-white p-2 px-20 mt-5 rounded-md">
        <a href="/forgotPassword">Forgot Password</a>
      </button>
      {/* dummy */}
    </div>
  );
};

export default Login;
