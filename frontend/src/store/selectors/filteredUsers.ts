import axios from 'axios'
import { selector } from 'recoil'
import { IUser, userAtom, filterAtom } from '../atoms'

const filteredUsersSelector = selector<IUser[]>({
  key: 'filteredUsers',
  get: async ({ get }) => {
    const user = get(userAtom)
    const filter = get(filterAtom)
    const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY)

    if (!token) {
      return []
    }

    const getUsers = async () => {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const users: IUser[] = response.data.users.map((user: any) => ({
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      }))

      return users.filter((u) => u.userId !== user.userId)
    }

    return await getUsers()
  },
})

export default filteredUsersSelector
