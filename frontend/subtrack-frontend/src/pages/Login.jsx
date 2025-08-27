import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    console.log("Attempting login with:", { email, password });
    
    try {
      const result = await login(email, password);
      console.log("Login result:", result);
      
      if (result.success) {
        console.log("Login successful, navigating to dashboard");
        navigate("/dashboard");
      } else {
        console.log("Login failed:", result.error);
        setError(result.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setError("");
    setLoading(true);
    
    console.log("Testing login with test@example.com / password123");
    
    try {
      const result = await login('test@example.com', 'password123');
      console.log("Test login result:", result);
      
      if (result.success) {
        console.log("Test login successful, navigating to dashboard");
        navigate("/dashboard");
      } else {
        console.log("Test login failed:", result.error);
        setError(result.error || "Test login failed");
      }
    } catch (err) {
      console.error("Test login error:", err);
      setError("Test login error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary w-full mb-3"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button 
          type="button" 
          onClick={handleTestLogin}
          className="btn btn-secondary w-full mb-3"
          disabled={loading}
        >
          {loading ? "Testing..." : "Test Login (test@example.com)"}
        </button>
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </Link>
        </p>
        
        {/* Debug info */}
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <p>Debug: Try logging in with test@example.com / password123</p>
          <p>Or use the "Test Login" button above</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
