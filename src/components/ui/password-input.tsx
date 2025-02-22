import React, { useState, forwardRef } from "react";
import { Input } from "./input";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex-1">
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        className="pr-10"
      />
      {
        showPassword ? (
          <Eye
            width={20}
            height={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeOff
            width={20}
            height={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        )
      }
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
