// import React from 'react'
// import NewsCardComponent from '../components/common/NewsCardComponent';
// import { Link } from 'react-router-dom';
// import ContentLoader from '../components/ContentLoader';

// const NewsPage = () => {
//   const [news, setNews] = React.useState([]);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);
//   const fetchNews = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/news');
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       const data = await response.json();
//       setNews(data);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   React.useEffect(() => {
//     fetchNews();
//   }, []);
//   return (
//     <>
//       <div className="flex flex-wrap justify-center w-screen h-screen overflow-y-scroll px-4">
//           <div className="standard-max-width w-full">
//             <h1 className='text-5xl font-extrabold text-center py-4 border-b-2 mb-2 border-gray-500'>
//               <span className='bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent'>
//                 Latest News
//               </span>
//             </h1>
//             {loading && <div className='h-full w-full flex items-center justify-center'><ContentLoader /></div>}
//             {error && <div>Error: {error.message}</div>}
//             {news.length === 0 && !loading && <div>No news available</div>}
//             <div className="grid grid-cols-3 gap-4 max-[1200px]:grid-cols-2 max-[800px]:grid-cols-1 ">
//               {news.map((article, index) => (
//                   <Link
//                     to={`${article.url}`}
//                     target='_blank'
//                   >
//                     <NewsCardComponent 
//                     key={index} 
//                     time={article.publishedAt}
//                     title={article.title}
//                     desc={article.description}
//                     image={article.imageUrl}
//                     source={article.source.name}
//                     />
//                   </Link>
//               ))}
//             </div>
//           </div>
//       </div>
//     </>
//   )
// }

// export default NewsPage;

import React from 'react';
import NewsCardComponent from '../components/common/NewsCardComponent';
import { Link } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';
import { Newspaper } from 'lucide-react';
import NavbarComponent from '../components/common/Navbar';

const NewsPage = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:3000/news');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNews(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>

  <NavbarComponent />
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center space-x-3 mb-2">
            <Newspaper className="w-8 h-8 text-blue-600" />
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Latest News
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest updates and breaking news from around the world
          </p>
        </div>

        {/* Content Section */}
        <div className="relative min-h-[400px]">
          {/* Loading State */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <ContentLoader />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center p-8 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-600 font-medium">Error: {error.message}</p>
              <button 
                onClick={fetchNews}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {news.length === 0 && !loading && !error && (
            <div className="text-center p-12 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-600 font-medium">No news articles available at the moment</p>
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-3 gap-8 max-[1200px]:grid-cols-2 max-[800px]:grid-cols-1">
            {news.map((article, index) => (
              <div 
                key={article.id || index}
                className="transform hover:-translate-y-1 transition-transform duration-300"
              >
                <Link
                  to={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  <NewsCardComponent 
                    time={article.publishedAt}
                    title={article.title}
                    desc={article.description}
                    image={article.imageUrl}
                    source={article.source.name}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default NewsPage;