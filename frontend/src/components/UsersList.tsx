import { useRecoilValueLoadable } from 'recoil'
import { IUser } from '../store/atoms'
import { filteredUsersSelector } from '../store/selectors'

const UsersList = () => {
  const users = useRecoilValueLoadable(filteredUsersSelector)

  if (users.state === 'loading') {
    return <>Loading...</>
  }

  return (
    <>
      {users.contents.map((user: IUser) => (
        <div key={user.userId} className="mt-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-semibold bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center select-none">
              {user.firstName.charAt(0) + user.lastName.charAt(0)}
            </div>

            <div className="ml-4 text-lg font-semibold">
              {user.firstName} {user.lastName}
            </div>
          </div>

          <button className="bg-black text-white px-3 py-2 text-sm font-semibold rounded">Send Money</button>
        </div>
      ))}
    </>
  )
}

export default UsersList
