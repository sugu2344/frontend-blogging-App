import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPassword,
  setEmail,
  setName,
  setPassword,
} from "../redux/features/auth/registerSlice";
import { toast } from "react-toastify";
import authServices from "../services/authServices";
import { useNavigate } from "react-router";

const Register = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    toast.success("Registering");
    try {
      const response = await authServices.register({ name, email, password });

      if (response.status === 201) {
        toast.success("Registered successfully");

        // Clear the form
        dispatch(setName(""));
        dispatch(setEmail(""));
        dispatch(setPassword(""));

        // Redirect to the login page
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Register Here
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleRegister}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition-all duration-200"
            type="submit"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
