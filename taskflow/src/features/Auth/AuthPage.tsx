import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md">
        <div className="flex bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`w-1/2 py-3 text-sm font-semibold transition ${
              !isRegister
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsRegister(true)}
            className={`w-1/2 py-3 text-sm font-semibold transition ${
              isRegister
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Register
          </button>
        </div>

        <div className="bg-white w-full rounded-2xl p-6">
          <div className="transition-all duration-300">
            {isRegister ? <RegisterForm /> : <LoginForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
