import MainLayout from "@/components/layouts/MainLayout";
import { useAppSelector } from "@/core/redux/hooks";
import { useLoginMutation } from "@/core/redux/slices/auth/queries";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "johnd",
    password: "m38rmF$",
  });
  const { token } = useAppSelector((state) => state.auth);
  const [login, { isSuccess, isLoading, isError }] = useLoginMutation();
  if (token) {
    router.push("/");
  }
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen">
        {isLoading && <div>Logging in...</div>}
        {!isLoading && (
          <form onSubmit={handleSubmit} className="p-6 flex flex-col">
            {isSuccess && <div>Login success</div>}
            {isError && <div>Login failed, Double check your input</div>}
            <input
              type="text"
              className="py-3 px-6 bg-gray-100 focus-within:bg-gray-200 focus-within:outline-none mt-6 rounded-lg "
              name="username"
              onChange={handleChange}
              value={credentials.username}
              placeholder="username"
            />
            <input
              type="text"
              className="py-3 px-6 bg-gray-100 focus-within:bg-gray-200 focus-within:outline-none mt-4 rounded-lg "
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="password"
            />
            <button
              type="submit"
              className="mt-6 py-3 px-6 bg-black text-white rounded-lg"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </MainLayout>
  );
};

export default LoginPage;
