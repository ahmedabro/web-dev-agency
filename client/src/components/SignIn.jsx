import { useState, useEffect } from "react";
import { useSigninUserMutation } from "../redux/api/userApi";
import { useGetUserQuery } from "../redux/api/userApi";
import { Navigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinUser] = useSigninUserMutation();

  const { data, isFetching, error } = useGetUserQuery();
  const user = data?.user || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signinUser({ email, password }).unwrap(); // Trigger signin
  };

  // If the user is logged in, redirect to /admin
  if (isFetching) return <p>Loading...</p>;

  if (user) return <Navigate to="/admin" replace />; // If logged in, go to /admin

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;