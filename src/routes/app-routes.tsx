import { BrowserRouter as Router, Routes, Route } from "react-router";

import LoginPage from "@/pages/login";
import HomePage from "@/pages/home";
import ProtectedRoute from "@/components/protected-route";
import FourZeroFour from "@/pages/four-zero-four";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
