import { Outlet } from "react-router-dom";
import BackToTop from "./Components/BackToTop/BackToTop";

function App() {
  return (
    <>
      <Outlet />
      <BackToTop />
    </>
  );
}

export default App;
