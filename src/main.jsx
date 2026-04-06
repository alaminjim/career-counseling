import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import router from "./Routes/Routes.jsx";
import { RouterProvider } from "react-router-dom";
import AuthContext from "./Components/Auth/AuthContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContext>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '24px',
            background: '#1e293b',
            color: '#fff',
            fontWeight: '700',
            fontSize: '14px',
            padding: '16px 24px',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          },
          success: {
            iconTheme: {
              primary: '#2dd4bf',
              secondary: '#042f2e',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
);
