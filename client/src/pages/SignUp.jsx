import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function SignUp() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(fasle);
        return;
      }
      setError(null)
    navigate('/sign-in')
      // console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="username"
        />
        <input
          type="text"
          placeholder="Email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="email"
        />
        <input
          type="text"
          placeholder="Password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
          id="password"
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase
        hover:opacity-95 disabled:opacity-80 transition transform hover:scale-105 active:scale-95"
        >
          {loading? "loading ..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-3 mt-5 justify-center">
        <p>Have an Account</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 underline">Sign-in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}

export default SignUp;
