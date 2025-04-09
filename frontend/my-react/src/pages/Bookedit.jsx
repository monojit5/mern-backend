import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
const Bookedit = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({
    bookname: '',
    authers: '',
    price: '',
    description: '',
    image: null
  });

  
  useEffect(() => {
    fetch(`http://localhost:3000/api/book/${id}`)
      .then(res => res.json())
      .then(data => {
        const book = data.book;
        setUpdateData({
          bookname: book.bookname || '',
          authers: book.authers || '',
          price: book.price || '',
          description: book.description || '',
          image: null
        });
      });
  }, [id]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setUpdateData({ ...updateData, image: file });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bookname", updateData.bookname);
    formData.append("authers", updateData.authers);
    formData.append("price", updateData.price);
    formData.append("photo", updateData.image); 
    formData.append("description", updateData.description);
    

    try {
      const result = await fetch(`http://localhost:3000/api/book/update/${id}`, {
        method: "PUT",
        body: formData
      });

      const data = await result.json();

      if (!result.ok) {
        toast.error("Update failed:", data);
      } else {
        console.log("Book updated:", data);
        toast.success("Book updated successfully!");
        navigate('/')
      }
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <div className="max-md:mt-20 mt-20">
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
            Update Your Book
          </h2>

          <form className="space-y-4" onSubmit={handelSubmit}>
            <div>
              <label htmlFor="bookname" className="block text-gray-700 font-medium">
                Book Name
              </label>
              <input
                type="text"
                name="bookname"
                id="bookname"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter book name"
                value={updateData.bookname}
                onChange={handelChange}
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
                value={updateData.authers}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter author's name"
                onChange={handelChange}
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
                value={updateData.price}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter book price"
                onChange={handelChange}
              />
            </div>

            <fieldset className="fieldset">
              <legend className=" block text-gray-700 font-medium" style={{ fontSize: '16px' }}>Description</legend>
              <textarea
                className="textarea h-24 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Enter book Description"
                name="description"
                value={updateData.description}
                onChange={handelChange}
              ></textarea>
              <div className="fieldset-label">Optional</div>
            </fieldset>

            <div>
              <label className="block text-gray-700 font-medium">Book Image</label>
              <input
                type="file"
                name="image"
                className="w-full border rounded-md p-2 cursor-pointer"
                onChange={handleFileChange}
              />
              <small className="text-gray-500">Max size 2MB</small>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                style={{ cursor: 'pointer' }}
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

export default Bookedit;
