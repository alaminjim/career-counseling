import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import CareerCard from "../Components/CareerCard/CareerCard";
import Services from "../Components/Services/Services";
import CareerDetails from "../Components/CareerDetails.jsx/Careerdetails";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import ErrorPage from "../Components/Error/ErrorPage";
import App from "../App";
import PrivateRoute from "../Components/Private/PrivateRoute";
import MyProfile from "../Components/MyProfile/MyProfile";
import Career from "../Components/Career/Career";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <CareerCard></CareerCard>,
        loader: () => fetch("/career.json"),
      },
    ],
  },
  {
    path: "/services",
    element: <Services></Services>,
    loader: () => fetch("/career.json"),
  },
  {
    path: "/services/:id",
    element: (
      <PrivateRoute>
        <CareerDetails></CareerDetails>
      </PrivateRoute>
    ),
    loader: () => fetch("/career.json"),
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <MyProfile></MyProfile>
      </PrivateRoute>
    ),
  },
  {
    path: "/career",
    element: <Career></Career>,
  },
]);

export default router;
