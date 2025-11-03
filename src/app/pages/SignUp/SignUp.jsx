import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { srcAsset } from "../../lib";
import { register, validateEmail, validatePassword } from "../../modules";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  let nav = useNavigate();

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

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (!firstname) {
      setFirstnameError("First name is required.");
      valid = false;
    } else {
      setFirstnameError("");
    }

    if (!lastname) {
      setLastnameError("Last name is required.");
      valid = false;
    } else {
      setLastnameError("");
    }

    if (valid) {
      try {
        const result = await register(email, password, firstname, lastname);
        if (result && result.status === 200) {
          nav("/signin");
        }
      } catch (error) {

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
            <p className="text-[20px] text-gray-600">Welcome to SE JOBS</p>
            <h3 className="text-3xl font-medium text-gray-900">Sign up</h3>
          </div>
          <div className="text-right">
            <p className="text-base text-gray-500">Already have an account?</p>
            <Link to="/signin" className="text-base text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col items-center">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstname" className="block text-base font-medium text-gray-900">
                First Name
              </label>
              <Input
                id="firstname"
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {firstnameError && (
                <p className="text-xs text-red-500 mt-1">{firstnameError}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastname" className="block text-base font-medium text-gray-900">
                Last Name
              </label>
              <Input
                id="lastname"
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {lastnameError && (
                <p className="text-xs text-red-500 mt-1">{lastnameError}</p>
              )}
            </div>
          </div>
          <div className="w-full space-y-2">
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

          <div className="w-full space-y-2">
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
            {passwordError && (
              <p className="text-xs text-red-500 mt-1">{passwordError}</p>
            )}
          </div>

          <div className="w-full space-y-2">
            <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-900">
              Confirm your Password
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                errorText=""
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-12 text-base font-semibold"
          >
            Sign up
          </Button>
        </form>
      </motion.div>
    </div>
  );
};