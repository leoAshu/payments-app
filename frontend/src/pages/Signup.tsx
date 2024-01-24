import axios from 'axios'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValueLoadable, useSetRecoilState } from 'recoil'
import { balanceAtom, userAtom } from '../store/atoms'
import { isAuthSelector } from '../store/selectors'

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })
  const setUser = useSetRecoilState(userAtom)
  const setBalance = useSetRecoilState(balanceAtom)
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector)

  useEffect(() => {
    if (isAuthenticated.contents) {
      navigate('/')
    }
  }, [isAuthenticated])

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')

    const name = e.target.name
    const value = e.target.value

    setFormData({ ...formData, [name]: value })
  }

  const signUp = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const signUpResponse = await axios.post(`${import.meta.env.VITE_APP_API_BASE_URL}/user/signup`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const token = await signUpResponse.data.token

      const getAccountBalanceResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUser({
        userId: signUpResponse.data.userId,
        username: signUpResponse.data.username,
        firstName: signUpResponse.data.firstName,
        lastName: signUpResponse.data.lastName,
      })

      setBalance(getAccountBalanceResponse.data.balance)

      localStorage.setItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY, token)

      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    }
  }

  return (
    <div className="bg-[#f5f5f5] h-screen flex flex-col justify-center items-center">
      {isAuthenticated.state === 'loading' ? (
        <div className="h-full flex items-center justify-center">Loading...</div>
      ) : (
        <div className="bg-white min-w-96 px-5 py-6 flex flex-col shadow-lg rounded-md">
          <div className="flex flex-col items-center mb-3">
            <h1 className="text-3xl font-bold">Sign Up</h1>
            <h3 className="max-w-64 text-center mt-2 font-semibold text-gray-500">
              Enter your information to create an account
            </h3>
          </div>

          {Boolean(error) && (
            <div className="bg-gray-50 text-sm pl-2 py-2 border-l-8 border-red-500 flex items-center">{error}</div>
          )}

          <form onSubmit={signUp}>
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
              <input type="submit" className="bg-black text-white py-2 rounded-md font-semibold" value="Sign Up" />
            </div>
          </form>

          <div className="mt-4 text-center font-semibold">
            Already have an account?{' '}
            <Link className="underline" to="/signin">
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Signup
