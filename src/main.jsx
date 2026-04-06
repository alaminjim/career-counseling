import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthContext from "./Components/Auth/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import Loading from "./Components/Loading/Loading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '20px',
            background: '#ffffff',
            color: '#111827',
            fontWeight: '800',
            fontSize: '14px',
            padding: '16px 24px',
            border: '1px solid #F3F4F6',
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.05)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          },
          success: {
            iconTheme: {
              primary: '#4F46E5',
              secondary: '#EEF2FF',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#FEF2F2',
            },
          },
        }}
      />
      <RouterProvider router={router} fallbackElement={<Loading />} />
    </AuthContext>
  </StrictMode>
);
