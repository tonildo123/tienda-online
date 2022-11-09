import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Show from '../components/Show';
import Edit from '../components/Edit';
import Create from '../components/Create';
import Login from '../loginandregistrescreen/Login';
import Register from '../loginandregistrescreen/Register';

const Routs = () => {
  return (
    <div className=''>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Show/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
      <Route path='/create' element={<Create/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter></div>
  )
}

export default Routs