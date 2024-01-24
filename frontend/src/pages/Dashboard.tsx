import { useRecoilValueLoadable } from 'recoil'
import { Header, Search, UsersList } from '../components'
import { isAuthSelector } from '../store/selectors'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Dashboard = () => {
  const navigate = useNavigate()
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector)

  useEffect(() => {
    if (!isAuthenticated.contents) {
      navigate('/signin')
    }
  }, [isAuthenticated])

  return (
    <div className="h-screen">
      <Header />

      <main className="px-4">
        <div className="md:max-w-4xl xl:max-w-7xl mx-auto">
          <div className="mt-12 text-2xl flex items-center">
            <div className="font-bold">Balance</div>
            <div className="font-semibold ml-4">$5000</div>
          </div>

          <div className="mt-12">
            <div className="text-2xl font-bold">Users</div>

            <div className="mt-6">
              <Search />
            </div>

            <div className="mt-6">
              <UsersList />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard