"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';

const forgetPassword = () => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email("Wrong email format")
          .min(3, "Minimum 3 symbols")
          .max(50, "Maximum 50 symbols")
          .required("Email is required")
      });
      const {
        register,
        handleSubmit,
        formState: { errors },  
      } = useForm({
        resolver: yupResolver(validationSchema),
      });
    
      const handelForgetPass = (data) => {
        validationSchema
          .validate(data, { abortEarly: false })
          .then(async(formData) => {
            // const data = await axios.post(
            //   "agent_eighth_step/",
            // formData
            // );
            console.log(data)
            if (data.status >= 200 && data.status < 300) {
              navigate("/dashboard");
            }
          })
          .catch((validationErrors) => {
            const errorMessages = validationErrors.inner.reduce(
              (messages, error) => {
                return {
                  ...messages,
                  [error.path]: error.message,
                };
              },
              {}
            );
            console.log(errorMessages);
          });
      };
  return (
    <div className="container mx-auto px-4 mt-48 h-full">
    <div className="flex content-center items-center justify-center h-full">
      <div className="w-full lg:w-4/12 px-4">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blueGray-700 text-sm font-bold">
              Your Email
              </h6>
            </div>
            <hr className="mt-6 border-b-1 border-blueGray-300" />
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            
            <form onSubmit={handleSubmit(handelForgetPass)}>
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
      </div>
    </div>
  </div>
  )
}

export default forgetPassword