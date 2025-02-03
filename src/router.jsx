import { createBrowserRouter } from "react-router";
import App from "./App";
const routes = [
  {
    path: "/",
    element: <App />,
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
