import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import UserEventsPage from "./pages/UserEventsPage";
import { Toaster } from "react-hot-toast";
import AdminUserManagement from "./pages/AdminUserManagement";
import AdminUserEvents from "./pages/AdminUserEvents";

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{ duration: 2000 }}
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/ems-admin-login" element={<AdminLoginPage />} />
        <Route path="/user-management" element={<AdminUserManagement />} />
        <Route path="/admin-user-events" element={<AdminUserEvents/>} />
        <Route path="/user-events" element={<UserEventsPage />} />
      </Routes>
    </>
  );
}
