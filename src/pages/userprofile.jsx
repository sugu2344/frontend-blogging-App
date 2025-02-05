import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../redux/features/auth/userSlice";
const Profile = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log("User in Profile Component:", user);
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);
  if (!user) {
    return null;
  }
  return (
    <div>
      <h1 className="text-center text-3xl font-semibold mt-10">
        Welcome to Your Profile
      </h1>
      <div className="flex justify-center mt-10">
        <div className="w-1/3">
          <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">User Details</h2>
            <p className="mt-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mt-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mt-2">
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
