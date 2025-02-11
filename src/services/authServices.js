import instance from "./instance";
const authServices = {
  //register
  register: async (data) => {
    return await instance.post("/user/register", data);
  },
  //authenticate
  login: async (data) => {
    return await instance.post("user/authenticate", data);
  },
  //logout
  logout: async () => {
    return await instance.get("/user/logout");
  },
  //profile
  profile: async () => {
    return await instance.get("/user/profile");
  },
  // //logout
  // logout: async () => {
  //   return await instance.post("/logout");
  // },
};

export default authServices;
