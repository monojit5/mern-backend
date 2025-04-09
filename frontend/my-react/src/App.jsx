

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Book from './pages/Book'
import Bookitem from './pages/Bookitem'
import Bookcreate from './pages/Bookcreate'
import Bookedit from './pages/Bookedit';
import User_register from './pages/User_register'
import User_login from './pages/user_login'


function App() {

  return (
    <>
    <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<User_register/>}/>
    <Route path='/login' element={<User_login/>}/>
    <Route path='/book' element={<Book/>}/>
    <Route path='/book/update/:id' element={<Bookedit/>}/>
    <Route path='/bookcreate' element={<Bookcreate/>}/>
    <Route path='/book/:id' element={<Bookitem/>}/>
   </Routes>
   <Footer/>
    </>
  )
}

export default App
