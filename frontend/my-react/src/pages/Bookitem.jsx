import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/Auth";


const Bookitem = () => {
  const [auth, setAuth] = useAuth()
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookdata] = useState(null);

  
  const getId = async () => {
    try {
      const resultData = await fetch(`http://localhost:3000/api/book/${id}`, {
        method: "GET",
      });
      if (!resultData.ok) {
        console.log("Something went wrong");
        return;
      }
      const data = await resultData.json();
      setBookdata(data.book);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getId();
  }, [id]);


  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:3000/api/book/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete book");
        return;
      }

      toast.success("Book deleted successfully!");
      navigate("/"); 
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
   <div className="max-md:mt-35">
  <div className="flex justify-center items-center h-screen ">
      {bookData ? (
        <div className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 p-6">
          <img
            src={`http://localhost:3000${bookData.photo}`}
            alt={bookData.bookname}
            className="w-full h-48 object-cover rounded-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{bookData.bookname}</h2>
          <p className="text-md font-semibold">{bookData.description}</p>
          <p className="text-gray-600 mt-2">Author: <span className="font-medium">{bookData.authers}</span></p>
          
          <h3 className="text-xl font-semibold text-gray-700 mt-2">₹{bookData.price}</h3>
        
          <div className="flex justify-between mt-4">
            {!auth.user ? (<></>) :(<>
              <Link to={`/book/update/${id}`}>
              <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition" style={{cursor:"pointer"}}>
                 Edit
              </button>
            </Link>
            </>)}
            
            <Link to="/"><button className="btn btn-primary">Back</button></Link>
            {!auth.user ? (<></>) :(<>
              <button
              onClick={handleDelete}
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition" style={{cursor:"pointer"}}
            >
               Delete
            </button>
            </>)}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
   </div>
  );
};

export default Bookitem;
