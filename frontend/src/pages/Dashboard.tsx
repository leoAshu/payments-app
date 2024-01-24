import { useRecoilValueLoadable } from 'recoil'
import { Header, Search, UsersList } from '../components'
import { isAuthSelector } from '../store/selectors'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { balanceAtom } from '../store/atoms'

const Dashboard = () => {
  const navigate = useNavigate()
  const balance = useRecoilValueLoadable(balanceAtom)
  const isAuthenticated = useRecoilValueLoadable(isAuthSelector)

  useEffect(() => {
    if (!isAuthenticated.contents) {
      navigate('/signin')
    }
  }, [isAuthenticated])

  return (
    <>
      {isAuthenticated.state === 'loading' || balance.state === 'loading' ? (
        <div className="h-full flex items-center justify-center">Loading...</div>
      ) : (
        <>
          <Header />

          <main className="px-4">
            <div className="md:max-w-4xl xl:max-w-7xl mx-auto">
              <div className="mt-12 text-2xl flex items-center">
                <div className="font-bold select-none">Balance</div>
                <div className="font-semibold ml-4">${balance.contents}</div>
              </div>

              <div className="mt-12">
                <div className="text-2xl font-bold select-none">Users</div>

                <div className="mt-6">
                  <Search />
                </div>

                <div className="mt-6">
                  <UsersList />
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  )
}

export default Dashboard
