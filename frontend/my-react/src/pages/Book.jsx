import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
const Book = () => {
   const [book, setBook] = useState([]);
    const [heading, setHeading] = useState()
   const getBook = async () => {
      try {
         const result = await fetch(`http://localhost:3000/api/book`, {
            method: "GET",
         });

         if (!result.ok) {
            throw new Error("Failed to fetch books");
         }

         const data = await result.json();
         console.log(data);
         setBook(data.book); 
         setHeading(!heading)
      } catch (error) {
         console.log("Error:", error);
      }
   };

   useEffect(() => {
      getBook();
   }, []);

   return (
      <div className="my-10 bg-base-200  max-md:mt-15">
          <div className="container mx-auto px-4 py-8 ">
          {!heading ? (
               <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>
            ) : (
               <h1 className="text-3xl font-bold text-center mb-6">📚 All Books</h1>
            )}
         {book.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
               {book.map((item) => (
                  <div
                     key={item._id}
                     className="bg-white shadow-lg rounded-lg overflow-hidden p-4 border border-gray-200 transition-transform transform hover:scale-105"
                  >
                     <img
                        src={`http://localhost:3000${item.photo}`}
                        alt={item.bookname}
                        className="w-75 h-48 object-cover rounded-md"
                     />
                     <div className="p-4">
                        <h3 className="text-xl font-semibold text-gray-800 text-center">{item.bookname}</h3>
                       
                       
                        <Link to={`/book/${item._id}`}>
                           <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" style={{cursor:'pointer'}}>
                              Details
                           </button>
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
         ) : (
           <div className="min-h-150 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
  <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
    <div className="flex justify-center">
      <div className="animate-spin inline-block size-10 border-3 border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</div>

         )}
      </div>
      </div>
   );
};

export default Book;
