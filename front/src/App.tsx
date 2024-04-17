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
import { isMobile } from "./utils/device";
import { MobileMealsPage } from "./modules/meals/pages/MobileMealsPage";
import { MobileHomePage } from "./modules/home/pages/MobileHomePage";

const WebWrapper = ({ children }: PropsWithChildren) => {
  document.body.style.overflowY = "hidden";
  return isMobile() ? <Navigate to="/mobile/home/meals" replace /> : children;
};

const MobileWrapper = ({ children }: PropsWithChildren) => {
  document.body.style.overflowY = "scroll";
  return isMobile() ? children : <Navigate to="/home" replace />;
};

const PrivateWrapper = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthenticationStore.getState().user?.token;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicWrapper = ({ children }: PropsWithChildren) => {
  const isAuthenticated = useAuthenticationStore.getState().user?.token;
  return isAuthenticated ? <Navigate to="/home/meals" replace /> : children;
};

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <WebWrapper>
        <PrivateWrapper>
          <HomePage />
        </PrivateWrapper>
      </WebWrapper>
    ),
    children: [
      { index: true, element: <Navigate to="/home/meals" replace /> },
      { path: "/home/meals", element: <MealsView /> },
      { path: "/home/analytics", element: <MealStats /> },
    ],
  },

  {
    path: "/mobile/home",
    element: (
      <MobileWrapper>
        <PrivateWrapper>
          <MobileHomePage />
        </PrivateWrapper>
      </MobileWrapper>
    ),
    children: [
      { index: true, element: <Navigate to="/mobile/home/meals" replace /> },
      { path: "/mobile/home/meals", element: <MobileMealsPage /> },
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
    element: <Navigate to="/home/meals" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
