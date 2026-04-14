import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import type { User } from "../../../entities/User";

function LoginForm() {
  const { handleLogin, data, error, loading } = useLogin();
  const [form, setForm] = useState<User>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(form);
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-center text-gray-800 mb-6">
        Welcome back
      </h2>
      <div className="space-y-3 mb-5">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-lg text-sm text-white font-medium transition
          bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Login"}
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center mt-3">{error}</p>
      )}
      {data && (
        <p className="text-green-600 text-sm text-center mt-3">
          Login successful ✅
        </p>
      )}
    </div>
  );
}

export default LoginForm;
