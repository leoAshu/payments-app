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

      const token = localStorage.getItem('payments-app-token')

      if (!token) {
        return user
      }

      const response = await axios.get('localhost:3000/api/v1/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      user.userId = response.data.user.userId
      user.username = response.data.user.username
      user.firstName = response.data.user.firstName
      user.lastName = response.data.user.lastName

      return user
    },
  }),
})

export default userAtom
