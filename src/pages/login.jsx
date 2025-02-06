import { toast } from "react-toastify";
import {
  selectEmail,
  selectPassword,
  setPassword,
  setEmail,
} from "../redux/features/auth/loginSlice";
import { setUser } from "../redux/features/auth/userSlice"; //1
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
      const response = await authServices.login({
        email,
        password,
      });

      const data = response.data;
      console.log(data);

      if (data.token) {
        toast.success("Logged in successfully");

        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(setUser(data.user));
        // Clear input fields
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        console.log("User Role:", data.user?.role);

        // Navigate based on role
        if (data.user?.role === "admin") {
          navigate("/admin/adminDashboard");
        } else {
          navigate("/user/userDashboard");
        }
      } else {
        console.log("Login failed:", data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div className="max-w-xs mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h2 className="text-xl mb-4">Login</h2>
      <form className="space-y-3 flex flex-col" onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded-md"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded-md"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button className="bg-blue-500 text-white p-2 rounded-md">Login</button>
      </form>
      <button className="bg-blue-500 text-white p-2 px-20 mt-5 rounded-md">
        <a href="/forgotPassword">Forgot Password</a>
      </button>
    </div>
  );
};

export default Login;
