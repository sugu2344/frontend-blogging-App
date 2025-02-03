import { createBrowserRouter } from "react-router";
import App from "./App";
import List from "./pages/list";
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <List />,
      },
    ],
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
