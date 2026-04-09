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
      className="flex justify-center items-center flex-col"
      onSubmit={handleSubmit}
    >
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <p style={{ color: "green" }}>Login sucess</p>}
    </form>
  );
}

export default LoginForm;
