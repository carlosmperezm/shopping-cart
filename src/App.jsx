import NavBar from "./components/navbar";
import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <NavBar />
      <div id="content">
        <Outlet />
      </div>
    </>
  );
}
