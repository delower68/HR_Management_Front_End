"use client"
import Link from 'next/link'
import React from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import axios from 'axios';
import { useRouter } from 'next/router';


const resetPassword = () => {
    const router = useRouter(); 
    const {resetPassword} = router?.query;
    console.log(resetPassword)

    const validationSchema = Yup.object().shape({
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
        confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handelResetPassword = (data) => {
        validationSchema
          .validate(data, { abortEarly: false })
          .then(async (formData) => {
            const resetFormData = {
              password: formData.password,
              token: resetPassword,
            };
            const response = await axios.post(
              `https://hr-management-1wt7.onrender.com/api/v1/reset_password/${resetPassword}`,
              resetFormData
            );
            console.log(response.data);
            if (response.status >= 200 && response.status < 300) {
              router.push("/auth/login");
            }
          })
          .catch((validationErrors) => {
            if (validationErrors.inner && validationErrors.inner.length > 0) {
              const errorMessages = validationErrors.inner?.reduce(
                (messages, error) => ({
                  ...messages,
                  [error.path]: error.message,
                }),
                {}
              );
              console.log(errorMessages);
            } else {
              console.log(validationErrors.message);
            }
          });
      };
      
    
    return (
        <div className='flex justify-center items-center mt-48 md:4'>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-700 text-sm font-bold">
                                        Reset Your Password
                                    </h6>
                                </div>

                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

                                <form onSubmit={handleSubmit(handelResetPassword)}>
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
                                            <p className="text-blueGray-700 text-xs mt-2">
                                                {errors.password?.message}
                                            </p>
                                        )}
                                    </div>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                           Confirm Password
                                        </label>
                                        <input
                                            {...register("confirmPassword")}
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Confirm password"
                                        />
                                        {errors.confirmPassword && (
                                            <p className="text-blueGray-700 text-xs mt-2">
                                                {errors.confirmPassword?.message}
                                            </p>
                                        )}
                                    </div>
                                        <div className="text-center mt-6">
                                        <button
                                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            value="Submit"
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                            <div className="w-1/2">
                                <a
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-blueGray-200"
                                >
                                    <small>Forgot password?</small>
                                </a>
                            </div>
                            <div className="w-1/2 text-right">
                                <Link href="/auth/register">
                                    <a href="#pablo" className="text-blueGray-200">
                                        <small>Create new account</small>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default resetPassword