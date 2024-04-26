import React from "react";
import ReactDOM from "react-dom/client";

import "./globals.css";
import { ConfigProvider, ThemeConfig, theme } from "antd";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { color } from "./common/design-tokens/color";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const antdTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: color.primary,
    colorBgBase: color.background,
  },
  components: {
    Layout: {
      bodyBg: color.background,
      headerBg: color.background,
      siderBg: color.background,
    },
    Menu: {
      darkItemBg: color.background,
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
