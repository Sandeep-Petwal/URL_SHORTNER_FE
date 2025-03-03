
import { useSelector } from 'react-redux';
import UrlShortener from '../../components/UrlShortener';
import UrlList from '../../components/UrlList';
import Stats from '../../components/Stats';

const DashboardPage = () => {
  const { user } = useSelector(state => state.auth);
  const { urls, totalUrls } = useSelector(state => state.url);
  
  // Mocked stats data (in a real app, this would come from an API)
  const statsData = {
    totalUrls,
    totalClicks: urls.reduce((acc, url) => acc + (url.clicks || 0), 0),
    uniqueVisitors: Math.floor(urls.reduce((acc, url) => acc + (url.clicks || 0), 0) * 0.7),
    countries: Math.min(Math.floor(urls.length * 1.5), 10),
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome, {user?.name}</p>
      </div>
      
      <Stats data={statsData} />
      
      <div className="space-y-12">
        <section>
          <UrlShortener isAuthenticated={true} />
        </section>
        
        <section>
          <UrlList />
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
