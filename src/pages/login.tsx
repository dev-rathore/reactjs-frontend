import { useState } from "react";

import LoginForm from "@/components/login-form";
import RegisterModal from "@/components/register-modal";

const Login = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center">
      <LoginForm openRegister={() => setShowRegisterModal(true)} />
      {
        showRegisterModal && <RegisterModal close={() => setShowRegisterModal(false)} />
      }
    </div>
  );
};

export default Login;
