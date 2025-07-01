import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Lock,
  LineChart,
  DollarSign,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";

interface FormData {
  email: string;
  password: string;
  tradingViewId?: string;
  tradingStyle?: string;
  capital?: string;  // keep string here for input, convert before sending
  experience?: string;
}

const API_BASE_URL = "http://localhost:5000";

const tradingStyles = [
  "Day Trading",
  "Swing Trading",
  "Position Trading",
  "Scalping",
  "Algorithmic Trading",
];

const experienceLevels = [
  "Beginner (0-1 year)",
  "Intermediate (1-3 years)",
  "Advanced (3-5 years)",
  "Expert (5+ years)",
];

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    tradingViewId: "",
    tradingStyle: "",
    capital: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Ghi log để debug thông tin chuyển hướng
  console.log('Login - location state:', location.state);
  
  // Đảm bảo luôn có đường dẫn chuyển hướng
  const from = location.state?.from?.pathname || "/dashboard";
  console.log('Login - Redirect target after login:', from);
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    if (isSignUp) {
      if (currentStep === 1) {
        if (!formData.email.trim() || !formData.password.trim()) {
          setError("Please enter email and password.");
          setIsLoading(false);
          return;
        }
        setCurrentStep(2);
        setIsLoading(false);
        return;
      }

      // Step 2 validation
      if (
        !formData.tradingViewId?.trim() ||
        !formData.tradingStyle ||
        !formData.capital?.trim() ||
        !formData.experience
      ) {
        setError("Please fill in all required trading details.");
        setIsLoading(false);
        return;
      }
         console.log("Submitting registration", formData);

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        // Optionally store token if backend sends one
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        navigate(from, { replace: true });
      } else {
        setError(data.message || "Registration failed. Try again.");
      }
    } else {
      if (!formData.email.trim() || !formData.password.trim()) {
        setError("Please enter email and password.");
        setIsLoading(false);
        return;
      }

        try {
          // Sử dụng AuthContext login thay vì gọi API trực tiếp
          const success = await login(formData.email, formData.password);
          
          if (success) {
            console.log("Đăng nhập thành công qua AuthContext");
            console.log("Đang chuyển hướng đến:", from);
            
            // Đảm bảo localStorage đã được cập nhật trước khi chuyển hướng
            // Tăng timeout để đảm bảo có đủ thời gian xử lý
            localStorage.setItem("lastLoginTime", Date.now().toString());
            
            // Force một rerender để đảm bảo state được cập nhật
            setTimeout(() => {
              console.log("Bắt đầu chuyển hướng sau timeout");
              // Sử dụng window.location để force reload thay vì navigate
              // Điều này đảm bảo ứng dụng được khởi động lại với trạng thái mới
              window.location.href = from;
            }, 500); // Tăng thời gian lên để đảm bảo localStorage đã được cập nhật
          } else {
            setError("Đăng nhập thất bại.");
          }
        } catch (error) {
          console.error("Login error:", error);
          setError("Đã xảy ra lỗi khi đăng nhập.");
        }
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Please try again.");
  } finally {
    setIsLoading(false);
  }
};



  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-[#0B1118]">
      <div className="max-w-md w-full mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/30 rounded-xl p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2 text-white">
              {isSignUp ? "Create Your Account" : "Welcome Back"}
            </h1>
            <p className="text-gray-400">
              {isSignUp
                ? "Start your trading journey with us"
                : "Sign in to access your trading dashboard"}
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 text-red-500 p-4 rounded-lg text-center mb-6 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {(isSignUp && currentStep === 1) || !isSignUp ? (
              <>

            

                <InputField
                  label="Email Address"
                  icon={<User />}
                  type="email"
                  value={formData.email}
                  onChange={(val) => setFormData((prev) => ({ ...prev, email: val }))}
                />
                <InputField
                  label="Password"
                  icon={<Lock />}
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(val) => setFormData((prev) => ({ ...prev, password: val }))}
                  togglePassword
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </>
            ) : null}

            {isSignUp && currentStep === 2 && (
              <>
                <InputField
                  label="TradingView ID"
                  icon={<LineChart />}
                  value={formData.tradingViewId || ""}
                  onChange={(val) => setFormData((prev) => ({ ...prev, tradingViewId: val }))}
                />
                <SelectField
                  label="Trading Style"
                  value={formData.tradingStyle || ""}
                  onChange={(val) => setFormData((prev) => ({ ...prev, tradingStyle: val }))}
                  options={tradingStyles}
                />
                <InputField
                  label="Trading Capital (INR)"
                  icon={<DollarSign />}
                  type="number"
                  value={formData.capital || ""}
                  onChange={(val) => setFormData((prev) => ({ ...prev, capital: val }))}
                />
                <SelectField
                  label="Experience Level"
                  value={formData.experience || ""}
                  onChange={(val) => setFormData((prev) => ({ ...prev, experience: val }))}
                  options={experienceLevels}
                />
              </>
            )}

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading
                ? "Processing..."
                : isSignUp
                ? currentStep === 1
                  ? "Next"
                  : "Register"
                : "Login"}
            </button>

            <p className="text-center text-sm text-gray-400 mt-4">
              {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
              <button
                type="button"
                className="text-blue-400 hover:underline"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setCurrentStep(1);
                  setError("");
                }}
              >
                {isSignUp ? "Login" : "Register"}
              </button>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  icon: React.ReactNode;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  togglePassword?: boolean;
  showPassword?: boolean;
  setShowPassword?: (val: boolean) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  type = "text",
  value,
  onChange,
  togglePassword = false,
  showPassword = false,
  setShowPassword = () => {},
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        className="block w-full rounded-lg bg-gray-900 border border-gray-700 text-white py-3 pl-10 pr-10 focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      {togglePassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  </div>
);

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full rounded-lg bg-gray-900 border border-gray-700 text-white py-3 px-4 focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default Login;
