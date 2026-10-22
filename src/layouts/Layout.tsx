import { Outlet } from "react-router-dom";
import { BackgroundImageComponent } from "../components/BackgroundImageComponent.tsx";

export function Layout() {
  return (
    <>
      <BackgroundImageComponent />
      <Outlet />
    </>
  );
}
