import React from 'react'
import NewsCardComponent from '../components/common/NewsCardComponent';
import { Link } from 'react-router-dom';
import ContentLoader from '../components/ContentLoader';

const NewsPage = () => {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const fetchNews = async () => {
    try {
      const response = await fetch('http://localhost:5000/news');
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
      <div className="flex flex-wrap justify-center w-screen h-screen overflow-y-scroll px-4">
          <div className="standard-max-width w-full">
            <h1 className='text-3xl font-bold text-center py-4'>Latest News</h1>
            {loading && <div className='h-full w-full flex items-center justify-center'><ContentLoader /></div>}
            {error && <div>Error: {error.message}</div>}
            {news.length === 0 && !loading && <div>No news available</div>}
            <div className="grid grid-cols-3 gap-4 max-[1200px]:grid-cols-2 max-[800px]:grid-cols-1 ">
              {news.map((article, index) => (
                  <Link
                    to={`${article.url}`}
                    target='_blank'
                  >
                    <NewsCardComponent 
                    key={index} 
                    time={article.publishedAt}
                    title={article.title}
                    desc={article.description}
                    image={article.imageUrl}
                    source={article.source.name}
                    />
                  </Link>
              ))}
            </div>
          </div>
      </div>
    </>
  )
}

export default NewsPage;