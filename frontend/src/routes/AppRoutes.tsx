import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Tasks from "../pages/Tasks";

const Private = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/" 
          element={
            <Private>
              <Tasks />
            </Private>
          } 
        />
      </Routes>
    </Router>
  );
}