import { Outlet } from "react-router-dom";

export function HomePageMobile() {
  return (
    <div
      style={{
        boxSizing: "border-box",
        padding: 16,
        overflowY: "scroll",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Outlet />
    </div>
  );
}
