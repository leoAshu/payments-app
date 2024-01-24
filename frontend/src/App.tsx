import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard, Signin, Signup } from './pages'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
