import React from 'react'
import { useNavigate } from 'react-router-dom';
import Book from './Book';
import { useAuth} from '../context/Auth'
const Home = () => {
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();

  return (
    <div className=''>
      <div className="mt-20">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex flex-col-reverse lg:flex-row items-center justify-center gap-10 px-4 lg:px-20">
            <div className="text-center lg:text-left max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-purple-500">
                <span className="text-blue-400">Discover Your</span> Next Great Read!
              </h1>
              <p className="py-6 text-base sm:text-lg font-medium text-gray-700">
                Books are not just collections of pages; they are gateways to knowledge, imagination, and self-discovery. Each story, each line, offers a new perspective and a deeper understanding of the world around us. In a world full of noise, a book gives us a moment of silence, reflection, and peace. It helps us grow, both intellectually and emotionally. Building a habit of reading not only enriches our minds but also shapes our character. So, let us embrace the joy of reading and unlock the limitless world that books offer.
              </p>
              <button
                className="btn btn-primary font-bold mt-1"
                onClick={() => navigate("/book")}
              >
                Explore...
              </button>
            </div>
            <div className="w-full max-w-sm">
              <img
                src="./slider-img.png"
                alt="Bookshelf or reading"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
      <Book />
    </div>
  );
};

export default Home;
