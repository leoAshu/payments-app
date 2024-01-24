import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../store/atoms'

const Signin = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const setUser = useSetRecoilState(userAtom)
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    const name = e.target.name
    const value = e.target.value

    setFormData({ ...formData, [name]: value })
  }

  const signIn = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const signUpResponse = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/user/signin`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const token = await signUpResponse.data.token

      const getUserDetailsResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const getAccountBalanceResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUser({
        userId: getUserDetailsResponse.data.userId,
        username: getUserDetailsResponse.data.username,
        firstName: getUserDetailsResponse.data.username,
        lastName: getUserDetailsResponse.data.username,
        balance: getAccountBalanceResponse.data.balance,
      })

      localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY, token)

      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)

        setError(err.response?.data.message)
      } else {
        console.log(err)
      }
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-white min-w-96 px-5 py-6 flex flex-col shadow-md rounded-lg">
        <div className="flex flex-col items-center mb-3">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <h3 className="max-w-64 text-center mt-2 font-semibold text-gray-500">
            Enter your credentials to access your account
          </h3>
        </div>

        {Boolean(error) && (
          <div className="bg-gray-50 text-sm pl-2 py-2 border-l-8 border-red-500 flex items-center">{error}</div>
        )}

        <form onSubmit={signIn}>
          <div className="mt-3 flex flex-col">
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
            <input type="submit" className="bg-black text-white py-2 rounded-md font-semibold" value="Sign In" />
          </div>
        </form>

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
