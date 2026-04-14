import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function AuthPage() {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex bg-white border border-gray-100 rounded-xl overflow-hidden mb-4">
          <button
            onClick={() => setIsRegister(false)}
            className={`w-1/2 py-3 text-sm font-medium transition ${
              !isRegister
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`w-1/2 py-3 text-sm font-medium transition ${
              isRegister
                ? "bg-blue-600 text-white"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            Register
          </button>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-8">
          {isRegister ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
