import { BrowserRouter as Router, Routes, Route } from "react-router";

import Login from "@/pages/login";
import Home from "@/pages/home";
import ProtectedRoute from "@/components/protected-route";
import FourZeroFour from "@/pages/four-zero-four";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
