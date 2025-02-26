import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Welcome from './pages/Welcome'
import Chatarea from './pages/Chatarea'
import Maincontainer from './pages/Maincontainer'
import Adduser from './pages/Adduser'
import Creategroup from './pages/Creategroup'


const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="/app" element={<Maincontainer/>}>
          <Route path="welcome" element={<Welcome/>}/>
          <Route path="chat/:id" element={<Chatarea/>}/>
          {/* <Route path="users" element={<Online/>}/> */}
          <Route path="addusers" element={<Adduser/>}/>
          <Route path="create-groups" element={<Creategroup/>}/>
        </Route>
       <Route path="/chat/:id" element={<Chatarea/>}/> 
       <Route path='/addusers' element={<Adduser/>}/>
       <Route path='/create-groups' element={<Creategroup/>}/>
      </Routes>
  )
}

export default App