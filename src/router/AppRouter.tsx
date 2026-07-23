import { Route, Routes } from "react-router-dom";
import routes from "./routes";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";
import Layout from "@/components/Layout/Layout";

const routeElement = (route: (typeof routes)[0]) => {
  const routeElementWithLayout = route.layout ? (
    <Layout>
      <route.component />
    </Layout>
  ) : (
    <route.component />
  );
  if (route.private) {
    return <PrivateRoute>{routeElementWithLayout}</PrivateRoute>;
  }
  return routeElementWithLayout;
};

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={routeElement(route)}
        />
      ))}
    </Routes>
  );
};
