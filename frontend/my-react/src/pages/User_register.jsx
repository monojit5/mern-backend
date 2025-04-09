import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const User_register = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
    const [user, setUser] = useState({
        username:'',
        email:'',
        address:'',
        phone:'',
        city:'',
        password:'',
        image:null

    });
const handleChange = (e) => {
const {name, value} = e.target;
setUser({...user,[name]:value})
};
const handleFileChange = (e) => {
const file = e.target.files[0]
 setUser({...user,image:file})
}
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(user)
  if (!user.username ||!user.email ||!user.phone ||!user.city ||!user.address ||!user.password) {
    toast.error('Plese fill up all the field')
    if (!user.password <= 7) {
      toast.error('password most be 7 chrecter')
    }}
  const fromdata = new FormData;
  fromdata.append("username", user.username)
  fromdata.append("email", user.email)
  fromdata.append("address", user.address)
  fromdata.append("city", user.city)
  fromdata.append("phone", user.phone);
  fromdata.append("password", user.password)
  fromdata.append("image", user.image)
 try {
  const result = await fetch(`http://localhost:3000/user/register`,{
    method:"POST",
  body: fromdata
  })
  if (!result.ok) {
    toast.error("Something went wrong during registration");
        return;
  }
  const data = await result.json()
  console.log(data)
  toast.success("Registered successfully 🎉");
  navigate('/login');
 } catch (error) {
  toast.error(error)
  toast.error("Error connecting to server");
 }
 
}
const handleShow = ()=>{
  setShow(!show)
}
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 pt-20">
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow" style={{ width: "100%", maxWidth: "500px" }}>
      <h3 className="mb-4 text-center">User Registration</h3>

      <div className="mb-3">
        <label className="form-label block text-gray-700 font-medium">Name</label>
        <input type="text" name="username" className="form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" value={user.username} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label block text-gray-700 font-medium">Email</label>
        <input type="email" name="email" className="form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" value={user.email} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label block text-gray-700 font-medium">Address</label>
        <input type="text" name="address" className="form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" value={user.address} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label block text-gray-700 font-medium">Phone</label>
        <input type="tel" name="phone" className="form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" value={user.phone} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label block text-gray-700 font-medium">City</label>
        <input type="text" name="city" className="form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 " value={user.city} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label className="form-label block text-gray-700 font-medium">Password</label>
        <div className="input-group ">
          <input
            type={show ? "text" : "password"}
            name="password"
            className="form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={user.password}
            onChange={handleChange}
          />
          <button type="button" className="btn btn-outline-secondary" onClick={handleShow}>
            {show ? "Hide" : "Show"}
          </button>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Profile Image</label>
        <input type="file" name="image" className="form-control" onChange={handleFileChange} />
        <small className="text-muted">Max size: 2MB</small>
      </div>

      <button type="submit" className="btn btn-success w-50">Register</button>
    </form>
  </div>
  )
}

export default User_register;
