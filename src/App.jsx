// import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router";

const routes = [
  {
    path: "/",
    element: <h1>hello world</h1>,
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

const App = () => {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
};

export default App;
