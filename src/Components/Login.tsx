import { useState } from "react";
import { Modal, Button, TextInput, PasswordInput } from "@mantine/core";

type Props = {
  opened: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
};

export default function Login({ opened, onClose, onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("auth", "true");
      onLoginSuccess();
      onClose();
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Login" centered>
      <div className="flex flex-col gap-4">
        <TextInput
          label="Email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button onClick={handleLogin}>Login</Button>
      </div>
    </Modal>
  );
}
