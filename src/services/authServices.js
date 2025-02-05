import instance from "./instance";
const authServices = {
  //register
  register: async (data) => {
    return await instance.post("/register", data);
  },
  //authenticate
  login: async (data) => {
    return await instance.post("/authenticate", data);
  },
  //logout
  logout: async () => {
    return await instance.get("/logout");
  },
  //profile
  profile: async () => {
    return await instance.get("/profile");
  },
};

export default authServices;
