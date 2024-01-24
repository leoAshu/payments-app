import { atom, selector } from 'recoil'
import axios from 'axios'

const balanceAtom = atom<Number>({
  key: 'balanceAtom',
  default: selector({
    key: 'getBalance',
    get: async () => {
      const token = localStorage.getItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY)

      if (!token) {
        return 0
      }

      const response = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/account/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data.balance
    },
  }),
})

export default balanceAtom
