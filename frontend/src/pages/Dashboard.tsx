import { Header, Search, UsersList } from '../components'

const Dashboard = () => {
  return (
    <div className="h-screen">
      <Header />

      <main className="md:max-w-4xl xl:max-w-7xl mx-auto">
        <div className="mt-12 text-xl flex items-center">
          <div className="font-bold">Balance</div>
          <div className="font-semibold ml-4">$5000</div>
        </div>

        <div className="mt-12">
          <div className="text-xl font-bold">Users</div>

          <div className="mt-6">
            <Search />
          </div>

          <div className="mt-4">
            <UsersList />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
