import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

import { setAuthToken } from "@/lib/storage";
import { loginUser } from "@/api/auth";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import PasswordInput from "./ui/password-input";

const LoginForm = ({ openRegister }: { openRegister: () => void }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setError("");
      setAuthToken(data.token);
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Login failed");
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = (data: { username: string; password: string }) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-lg min-w-md mx-auto p-6 space-y-4 bg-background shadow-md rounded-lg">
      <h2 className="text-2xl font-bold">Login</h2>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Input
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        type="text"
      />

      <PasswordInput
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Button
        disabled={mutation.isPending}
        onClick={() => handleLogin({
          username,
          password,
        })}
        size="lg"
        type="submit"
      >
        {mutation.isPending ? "Logging in..." : "Login"}
      </Button>

      <p className="text-sm">
        Not registered?{" "}
        <button onClick={openRegister} className="text-blue-500 cursor-pointer">
          Register here
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
