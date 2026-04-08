import React, { useState } from "react";
import { useRegister } from "../hooks/useRegister"; // adapte le chemin
import type { User } from "../../../entities/User";

function RegisterForm() {
  const { handleRegister, data, error, loading } = useRegister();

  const [form, setForm] = useState<User>({
    email: "",
    password: "",
    username: "",
  });

  // gestion des inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit  formu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
      />

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
        {loading ? "Loading..." : "Register"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <p>Inscription réussie ✅</p>}
    </form>
  );
}

export default RegisterForm;
