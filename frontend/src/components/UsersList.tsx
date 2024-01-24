import { useState } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { IUser } from '../store/atoms'
import { filteredUsersSelector } from '../store/selectors'
import { Modal } from '.'

interface UserCardProps {
  userId: string
  firstName: string
  lastName: string
}

const UserCard = ({ userId, firstName, lastName }: UserCardProps) => {
  const [isActive, setIsActive] = useState(false)

  return (
    <>
      <div className="mt-3 py-1.5 flex items-center justify-between">
        <div className="flex items-center">
          <div className="font-semibold bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center select-none">
            {firstName.charAt(0) + lastName.charAt(0)}
          </div>

          <div className="ml-4 text-lg font-semibold">
            {firstName} {lastName}
          </div>
        </div>

        <button
          onClick={() => setIsActive(true)}
          className="bg-black text-white px-3 py-2 text-sm font-semibold rounded-md"
        >
          Send Money
        </button>
      </div>

      <Modal
        isOpen={isActive}
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        closeModal={() => setIsActive(false)}
      />
    </>
  )
}

const UsersList = () => {
  const users = useRecoilValueLoadable(filteredUsersSelector)

  if (users.state === 'loading') {
    return <>Loading...</>
  }

  return (
    <>
      {users.contents.map((user: IUser) => (
        <UserCard key={user.userId} userId={user.userId} firstName={user.firstName} lastName={user.lastName} />
      ))}
    </>
  )
}

export default UsersList
