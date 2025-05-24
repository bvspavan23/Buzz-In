import React from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import * as Yup from "yup";
import { loginAPI } from "../services/users/userService";
import AlertMessage from "./AlertMessage";
import { loginAction } from "../redux/slice/authSlice";
import { Link } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const mutation = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutation
        .mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 p-8 bg-gray-800 bg-opacity-70 rounded-xl backdrop-blur-sm border border-gray-700 shadow-xl">
        <div className="text-center">
          <h2 
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Heyy! Got An Idea?
          </h2>
          <p 
            className="text-gray-300"
            style={{ fontFamily: "'Baloo 2', sans-serif" }}
          >
            Sign in to join the buzz
          </p>
        </div>

        {/* Alert messages */}
        {mutation.isPending && (
          <AlertMessage type="loading" message="Loading please wait..." />
        )}
        {mutation.isSuccess && (
          <AlertMessage type="success" message="Login Success" />
        )}
        {mutation.isError && (
          <AlertMessage
            type="error"
            message={mutation.error.response.data.message}
          />
        )}

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent block w-full pl-10 p-4"
                  placeholder="Email address"
                  style={{ fontFamily: "'Baloo 2', sans-serif" }}
                  {...formik.getFieldProps("email")}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="mt-1 text-sm text-rose-400" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-cyan-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="bg-gray-700 bg-opacity-50 border border-gray-600 text-white placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent block w-full pl-10 p-4"
                  placeholder="Password"
                  style={{ fontFamily: "'Baloo 2', sans-serif" }}
                  {...formik.getFieldProps("password")}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-sm text-rose-400" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                  {formik.errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Sign In
            </button>

            <div className="text-center">
              <p className="text-gray-400" style={{ fontFamily: "'Baloo 2', sans-serif" }}>
                Don't have an account?{' '}
                <Link 
                  to="/register" 
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;