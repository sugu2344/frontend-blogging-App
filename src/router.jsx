import { createBrowserRouter } from "react-router";
import App from "./App";
import { Children } from "react";
const routes = [
  {
    path: "/",
    element: <App />,
    Children: [{}],
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
