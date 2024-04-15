import React from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const antdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#4fb27b",
    colorBgBase: "black",
  },
  components: {
    // Table: {
    //   headerBg: "black",
    //   headerSortActiveBg: "black",
    //   headerSortHoverBg: "black",
    //   borderColor: "#1e1e1e",
    //   headerSplitColor: "transparent",
    // },
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
    Form: {
      itemMarginBottom: 12,
    },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ConfigProvider theme={antdTheme}>
        <App />
      </ConfigProvider>
    </GoogleOAuthProvider>
    ;
  </React.StrictMode>
);
