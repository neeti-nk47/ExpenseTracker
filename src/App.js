import { Routes, Route, Navigate } from "react-router-dom";
import SignupLogin from "./components/SignupLogin";
import Welcome from "./components/Welcome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
