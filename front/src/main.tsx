import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./globals.css";
import { ConfigProvider, theme } from "antd";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#f4413b",
          colorBgBase: "black",
        },
        components: {
          Layout: {
            bodyBg: "black",
            headerBg: "black",
            siderBg: "black",
          },
          Menu: {
            darkItemBg: "black",
            darkItemSelectedBg: "rgba(255,255,255,.08)",
            darkItemHoverBg: "rgba(255,255,255,.04)",
          },
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
