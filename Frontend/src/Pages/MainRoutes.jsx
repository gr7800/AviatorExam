import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from '../Pages/HomePage'
import Result from '../Pages/Result'
import LoginPage from '../Pages/Login'
import Signup from '../Pages/Signup'
import Admin from '../Pages/Admin'
import PrivateRoute from './PrivateRoute'
import Aptitudetest from '../Pages/Aptitudetest'
import GenralTest from './StartTest'
import StartExam from '../Pages/SpecialTest'
import AdminQuestions from '../Pages/AdminQuestions'
import GenralTestRoute from './GenralTestRoute'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/aptitude' element={<Aptitudetest />} />
      <Route path='/genraltest' element={<GenralTestRoute />} />
      <Route path='/startexam' element={<StartExam />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/adminQuestions" element={<AdminQuestions />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default MainRoutes