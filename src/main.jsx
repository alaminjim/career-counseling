import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes.jsx";
import AuthContext from "./Components/Auth/AuthContext.jsx";
import { Toaster } from "react-hot-toast";
import Loading from "./Components/Loading/Loading.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthContext>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: '24px',
              background: '#1F2937',
              color: '#F9FAFB',
              fontWeight: '900',
              fontSize: '12px',
              padding: '20px 32px',
              border: '1px solid #374151',
              boxShadow: '0 40px 100px -20px rgba(0, 0, 0, 0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              backdropFilter: 'blur(16px)',
            },
            success: {
              iconTheme: {
                primary: '#22D3EE',
                secondary: '#111827',
              },
            },
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#111827',
              },
            },
          }}
        />
        <RouterProvider router={router} fallbackElement={<Loading />} />
      </AuthContext>
    </ClerkProvider>
  </StrictMode>
);
