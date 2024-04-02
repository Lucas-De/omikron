import { Alert, Button, Card, Flex, Input, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import logo from "/broc.png";
import { useAuthenticationStore } from "../authentication.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginCard() {
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const processing = useAuthenticationStore((state) => state.processing);
  const authenticate = useAuthenticationStore((state) => state.authenticate);

  const handleAuthenticate = async () => {
    try {
      await authenticate(name, password);
      navigate("/home/meals", { replace: true });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const errorAlert = errorMessage ? (
    <Alert message={errorMessage} style={{ width: "100%" }} type="error" />
  ) : undefined;

  return (
    <Card style={{ maxWidth: "350px", width: "100%" }}>
      <Flex align="center" vertical gap={12}>
        <img src={logo} style={{ width: "80%" }} />
        <Typography.Text style={{ margin: "-2px 0px 8px 0px" }}>
          Track your macros like pro
        </Typography.Text>

        {errorAlert}

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={processing}
          placeholder="Username"
          type="text"
          prefix={<UserOutlined />}
        />
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={processing}
          placeholder="Password"
          type="password"
          prefix={<KeyOutlined />}
        />
        <Button
          type="primary"
          block
          loading={processing}
          onClick={handleAuthenticate}
        >
          Sign In
        </Button>
      </Flex>
    </Card>
  );
}
