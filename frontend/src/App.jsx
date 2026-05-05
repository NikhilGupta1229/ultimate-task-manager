import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import ProtectedRoute from './pages/ProtectedRoute'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>

        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects/>
          </ProtectedRoute>
        }/>

        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}