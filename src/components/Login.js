import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="relative h-screen bg-black text-white">
      <Header />

      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-60"
          src="https://cdn-images-1.medium.com/max/1024/1*5lyavS59mazOFnb55Z6znQ.png"
          alt="Login Background"
        />
      </div>

      <div className="relative flex justify-center items-center h-full">
        <form className="bg-black bg-opacity-50 p-10 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            {isSignInForm ? "Sign In" : "SignUp"}
          </h2>
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 mb-6 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          )}
          <input
            type="text"
            placeholder="Email address"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-300"
          >
            {isSignInForm ? "Sign In" : "SignUp"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign up now"
              : "Already have an account? Sign in"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
