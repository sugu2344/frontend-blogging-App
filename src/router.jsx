import { createBrowserRouter } from "react-router";
import App from "./App";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import authLoader from "./loaders/unit/authLoader";
import Profile from "./pages/userprofile";
const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
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
