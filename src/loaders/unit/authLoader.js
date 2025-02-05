import authServices from "../../services/authServices";

const authLoader = async () => {
  try {
    const response = await authServices.profile();
    console.log("User Data from API:", response.data); // Debugging line
    return response.data; // Ensure this returns the correct user object
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};

export default authLoader;
