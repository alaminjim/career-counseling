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
            borderRadius: '16px',
            background: '#1e293b',
            color: '#fff',
            fontWeight: '600',
            fontSize: '14px',
            padding: '14px 20px',
          },
          success: {
            iconTheme: {
              primary: '#4f46e5',
              secondary: '#fff',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </AuthContext>
  </StrictMode>
);
