import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { KeyOutlined, UserOutlined } from "@ant-design/icons";
import logo from "/broc.png";
import { useAuthenticationStore } from "../authentication.store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginCard() {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const processing = useAuthenticationStore((state) => state.processing);
  const processingGoogle = useAuthenticationStore(
    (state) => state.processingGoogle
  );

  const authenticate = useAuthenticationStore((state) => state.authenticate);
  const authenticateWithGoogle = useAuthenticationStore(
    (state) => state.authenticateWithGoogle
  );

  const handleGoogleAuthError = () => {
    setErrorMessage("Google authentication failed");
  };
  const handleAuthenticateWithGoogle = async (res: CredentialResponse) => {
    if (!res.credential) return handleGoogleAuthError();
    await authenticateWithGoogle(res.credential);
    navigate("/home/meals", { replace: true });
  };

  const handleAuthenticate = async ({ email, password }: LoginFormData) => {
    try {
      await authenticate(email, password);
      navigate("/home/meals", { replace: true });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const errorAlert = errorMessage ? (
    <Alert message={errorMessage} style={{ width: "100%" }} type="error" />
  ) : undefined;

  const loginCardContent = (
    <Flex align="center" vertical gap={8}>
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
        <Form.Item name="email" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Email" type="email" prefix={<UserOutlined />} />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "" }]}>
          <Input.Password placeholder="Password" prefix={<KeyOutlined />} />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={processing}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
      <Flex align="center" justify="center" style={{ marginBottom: 12 }}>
        Or
      </Flex>
      <Flex style={{ width: "100%" }} align="center" justify="center">
        <GoogleLogin
          size="medium"
          width={300}
          onSuccess={handleAuthenticateWithGoogle}
          onError={handleGoogleAuthError}
        />
      </Flex>
    </Flex>
  );

  const loader = (
    <Flex justify="center">
      <Spin />
    </Flex>
  );

  return (
    <Card style={{ maxWidth: "350px", width: "100%" }}>
      <Flex align="center" vertical gap={12} style={{ marginBottom: 20 }}>
        <img src={logo} style={{ width: "80%" }} />
        <Typography.Text style={{ margin: "-2px 0px 8px 0px" }}>
          Track your macros like pro
        </Typography.Text>
        {errorAlert}
      </Flex>
      {processingGoogle ? loader : loginCardContent}
    </Card>
  );
}
