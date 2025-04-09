import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";


const UserLogin = () => {
  const [auth, setAuth] = useAuth()
 
    const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShow = () => {
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });
  
      const data = await res.json();
      console.log(data);
  
      if (!res.ok) {
        return toast.error(data.msg || "Something went wrong during login");
      }
      setAuth({...auth,
        user: data.user,
        token:data.token
      })
      localStorage.setItem('auth',JSON.stringify(data))
      toast.success(`Welcome ${data.user.username}`);
      navigate('/');
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error connecting to server");
    }
  };
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="mb-4 text-center">User Login</h3>

        <div className="mb-3">
          <label htmlFor="email" className="form-label form-label block text-gray-700 font-medium">Email address</label>
          <input type="email" name="email" id="email" className="form-control form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" value={formData.email} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="pa" className="form-label ">Password</label>
          <div className="input-group">
            <input
              type={show ? "text" : "password"}
              name="password"
              id="pa"
              className="form-control form-control form-control w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" className="btn btn-outline-secondary" onClick={handleShow}>
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-50">Login</button>
      </form>
    </div>
  );
};

export default UserLogin;
