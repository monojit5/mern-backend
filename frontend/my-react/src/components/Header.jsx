import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Header = () => {
  const [auth, setAuth] = useAuth()
  const handelLogout = () => {
    setAuth({
      ...auth,
      user:null, token:''
    })
    localStorage.removeItem('auth')
  }
  return (
  <>
 
 <div className="navbar bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-sm" style={{position:'fixed', top:'0', zIndex:'70'}}>

  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  bg-base-200 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li className='font-bold text-primary'><Link to='/'>Home</Link></li>
      <li className='font-bold text-primary'><Link to='/book'>Book</Link></li>

      {!auth.user ?(<></>):(<>
        <li className='font-bold text-primary'><Link to='/bookcreate'>BookCreate</Link></li>
        <li className='font-bold text-primary'><Link onClick={handelLogout} to='/login'>Logout</Link></li>
      </>)}
      </ul>
    </div>
    <a className=" text-xl font-bold px-5">Book Store</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 bg-success-200">
      <li className='font-bold'><Link to='/'>Home</Link></li>
      <li className='font-bold'><Link to='/book'>Book</Link></li>
      {!auth.user ?(<></>):(<>
        <li className='font-bold'><Link to='/bookcreate'>BookCreate</Link></li>
      </>)}
    
    </ul>
  </div>
 
  <div className="flex gap-2 navbar-end pr-5">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {!auth.user ? (<>No</>) :(<>
            <img
            alt={auth.user.username}
            src={`http://localhost:3000/${auth.user.profileImage?.replace(/^\/+/, '')}`}

            style={{fontSize:'12px'}} />
            {console.log(``)}
          </>)}
         
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-purple-400 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between font-bold">
            Profile
            <span className="badge bg-success text-base-100">New</span>
          </a>
        </li>
        {!auth.user ? (<>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
        </>) :(<>
          <li><Link onClick={handelLogout} to='/login'>Logout</Link></li>
        </>)}
      </ul>
    </div>
  </div>
</div>
  </>
  )
}

export default Header;