
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUrlAnalytics } from '../../store/slices/urlSlice';
import { ArrowLeft, Globe, Clock, MousePointer, Smartphone } from 'lucide-react';

const UrlAnalyticsPage = () => {
  const { shortCode } = useParams();
  const dispatch = useDispatch();
  const { analytics, loading, error } = useSelector(state => state.url);
  const [analyticsData, setAnalyticsData] = useState({
    referrers: {},
    countries: {},
    browsers: {},
    devices: {},
    timeData: {}
  });

  useEffect(() => {
    if (shortCode) {
      dispatch(getUrlAnalytics(shortCode));
    }
  }, [dispatch, shortCode]);

  useEffect(() => {
    if (analytics && analytics.length > 0) {
      // Process analytics data
      const referrers = {};
      const countries = {};
      const browsers = {};
      const devices = {};
      const timeData = {};

      analytics.forEach(item => {
        // Count referrers
        const referrer = item.referrer || 'Direct';
        referrers[referrer] = (referrers[referrer] || 0) + 1;
        
        // Count countries
        const country = item.country || 'Unknown';
        countries[country] = (countries[country] || 0) + 1;
        
        // Extract browser from userAgent
        const userAgent = item.userAgent || '';
        let browser = 'Unknown';
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        else if (userAgent.includes('Opera')) browser = 'Opera';
        browsers[browser] = (browsers[browser] || 0) + 1;
        
        // Extract device type
        let device = 'Desktop';
        if (userAgent.includes('Mobile')) device = 'Mobile';
        else if (userAgent.includes('Tablet')) device = 'Tablet';
        devices[device] = (devices[device] || 0) + 1;
        
        // Track time data
        const date = new Date(item.createdAt);
        const hour = date.getHours();
        const hourKey = `${hour}:00`;
        timeData[hourKey] = (timeData[hourKey] || 0) + 1;
      });

      setAnalyticsData({ referrers, countries, browsers, devices, timeData });
    }
  }, [analytics]);

  const renderBarChart = (data, title, icon) => {
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const total = sortedData.reduce((acc, [_, value]) => acc + value, 0);
    
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          {icon}
          <h3 className="text-lg font-semibold ml-2">{title}</h3>
        </div>
        <div className="space-y-3">
          {sortedData.length === 0 ? (
            <p className="text-gray-500 text-sm">No data available</p>
          ) : (
            sortedData.map(([key, value]) => {
              const percentage = Math.round((value / total) * 100);
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">{key}</span>
                    <span className="text-gray-500">{value} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Unable to load analytics</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <Link
          to="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics for /{shortCode}</h1>
        <div className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm">
          Total Clicks: {analytics.length}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderBarChart(analyticsData.referrers, 'Traffic Sources', <Globe className="h-5 w-5 text-blue-600" />)}
        {renderBarChart(analyticsData.countries, 'Countries', <Globe className="h-5 w-5 text-green-600" />)}
        {renderBarChart(analyticsData.browsers, 'Browsers', <MousePointer className="h-5 w-5 text-purple-600" />)}
        {renderBarChart(analyticsData.devices, 'Devices', <Smartphone className="h-5 w-5 text-orange-600" />)}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center mb-4">
          <Clock className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold ml-2">Click Activity</h3>
        </div>
        
        {Object.keys(analyticsData.timeData).length === 0 ? (
          <p className="text-gray-500 text-sm">No time data available</p>
        ) : (
          <div className="h-64 flex items-end space-x-2">
            {Object.entries(analyticsData.timeData)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([hour, count]) => {
                const maxCount = Math.max(...Object.values(analyticsData.timeData));
                const height = (count / maxCount) * 100;
                return (
                  <div key={hour} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${height}%` }}
                    ></div>
                    <div className="text-xs mt-1 text-gray-600">{hour}</div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlAnalyticsPage;
