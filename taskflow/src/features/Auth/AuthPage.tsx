import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function AuthPage() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-lg font-medium text-gray-900">Bienvenue</h1>
          <p className="text-sm text-gray-500 mt-1">
            {isRegister
              ? "Créez votre compte gratuitement"
              : "Connectez-vous pour continuer"}
          </p>
        </div>
        <div className="flex bg-gray-100 border border-gray-200 rounded-xl p-1 mb-5">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              !isRegister
                ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              isRegister
                ? "bg-white text-indigo-600 shadow-sm border border-gray-200"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Inscription
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-7">
          {isRegister ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
