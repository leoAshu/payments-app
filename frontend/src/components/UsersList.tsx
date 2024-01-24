const users = [
  {
    id: '1',
    firstName: 'User',
    lastName: '1',
  },
  {
    id: '2',
    firstName: 'User',
    lastName: '2',
  },
  {
    id: '3',
    firstName: 'User',
    lastName: '3',
  },
]

const UsersList = () => {
  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="mt-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center">
            <div className="font-semibold bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
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
