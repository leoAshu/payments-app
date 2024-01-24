import { useRecoilValueLoadable } from 'recoil'
import { userAtom } from '../store/atoms'

const Header = () => {
  const user = useRecoilValueLoadable(userAtom)

  return (
    <header className="shadow-md py-2 px-4">
      <div className="md:max-w-4xl xl:max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">Payments App</div>

        <div className="flex items-center">
          <div className="mr-3 font-medium">Hello, {user.contents.firstName}</div>
          <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center font-medium">
            {user.contents.firstName.charAt(0)}
            {user.contents.lastName.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
