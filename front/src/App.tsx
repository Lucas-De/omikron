import { useState } from "react";
import viteLogo from "/vite.svg";
import { ConfigProvider, Layout, theme } from "antd";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
        <Layout>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
        </Layout>
      </ConfigProvider>

      <style jsx>{``}</style>
    </>
  );
}

export default App;
