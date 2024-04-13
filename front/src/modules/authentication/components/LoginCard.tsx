import { Alert, Button, Card, Flex, Form, Input, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import logo from "/broc.png";
import { useAuthenticationStore } from "../authentication.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginCard() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const processing = useAuthenticationStore((state) => state.processing);
  const authenticate = useAuthenticationStore((state) => state.authenticate);
  const authenticateWithGoogle = useAuthenticationStore(
    (state) => state.authenticateWithGoogle
  );

  const handleAuthenticate = async ({ username, password }: LoginFormData) => {
    try {
      await authenticate(username, password);
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
        <Form
          name="login"
          style={{ width: "100%" }}
          disabled={processing}
          initialValues={{ remember: true }}
          onFinish={handleAuthenticate}
          autoComplete="off"
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item name="username" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Username" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "" }]}>
            <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      <Flex
        align="center"
        justify="center"
        style={{ marginBottom: 12, padding: "8px 0px" }}
      >
        Or
      </Flex>
      <Flex style={{ width: "100%" }} align="center" justify="center">
        <GoogleLogin
          size="medium"
          width={300}
          onSuccess={({ credential }) => {
            if (credential) authenticateWithGoogle(credential);
            else setErrorMessage("Google authentication failed");
          }}
          onError={() => {
            setErrorMessage("Google authentication failed");
          }}
        />
      </Flex>
    </Card>
  );
}
