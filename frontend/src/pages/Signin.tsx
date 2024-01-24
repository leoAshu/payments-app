import { Link } from 'react-router-dom'

const Signin = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-white min-w-96 px-5 py-6 flex flex-col shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-3">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <h3 className="max-w-64 text-center mt-2 font-semibold text-gray-500">
            Enter your credentials to access your account
          </h3>
        </div>

        <div className="mt-3 flex flex-col">
          <label className="mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 text-sm rounded-md px-3 py-2"
            placeholder="johndoe@example.com"
            required
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label className="mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 text-sm rounded-md px-3 py-2"
            required
          />
        </div>

        <div className="mt-6 flex flex-col">
          <button className="bg-black text-white py-2 rounded-md font-semibold">Sign Up</button>
        </div>

        <div className="mt-4 text-center font-semibold">
          Don't have an account?{' '}
          <Link className="underline" to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signin
