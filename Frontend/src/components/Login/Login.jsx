import React from 'react';

function Login() {
  return (
    <div className='flex justify-center items-center mt-10 font-[lato]'>
      <div className='mb-4'>
        <h1 className='mb-10 font-bold text-[28px] text-center'>Log in</h1>

        <div>
          <input
            type="email"
            placeholder='Email'
            className='border border-gray-300 rounded-md p-2 w-full mb-4'
          />
        </div>
        <div>
          <input
            type="password"
            placeholder='Password'
            className='border border-gray-300 rounded-md p-2 w-full mb-4'
          />
        </div>
        <div>
          <button
            type='submit'
            className='bg-blue-500 text-white rounded-md px-4 py-2 w-full'
          >
            Log In
          </button>
        </div>

        <p className='mt-4 text-sm text-gray-600'>FORGOT PASSWORD</p>
        <p className='mt-2 text-sm text-gray-600'>
          NOT A MEMBER? <span className='text-blue-500 cursor-pointer'>REGISTER</span>
        </p>
      </div>
    </div>
  );
}

export default Login;