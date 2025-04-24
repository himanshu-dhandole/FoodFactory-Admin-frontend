import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AddFoods from './pages/AddFoods/AddFoods' ;
import DisplayFoods from './pages/DisplayFoods/DisplayFoods' ;
import Orders from './pages/Orders/Orders' ;
import SideBar from './components/SideBar/SideBar'
import MenuBar from './components/MenuBar/MenuBar'
const App = () => {

  const [sideBarVisible, setSideBarVisible] = useState(true) ;
  const toggleSidebar = () => {
    setSideBarVisible(!sideBarVisible) ;
  }

  return (
    <div className="d-flex" id="wrapper">

    <SideBar sideBarVisible={sideBarVisible}/>

    <div id="page-content-wrapper">

    < MenuBar toggleSidebar={toggleSidebar} />

        <div className="container-fluid">
            <Routes>
                <Route path='/add' element={<AddFoods/>} />
                <Route path='/list' element={<DisplayFoods/>} />
                <Route path='/orders' element={<Orders/>} />
            </Routes>
        </div>
    </div>
</div>
  )
}

export default App
