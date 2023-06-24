import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const email_verify_confirm = () => {
  const router = useRouter(); 
    const {resetPassword} = router?.query;
    console.log(resetPassword)
  return (
    <div className="container mx-auto px-4 mt-48 h-full">
    <div className="flex content-center items-center justify-center h-full">
      <div className="w-full lg:w-4/12 ">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center">
              <h6 className="text-blueGray-700 text-md font-bold">
              Email has been verified.
              </h6>
            </div>
            <div className="text-center text-blueGray-700 text-sm mt-3 font-bold">
              <Link href='/auth/login' >
              Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default email_verify_confirm