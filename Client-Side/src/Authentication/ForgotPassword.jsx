import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const auth = getAuth();

  // Handle input changes
  const handleInputChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email) {
      setMessage("");
      setEmailError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("");
      setEmailError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");
    setEmailError("");

    try {
      // Send password reset email using Firebase
      await sendPasswordResetEmail(auth, email);
      setLoading(false);
      setMessage("A password reset link has been sent to your email!");

      // Reset the form fields
      setEmail("");
    } catch (error) {
      setLoading(false);
      setMessage("An error occurred, please try again.");
    }
  };

  // Handle going back to the previous page
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-rose-200 to-pink-300">
      <div className="w-full max-w-xl p-8 m-4 rounded-xl bg-white backdrop-blur-lg bg-opacity-95 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Forgot Password
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-300"
              placeholder="your@email.com"
            />
          </div>

          {emailError && (
            <p className="text-sm text-red-500 animate-pulse">
              {emailError}
            </p>
          )}

          {message && (
            <p className={`text-sm font-medium ${
              message.includes("sent") 
                ? "text-green-600" 
                : "text-red-500"
            }`}>
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-white transform hover:-translate-y-0.5 transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={handleBack}
            className="text-purple-600 hover:text-pink-600 font-semibold transition-colors duration-200"
          >
            I remember my password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;