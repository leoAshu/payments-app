import { ChangeEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value

    setFormData({ ...formData, [name]: value })
  }

  const signUp = async () => {
    console.log(formData)
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-white min-w-96 px-5 py-6 flex flex-col shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-3">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <h3 className="max-w-64 text-center mt-2 font-semibold text-gray-500">
            Enter your information to create an account
          </h3>
        </div>

        <div className="mt-3 flex flex-col">
          <label className="mb-2 text-sm font-semibold">First name</label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 outline-none focus:border-black text-sm rounded-md px-3 py-2"
            placeholder="John"
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label className="mb-2 text-sm font-semibold">Last name</label>
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 outline-none focus:border-black text-sm rounded-md px-3 py-2"
            placeholder="Doe"
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label className="mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 outline-none focus:border-black text-sm rounded-md px-3 py-2"
            placeholder="johndoe@example.com"
            name="username"
            value={formData.username}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mt-4 flex flex-col">
          <label className="mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder:text-gray-500 outline-none focus:border-black text-sm rounded-md px-3 py-2"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mt-6 flex flex-col">
          <button onClick={signUp} className="bg-black text-white py-2 rounded-md font-semibold">
            Sign Up
          </button>
        </div>

        <div className="mt-4 text-center font-semibold">
          Already have an account?{' '}
          <Link className="underline" to="/signin">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
