import React from "react";
import Layout from "./layouts/layout";
import { Outlet } from "react-router";

const App = () => {
  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default App;
