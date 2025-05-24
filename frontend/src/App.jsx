import './App.css'
import Buzz from './components/Buzz'
import JoinRoom from './components/JoinRoom'
import AdminBuzz from './components/AdminBuzz'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Navbar from './components/Nav'
import { useSelector } from 'react-redux'
import AuthRoute from './components/AuthRoute'
import Manage from './components/Manage'
import Create from './components/Create'
function App() {
  const user=useSelector(state=>state.auth.user);
  return (
    <>
      <BrowserRouter>
      {user?<Navbar/>:null}
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/join-room' element={<JoinRoom/>} />
          <Route path='/buzzer/:roomId' element={<Buzz/>} />
          <Route path='/buzzer/admin/:roomId' element={<AdminBuzz/>} />
          <Route 
          path="/manage-buzz" 
          element={
            <AuthRoute>
              <Manage/>
            </AuthRoute>
          } 
        />
          <Route 
          path="/create-buzz" 
          element={
            <AuthRoute>
              <Create/>
            </AuthRoute>
          } 
        />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
