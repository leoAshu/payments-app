import { atom } from 'recoil'

const filterAtom = atom<string>({
  key: 'filterAtom',
  default: '',
})

export default filterAtom
