import { useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/auth/userSlice";
import Layout from "./layouts/layout";
import { Outlet } from "react-router-dom";

const App = () => {
  const user = useLoaderData(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUser(user)); 
    }
  }, [user, dispatch]);

  return (
    <div>
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
};

export default App;
