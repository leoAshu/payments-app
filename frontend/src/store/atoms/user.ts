import axios from 'axios'
import { atom, selector } from 'recoil'

interface IUser {
  userId: string
  username: string
  firstName: string
  lastName: string
}

const userAtom = atom<IUser>({
  key: 'userAtom',
  default: selector<IUser>({
    key: 'userAtomSelector',
    get: async () => {
      const user = {
        userId: '',
        username: '',
        firstName: '',
        lastName: '',
      }

      const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY)

      if (!token) {
        return user
      }

      const getUserDetailsResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // const getAccountBalanceResponse = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/account/balance`, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // })

      user.userId = getUserDetailsResponse.data.userId
      user.username = getUserDetailsResponse.data.username
      user.firstName = getUserDetailsResponse.data.firstName
      user.lastName = getUserDetailsResponse.data.lastName

      return user
    },
  }),
})

export type { IUser }
export default userAtom
