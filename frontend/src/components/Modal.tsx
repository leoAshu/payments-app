import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useSetRecoilState } from 'recoil'
import { balanceAtom } from '../store/atoms'

interface ModalProps {
  isOpen: boolean
  userId: string
  firstName: string
  lastName: string
  closeModal: () => void
}

const Modal = ({ isOpen, closeModal, userId, firstName, lastName }: ModalProps) => {
  const [error, setError] = useState('')
  const [amount, setAmount] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setBalance = useSetRecoilState(balanceAtom)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setSuccess('')
    setAmount(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY)

      if (!token) {
        return
      }

      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/account/transfer`,
        {
          to: userId,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setBalance((prevBalance) => Number(prevBalance) - Number(amount))
      setSuccess(response.data.message)
      setAmount('')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  })

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-[#f5f5f5]" onClick={closeModal}>
          <div
            className="bg-white w-96 p-8 rounded-md shadow-lg flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-2xl font-semibold">Send Money</div>

            {Boolean(success) && (
              <div className="bg-gray-50 w-full mt-4 text-sm pl-2 py-2 border-l-8 border-green-500 flex items-center">
                {success}
              </div>
            )}

            {Boolean(error) && (
              <div className="bg-gray-50 w-full mt-4 text-sm pl-2 py-2 border-l-8 border-red-500 flex items-center">
                {error}
              </div>
            )}

            <div className="mt-10 flex w-full justify-start items-center">
              <div className="w-10 h-10 rounded-full bg-green-500 text-white font-semibold flex justify-center items-center">
                {firstName.charAt(0).toUpperCase()}
                {lastName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4 text-lg font-semibold">
                {firstName} {lastName}
              </div>
            </div>

            <form className="mt-6 flex flex-col w-full" onSubmit={handleSubmit}>
              <label className="mb-2 text-xs font-semibold">Amount (in USD)</label>
              <input
                type="number"
                className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 outline-none focus:border-black text-sm rounded-md px-3 py-2"
                placeholder="Enter amount"
                name="amount"
                value={amount}
                onChange={onChangeHandler}
                required
              />

              <input
                type="submit"
                className="mt-6 bg-green-500 text-white py-2 rounded-md text-sm font-medium disabled:bg-opacity-75"
                disabled={isLoading}
                value={isLoading ? 'Please wait...' : 'Initiate Transfer'}
              />
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
