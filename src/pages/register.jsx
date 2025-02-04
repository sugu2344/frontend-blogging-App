import { useDispatch, useSelector } from "react-redux";
import {
  selectEmail,
  selectName,
  selectPassword,
  setEmail,
  setName,
  setPassword,
} from "../redux/features/auth/registerSlice";

const Register = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);
  const password = useSelector(selectPassword);

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registering...");
    console.log(name, email, password);
  };

  return (
    <div className="max-w-xs mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Candidate Registration</h2>
      <form className="flex flex-col space-y-3" onSubmit={handleRegister}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => dispatch(setName(e.target.value))}
        />
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
        <button className="bg-blue-500 text-white py-2 rounded" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
