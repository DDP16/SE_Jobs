import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { uiInput as Input, uiButton as Button, CustomAlert } from "../../../components";
import { srcAsset } from "../../../lib";
import { validateEmail, validatePassword } from "../../../modules";
import { loginWithEmail } from "../../../modules";
import { useCustomAlert } from "../../../hooks/useCustomAlert";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let nav = useNavigate();
  const { alertConfig, hideAlert, showSuccess, showError, showWarning} = useCustomAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!email) {
      setEmailError("Email is required.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password || !validatePassword(password)) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const result = await loginWithEmail(email, password);
        if (result && result.status === 200) {
          showSuccess("Login successful!");
          nav("/");
        }
      } catch (error) {
        console.error("Login error:", error);
        showWarning(error.message || "Login failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-anti-flash-white from-30% to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-9 left-12"
      >
        <img src={srcAsset.SELargeLogo} alt="KHOA CÔNG NGHỆ PHẦN MỀM" className="h-12 w-auto cursor-pointer" onClick={() => {nav("/");}} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl p-12 w-full lg:max-w-2/5 md:max-w-lg"
      >
        <div className="flex justify-between items-center mb-5">
          <div className="flex flex-col gap-2">
            <p className="text-[20px] text-gray-600 mb-1">Welcome to SE JOBS</p>
            <h3 className="text-3xl font-medium text-gray-900">Sign in</h3>
          </div>
          <div className="text-right">
            <p className="text-base text-gray-500">No Account?</p>
            <Link to="/signup" className="text-base text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-base font-medium text-gray-900">
              Enter your Email
            </label>
            <Input
              id="email"
              type="text"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            {emailError && (
              <p className="text-xs text-red-500 mt-1">{emailError}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-base font-medium text-gray-900">
              Enter your Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex items-center justify-end">
              {passwordError && (
                <span className="text-xs text-red-500 mr-auto">{passwordError}</span>
              )}
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                Forgot Password
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold"
          >
            Sign in
          </Button>
        </form>
      </motion.div>

      <CustomAlert
        {...alertConfig}
        onClose={hideAlert}
      />
    </div>
  );
};