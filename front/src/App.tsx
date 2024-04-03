import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "./modules/home/pages/HomePage";
import { LoginPage } from "./modules/authentication/pages/AuthenticationPage";
import { useAuthenticationStore } from "./modules/authentication/authentication.store";
import { MealTable } from "./modules/meals/components/MealTable";
import { MealStats } from "./modules/meals/components/MealStats";

const PrivateWrapper = () => {
  const isAuthenticated = useAuthenticationStore.getState().user?.token;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const PublicWrapper = () => {
  const isAuthenticated = useAuthenticationStore.getState().user?.token;
  return isAuthenticated ? <Navigate to="/home/meals" /> : <Outlet />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route element={<PrivateWrapper />}>
        <Route path="/home" element={<HomePage />}>
          <Route index path="meals" element={<MealTable />}></Route>
          <Route path="stats" element={<MealStats />}></Route>
        </Route>
      </Route>

      <Route element={<PublicWrapper />}>
        <Route path="/login" element={<LoginPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
