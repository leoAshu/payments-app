import { atom } from 'recoil'

interface IUser {
  userId: string
  username: string
  firstName: string
  lastName: string
}

const userAtom = atom<IUser>({
  key: 'userAtom',
  default: {
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
  },
})

export default userAtom
