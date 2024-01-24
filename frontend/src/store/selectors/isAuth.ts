import { selector } from 'recoil'

const isAuthSelector = selector<boolean>({
  key: 'isUserAuthSelector',
  get: () => {
    return false
  },
})

export default isAuthSelector
