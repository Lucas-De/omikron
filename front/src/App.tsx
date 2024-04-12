import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { HomePage } from "./modules/home/pages/HomePage";
import { LoginPage } from "./modules/authentication/pages/AuthenticationPage";
import { useAuthenticationStore } from "./modules/authentication/authentication.store";
import { MealStats } from "./modules/analytics/components/MealsStats";
import { MealsView } from "./modules/meals/components/MealsView";
import { PropsWithChildren } from "react";

const PrivateWrapper = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthenticationStore.getState().user?.token;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicWrapper = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthenticationStore.getState().user?.token;
  return isAuthenticated ? <Navigate to="/home/meals" /> : children;
};

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <PrivateWrapper>
        <HomePage />
      </PrivateWrapper>
    ),
    children: [
      { path: "/home/meals", element: <MealsView /> },
      { path: "/home/analytics", element: <MealStats /> },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicWrapper>
        <LoginPage />
      </PublicWrapper>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/home/meals" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
