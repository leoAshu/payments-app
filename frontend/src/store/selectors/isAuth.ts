import { selector } from 'recoil'
import { userAtom } from '../atoms'

const isAuthSelector = selector<boolean>({
  key: 'isUserAuthSelector',
  get: ({ get }) => {
    const user = get(userAtom)
    return Boolean(user.userId)
  },
})

export default isAuthSelector
