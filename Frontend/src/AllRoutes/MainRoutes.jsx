import React from 'react'
import { Routes, Route } from "react-router-dom"
import HomePage from '../Pages/HomePage'
import Result from '../Pages/Result'
import LoginPage from '../Pages/Login'
import Signup from '../Pages/Signup'
import Admin from '../Pages/Admin'
import Aptitudetest from '../Pages/Aptitudetest'
import AdminQuestions from '../Pages/AdminQuestions'
import ChooseTest from '../Pages/ChooseTest'
import PracticeTest from '../Components/PracticeTest'
import SpecialTest from '../Pages/SpecialTest'
import ExamPrepearation from '../Components/ExamPrepearation'
import PaymentCard from '../Pages/PaymentCard'
import PaymentStatusPage from '../Pages/PaymentStatus'
import SpecialRoute from './SpecialRoute'
import PrivateRoute from './PrivateRoute'
import DemoPreparation from '../Components/DemoPreparation'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/aptitude' element={<Aptitudetest />} />
      <Route path='/exam' element={<ChooseTest />} />
      <Route path='/exam/practice' element={<PracticeTest />} />
      <Route path='/exam/special' element={<SpecialTest />} />
      <Route path='/exam/demo/prepaire' element={<DemoPreparation />} />
      <Route path='/exam/prepaire' element={<ExamPrepearation />} />
      <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      <Route path="/adminQuestions" element={<PrivateRoute><AdminQuestions /></PrivateRoute>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/result" element={<Result />} />
      <Route path="/payment" element={<PaymentCard />} />
      <Route path="/paymentstatus" element={<PaymentStatusPage />} />
    </Routes>
  )
}

export default MainRoutes