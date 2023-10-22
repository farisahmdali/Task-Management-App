import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import AdminLogin from "./AdminLogin";
import AdminDashBoard from "./AdminDashBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/admin-dashboard" element={<AdminDashBoard/>}/>
      </Routes>
    </div>
  );
}

export default App;
