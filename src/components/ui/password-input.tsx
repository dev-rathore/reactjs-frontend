import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "./input";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex-1">
      <Input
        {...props}
        ref={ref}
        type={showPassword ? "text" : "password"}
        className="pr-11"
      />
      {
        showPassword ? (
          <Eye
            width={20}
            height={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeOff
            width={20}
            height={20}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          />
        )
      }
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
