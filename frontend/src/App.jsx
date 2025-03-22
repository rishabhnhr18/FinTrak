import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ErrorBoundary from './ErrorBoundary'
import ProtectedRoutes from './ProtectedRoutes'
import ChatbotButton from './components/ChatbotButton'
import Admin from './pages/Admin/Admin'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import Request from './pages/Request/Request'
import Transactions from './pages/Transactions/Transactions'
import Chatbot from './pages/chatbot/Chatbot'

function App() {
  return (
    <div className='app'>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path='/' />
            <Route index element={<Login />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            
            {/* Chatbot route as public route - not inside ProtectedRoutes */}
            <Route path='chatbot' element={<Chatbot />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='home' element={<Home />} />
            </Route>
            <Route path='users' element={<ProtectedRoutes />}>
              <Route index element={<Admin />} />
            </Route>
            <Route path='transactions' element={<ProtectedRoutes />}>
              <Route index element={<Transactions />} />
            </Route>
            <Route path='requests' element={<ProtectedRoutes />}>
              <Route index element={<Request />} />
            </Route>
            <Route path='profile' element={<ProtectedRoutes />}>
              <Route index element={<Profile />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
          <ChatbotButton />
        </ErrorBoundary>
      </Router>
      <ToastContainer />
    </div>
  )
}

export default App