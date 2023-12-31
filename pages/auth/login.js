"use client"
import Link from 'next/link'
import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layout for page
import Auth from "layouts/Auth.js";
import { useRouter } from 'next/router';
import { useToasts } from 'react-toast-notifications';

export default function Login() {
  const router = useRouter();
  const { addToast } = useToasts();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Wrong email format")
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Pasword must be 8 or more characters")
      .matches(
        /(?=.*[a-z])(?=.*[A-Z])\w+/,
        "Password ahould contain at least one uppercase and lowercase character"
      )
      .matches(/\d/, "Password should contain at least one number")
      .matches(
        /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        "Password should contain at least one special character"
      )
      .required("Password is required"),
    
    // acceptTerms: Yup.string()
    //   .oneOf([true], "You must accept the terms and conditions")
    //   .required("You must accept the terms and conditions"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },  
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handelSignIn = (data) => {
    validationSchema
      .validate(data, { abortEarly: false })
      .then(async (formData) => {
        const response = await axios.post(
          "https://hr-management-1wt7.onrender.com/api/v1/login",
          formData
        );
        const userInfo = response.data.user;
        console.log(userInfo.status);
        if (response.status >= 200 && response.status < 300) {
          router.push("/admin/dashboard");
          addToast("Successfully login", { appearance: "success" });
          localStorage.setItem("user", JSON.stringify(userInfo));
        }
      })
      .catch((error) => {
        if (error.response) {
          const response = error.response;
          if (response.status === 500) {
            addToast("Email not found", { appearance: "error" });
          } else if (response.status === 401) {
            addToast("Email is not verified", { appearance: "error" });
          } else if (response.status >= 400 && response.status <= 500) {
            const errorMessage = response.data.message;
            console.log(errorMessage);
            addToast(errorMessage, { appearance: "error" });
          } else {
            addToast("Internal server error", { appearance: "error" });
          }
        } else if (error.request) {
          console.log(error.request);
          addToast("No response from server", { appearance: "error" });
        } else {
          console.log("Error", error.message);
          addToast("An error occurred", { appearance: "error" });
        }
        console.log(error.config);
      });
  };
  
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-700 text-sm font-bold">
                  Sign in With Credentials
                  </h6>
                </div>
                
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                
                <form onSubmit={handleSubmit(handelSignIn)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                    {...register("email")}
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                      {errors.email && (
                <p className="text-blue-700 text-xs mt-2">
                  {errors.email?.message}
                </p>
              )}
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                    {...register("password")}
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                    {errors.password && (
                <p className="text-blue-700 text-xs mt-2">
                  {errors.password?.message}
                </p>
              )}
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      value="Submit"
                      type="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <Link
                  href="/auth/forgetPassword"
                >
                  <small className="text-blueGray-200">Forgot password?</small>
                </Link>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register">
                    <small className="text-blueGray-200">Create new account</small>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;
