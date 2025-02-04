import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectPassword,
  setEmail,
  setPassword,
} from "../redux/features/auth/loginSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import authServices from "../services/authServices";

const Login = () => {
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await authServices.login({ email, password });

      if (response.status === 201) {
        toast.success("Logged in successfully");

        // clear the form
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        // redirect to home page
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-xs mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <form className="flex flex-col space-y-3" onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />
        <button className="bg-blue-500 text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
