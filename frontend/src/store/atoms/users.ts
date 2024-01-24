import axios from 'axios'
import { atomFamily, selectorFamily } from 'recoil'
import userAtom, { IUser } from './user'

const userAtomFamily = atomFamily<IUser[], string>({
  key: 'userAtomFamily',
  default: selectorFamily({
    key: 'userAtomFamilySelector',
    get:
      (filter: string) =>
      async ({ get }) => {
        const user = get(userAtom)
        const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY)

        if (!token) {
          return []
        }

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
      },
  }),
})

export default userAtomFamily
