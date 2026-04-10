import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import type { User } from "../../../entities/User";

function LoginForm() {
  const { handleLogin, data, error, loading } = useLogin();

  const [form, setForm] = useState<User>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 shadow-2xl rounded-xl p-6 w-max-7xl"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Welcome back
      </h2>

      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl text-white font-semibold transition
        bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {loading ? "Loading..." : "Login"}
      </button>

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      {data && (
        <p className="text-green-600 text-sm text-center">
          Login successful ✅
        </p>
      )}
    </form>
  );
}

export default LoginForm;
