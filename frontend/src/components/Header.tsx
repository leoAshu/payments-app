import { useRecoilState } from 'recoil'
import { userAtom } from '../store/atoms'

const Header = () => {
  const [user, setUser] = useRecoilState(userAtom)

  const logout = () => {
    localStorage.removeItem(import.meta.env.VITE_APP_LOCAL_STORAGE_KEY)

    setUser({
      userId: '',
      username: '',
      firstName: '',
      lastName: '',
      balance: 0,
    })
  }

  return (
    <header className="shadow-md py-2 px-4 select-none">
      <div className="md:max-w-4xl xl:max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">Payments App</div>

        <div className="flex items-center">
          <div className="mr-3 font-medium">Hello, {user.firstName}</div>
          <div
            onClick={logout}
            className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center font-medium select-none cursor-pointer"
          >
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
