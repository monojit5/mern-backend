import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Bookcreate = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    bookname: "",
    authers: "",
    price: "",
    description:"",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("bookname", formData.bookname);
    formDataToSend.append("authers", formData.authers);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("photo", formData.image);
    formDataToSend.append("description", formData.description);
   

    try {
      const result = await fetch(`http://localhost:3000/api/book`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await result.json();
      if (!result.ok) {
        toast.error("Something went wrong");
      }
      console.log(data);
      toast.success('welcome')
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-18">
  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-
  2">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Create a New Book
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
       
          <div>
            <label htmlFor="bookname" className="block text-gray-700 font-medium">
              Book Name
            </label>
            <input
              type="text"
              name="bookname"
              id="bookname"
              value={formData.bookname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book name"
              required
            />
          </div>

       
          <div>
            <label htmlFor="authers" className="block text-gray-700 font-medium">
              Author Name
            </label>
            <input
              type="text"
              name="authers"
              id="authers"
              value={formData.authers}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter author's name"
              required
            />
          </div>

         
          <div>
            <label htmlFor="price" className="block text-gray-700 font-medium">
              Price (₹)
            </label>
            <input
              type="number"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              placeholder="Enter book price"
              required
            />
          </div>
          <fieldset className="fieldset">
      <legend className=" block text-gray-700 font-medium" style={{fontSize:'16px'}}>Description</legend>
       <textarea className="textarea h-24 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 " placeholder="Enter book Description" name="description" value={formData.description}  onChange={handleChange}></textarea>
       <div className="fieldset-label">Optional</div>
        </fieldset>
        
          <div>
            <label className="block text-gray-700 font-medium">Book Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              name="image"
              className="w-full border rounded-md p-2 cursor-pointer"
              required
            />
            <small className="text-gray-500">Max size 2MB</small>
          </div>

          
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" style={{cursor:'pointer'}}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Bookcreate;
