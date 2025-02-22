import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { XIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import PasswordInput from "./ui/password-input";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

type RegisterFormData = z.infer<typeof schema>;

const RegisterModal = ({ close }: { close: () => void }) => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setError("");
      toast("Registration successful! Please login.");
      close();
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Registration failed");
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center transition-all duration-300 ease-in-out">
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black opacity-50" onClick={close} />
      <div className="relative z-10 min-w-md p-6 pb-0 space-y-4 bg-background shadow-md rounded-lg">
        <h2 className="text-2xl font-bold">Register</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="space-y-2">
          <Input {...register("username")} placeholder="Username" type="text" />
          {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
        </div>

        <div className="space-y-2">
          <PasswordInput {...register("password")} placeholder="Password" />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>

        <Button
          disabled={mutation.isPending}
          onClick={handleSubmit(onSubmit)}
          size="lg"
        >
          {mutation.isPending ? "Registering..." : "Register"}
        </Button>

        <Button onClick={close} className="absolute top-2 right-2" variant="ghost" size="icon">
          <XIcon size={24} />
        </Button>
      </div>
    </div>
  );
};

export default RegisterModal;
