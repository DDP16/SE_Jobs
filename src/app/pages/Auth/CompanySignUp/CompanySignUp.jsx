import { useState } from "react";
import { delay, motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { uiInput as Input, uiButton as Button, CustomAlert, LangButtonGroup } from "../../../components";
import { srcAsset } from "../../../lib";
import { register, validateEmail, validatePassword } from "../../../modules";
import { useCustomAlert } from "../../../hooks/useCustomAlert";
import {
  FormControl,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Alert
} from "@mui/material";
import {
  Mail as MailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  LocationOn as LocationOnIcon,
  Error as ErrorIcon
} from "@mui/icons-material";

export default function CompanySignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [province, setProvince] = useState("");
  const [ward, setWard] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [provinceError, setProvinceError] = useState("");
  let nav = useNavigate();
  const { alertConfig, hideAlert, showSuccess, showError, showWarning } = useCustomAlert();

  // Vietnamese provinces/cities
  const provinces = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cao Bằng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Tĩnh",
    "Hải Dương",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setFullNameError("");
    setPhoneError("");
    setGenderError("");
    setCompanyNameError("");
    setProvinceError("");

    if (!email) {
      setEmailError("Email đăng nhập không được để trống");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ");
      valid = false;
    }

    if (!password) {
      setPasswordError("Mật khẩu không được để trống");
      valid = false;
    } else if (!validatePassword(password)) {
      setPasswordError("Mật khẩu phải có từ 6 đến 25 ký tự");
      valid = false;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Nhập lại mật khẩu không được để trống");
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu không khớp");
      valid = false;
    }

    if (!fullName) {
      setFullNameError("Họ và tên không được để trống");
      valid = false;
    }

    if (!phone) {
      setPhoneError("Số điện thoại cá nhân không được để trống");
      valid = false;
    } else if (!/^[0-9]{10,11}$/.test(phone)) {
      setPhoneError("Số điện thoại không hợp lệ");
      valid = false;
    }

    if (!gender) {
      setGenderError("Vui lòng chọn giới tính");
      valid = false;
    }

    if (!companyName) {
      setCompanyNameError("Tên công ty không được để trống");
      valid = false;
    }

    if (!province) {
      setProvinceError("Tỉnh/thành phố không được để trống");
      valid = false;
    }

    if (!agreeTerms) {
      showWarning("Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật");
      valid = false;
    }

    if (valid) {
      try {
        // Split fullName into firstname and lastname
        const nameParts = fullName.trim().split(" ");
        const firstname = nameParts[0] || "";
        const lastname = nameParts.slice(1).join(" ") || "";

        const result = await register(email, password, firstname, lastname);
        if (result && result.status === 200) {
          showSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
          delay(() => { nav("/signin"); }, 1000);
        }
      } catch (error) {
        showError(error.message || "Đăng ký thất bại");
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-r from-anti-flash-white from-30% to-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-9 px-12 justify-between flex flex-row min-w-screen"
      >
        <img src={srcAsset.SELargeLogo} alt="KHOA CÔNG NGHỆ PHẦN MỀM" className="h-12 w-auto cursor-pointer" onClick={() => { nav("/"); }} />

        <LangButtonGroup />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full lg:max-w-3xl md:max-w-2xl max-w-full overflow-y-auto max-h-[90vh] custom-scrollbar"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9',
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl md:text-3xl font-medium text-gray-900">Đăng ký tài khoản</h3>
          </div>
          <div className="text-right">
            <p className="text-sm md:text-base text-gray-500">Đã có tài khoản?</p>
            <Link to="/signin" className="text-sm md:text-base text-green-600 hover:underline font-medium">
              Đăng nhập ngay
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section: Hoặc bằng email */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Hoặc bằng email</h4>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email đăng nhập <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 ${emailError ? 'border-red-500' : ''}`}
                />
                {emailError && (
                  <div className="flex items-center gap-1 mt-1">
                    <ErrorIcon className="text-red-500" style={{ fontSize: '16px' }} />
                    <p className="text-xs text-red-500">{emailError}</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Trường hợp bạn đăng ký tài khoản bằng email không phải email tên miền công ty, một số dịch vụ trên tài khoản có thể sẽ bị giới hạn quyền mua hoặc sử dụng.
              </p>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Mật khẩu (từ 6 đến 25 ký tự) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 pr-12 ${passwordError ? 'border-red-500' : ''}`}
                />
                {passwordError && (
                  <ErrorIcon className="absolute right-12 top-1/2 -translate-y-1/2 text-red-500 z-10" style={{ fontSize: '16px' }} />
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordError && (
                <p className="text-xs text-red-500 mt-1">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
                Nhập lại mật khẩu <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 pr-12 ${confirmPasswordError ? 'border-red-500' : ''}`}
                />
                {confirmPasswordError && (
                  <ErrorIcon className="absolute right-12 top-1/2 -translate-y-1/2 text-red-500 z-10" style={{ fontSize: '16px' }} />
                )}
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-xs text-red-500 mt-1">{confirmPasswordError}</p>
              )}
            </div>
          </div>

          {/* Section: Thông tin nhà tuyển dụng */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin nhà tuyển dụng</h4>

            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Họ và tên"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 ${fullNameError ? 'border-red-500' : ''}`}
                />
                {fullNameError && (
                  <ErrorIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 z-10" style={{ fontSize: '16px' }} />
                )}
              </div>
              {fullNameError && (
                <p className="text-xs text-red-500 mt-1">{fullNameError}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Số điện thoại cá nhân <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="phone"
                  type="text"
                  placeholder="Số điện thoại cá nhân"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 ${phoneError ? 'border-red-500' : ''}`}
                />
                {phoneError && (
                  <ErrorIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 z-10" style={{ fontSize: '16px' }} />
                )}
              </div>
              {phoneError && (
                <p className="text-xs text-red-500 mt-1">{phoneError}</p>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                Giới tính: <span className="text-red-500">*</span>
              </label>
              <FormControl error={!!genderError}>
                <RadioGroup
                  row
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="gap-4"
                >
                  <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                  <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                </RadioGroup>
              </FormControl>
              {genderError && (
                <p className="text-xs text-red-500 mt-1">{genderError}</p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-900">
                Tên công ty <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Tên công ty"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 ${companyNameError ? 'border-red-500' : ''}`}
                />
                {companyNameError && (
                  <ErrorIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 z-10" style={{ fontSize: '16px' }} />
                )}
              </div>
              {companyNameError && (
                <p className="text-xs text-red-500 mt-1">{companyNameError}</p>
              )}
            </div>

             {/* Company URL */}
             <div className="space-y-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-900">
                Đường dẫn website <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <BusinessIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" style={{ fontSize: '20px' }} />
                <Input
                  id="companyName"
                  type="text"
                  placeholder="Dường dẫn website"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`w-full h-12 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500 pl-10 ${companyNameError ? 'border-red-500' : ''}`}
                />
                {companyNameError && (
                  <ErrorIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 z-10" style={{ fontSize: '16px' }} />
                )}
              </div>
              {companyNameError && (
                <p className="text-xs text-red-500 mt-1">{companyNameError}</p>
              )}
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="province" className="block text-sm font-medium text-gray-900">
                  Chọn tỉnh/thành phố <span className="text-red-500">*</span>
                </label>
                <FormControl fullWidth error={!!provinceError}>
                  <Select
                    id="province"
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      setWard(""); // Reset ward when province changes
                    }}
                    displayEmpty
                    sx={{
                      height: "48px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: provinceError ? "#ef4444" : "#d1d5db",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Chọn tỉnh/thành phố
                    </MenuItem>
                    {provinces.map((prov) => (
                      <MenuItem key={prov} value={prov}>
                        {prov}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {provinceError && (
                  <p className="text-xs text-red-500 mt-1">{provinceError}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="ward" className="block text-sm font-medium text-gray-900">
                  Chọn phường/xã
                </label>
                <FormControl fullWidth disabled={!province}>
                  <Select
                    id="ward"
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    displayEmpty
                    sx={{
                      height: "48px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#d1d5db",
                      },
                    }}
                  >
                    <MenuItem value="" disabled>
                      Chọn phường/xã
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          {/* Terms and Privacy */}
          <div className="pt-4">
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  sx={{
                    color: '#0041D9',
                    '&.Mui-checked': {
                      color: '#0041D9',
                    },
                  }}
                />
              }
              label={
                <span className="text-sm text-gray-700">
                  Tôi đã đọc và đồng ý với{' '}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    Điều khoản dịch vụ
                  </Link>
                  {' '}và{' '}
                  <Link to="/privacy" className="text-blue-600 hover:underline">
                    Chính sách bảo mật
                  </Link>
                  {' '}của SE JOBS.
                </span>
              }
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!agreeTerms}
            className={`w-full rounded-lg h-12 text-base font-semibold ${agreeTerms
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            Hoàn tất
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