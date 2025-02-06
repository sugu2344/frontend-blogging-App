import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import authLoader from "./loaders/unit/authLoader";
import Profile from "./pages/userprofile";
import Logout from "./pages/logout";
import UserLayout from "./layouts/userlayout";
import UserDashboard from "./pages/user/userdashboard";
import AdminLayout from "./layouts/adminLayout";
import AdminDashboard from "./pages/admin/admindashboard";
// import CreatePost from "./pages/blog";
import CreateBlogPost from "./pages/blog";
const routes = [
  {
    path: "/",
    element: <App />,
    // loader: authLoader,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      //
      {
        path: "user",
        element: <UserLayout />,
        loader: authLoader,
        children: [
          {
            path: "userDashboard",
            element: <UserDashboard />,
          },
          {
            path: "createblog",
            element: <CreateBlogPost/>,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminLayout />,
        loader: authLoader,
        children: [
          {
            path: "adminDashboard",
            element: <AdminDashboard />,
          },
          {
            path: "createblog",
            element: <CreateBlogPost/>,
          },
        ],
      },
    ],
    hydrateFallbackElement: <p>loading....</p>,
  },
];
const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});
export default router;
