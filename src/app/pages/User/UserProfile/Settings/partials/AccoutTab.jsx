import { motion } from "framer-motion";
import { Check, Info } from "lucide-react";
import { useState } from "react";

export default function AccountTab() {
    const [accountType, setAccountType] = useState("jobseeker");

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="mt-8 mb-12">
              <p className="body-large font-semibold text-gray-900 mb-2">Basic Information</p>
              <p className="text-gray-500">
                This is login information that you can update anytime.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                <div className="lg:col-span-4">
                  <p className="body-normal font-semibold text-gray-900 mb-2">Update Email</p>
                  <p className="text-gray-500">
                    Update your email address to make sure it is safe
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <div className="mb-4 flex items-center gap-2">
                    <span className="body-normal font-medium text-gray-700">jakegyll@gmail.com</span>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                      className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  </div>
                  <p className="text-gray-500 mb-4">
                    Your email address is verified.
                  </p>
                  <div className="mb-4">
                    <label className="block body-normal font-semibold text-gray-700 mb-2">
                      Update Email
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="email"
                      placeholder="Enter your new email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Update Email
                  </motion.button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  <div className="lg:col-span-4">
                    <p className="body-normal font-semibold text-gray-900 mb-2">New Password</p>
                    <p className="text-gray-500">
                      Manage your password to make sure it is safe
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <div className="mb-4">
                      <label className="block body-normal font-semibold text-gray-700 mb-2">
                        Old Password
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="password"
                        placeholder="Enter your old password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <p className="text-gray-400 mt-1">Minimum 8 characters</p>
                    </div>
                    <div className="mb-4">
                      <label className="block body-normal font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="password"
                        placeholder="Enter your new password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      />
                      <p className="text-gray-400 mt-1">Minimum 8 characters</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Change Password
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
                  <div className="lg:col-span-4">
                    <p className="body-normal font-semibold text-gray-900 mb-2">Account Type</p>
                    <p className="text-gray-500">
                      You can update your account type
                    </p>
                  </div>
                  <div className="lg:col-span-8">
                    <motion.div
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                      className="mb-4 p-4 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setAccountType("jobseeker")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              accountType === "jobseeker"
                                ? "border-indigo-600"
                                : "border-gray-300"
                            }`}
                          >
                            {accountType === "jobseeker" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-indigo-600"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="body-normal font-medium text-gray-900 mb-1">Job Seeker</div>
                          <div className="text-gray-500">Looking for a job</div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.02)" }}
                      className="mb-6 p-4 rounded-lg cursor-pointer transition-colors"
                      onClick={() => setAccountType("employer")}
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-0.5">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                              accountType === "employer"
                                ? "border-indigo-600"
                                : "border-gray-300"
                            }`}
                          >
                            {accountType === "employer" && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-3 h-3 rounded-full bg-indigo-600"
                              />
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="body-normal font-medium text-gray-900 mb-1">Employer</div>
                          <div className="text-gray-500">
                            Hiring, sourcing candidates, or posting a jobs
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      Save
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  Close Account
                  <Info className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
        </motion.div>
    );
}