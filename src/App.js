import { Routes, Route, Navigate } from "react-router-dom";
import SignupLogin from "./components/SignupLogin";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import CompleteProfile from "./components/CompleteProfile";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/welcome/CompleteProfile"
            element={<CompleteProfile />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
