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
import { HomePageMobile } from "./modules/home/pages/MobileHomePage";
import { MobileMealsView } from "./modules/meals/components/MobileMealsView";

const WebWrapper = ({ children }: PropsWithChildren) => {
  return isMobile() ? <Navigate to="/mobile" replace /> : children;
};

const MobileWrapper = ({ children }: PropsWithChildren) => {
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
    path: "/mobile",
    element: (
      <MobileWrapper>
        <PrivateWrapper>
          <HomePageMobile />
        </PrivateWrapper>
      </MobileWrapper>
    ),
    children: [
      { index: true, element: <Navigate to="/mobile/meals" replace /> },
      {
        path: "/mobile/meals",
        element: <MobileMealsView />,
      },
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
