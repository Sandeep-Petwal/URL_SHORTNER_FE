
import { BarChart, Link, Users, Globe } from 'lucide-react';

const Stats = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-blue-50 p-6 rounded-lg shadow-sm border border-blue-100">
        <div className="flex items-center">
          <div className="bg-blue-100 p-3 rounded-full">
            <Link className="h-6 w-6 text-blue-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-blue-600">Total URLs</p>
            <h3 className="text-2xl font-bold text-gray-800">{data?.totalUrls || 0}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-lg shadow-sm border border-purple-100">
        <div className="flex items-center">
          <div className="bg-purple-100 p-3 rounded-full">
            <BarChart className="h-6 w-6 text-purple-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-purple-600">Total Clicks</p>
            <h3 className="text-2xl font-bold text-gray-800">{data?.totalClicks || 0}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-100">
        <div className="flex items-center">
          <div className="bg-green-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-green-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-green-600">Unique Visitors</p>
            <h3 className="text-2xl font-bold text-gray-800">{data?.uniqueVisitors || 0}</h3>
          </div>
        </div>
      </div>
      
      <div className="bg-orange-50 p-6 rounded-lg shadow-sm border border-orange-100">
        <div className="flex items-center">
          <div className="bg-orange-100 p-3 rounded-full">
            <Globe className="h-6 w-6 text-orange-700" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-orange-600">Countries</p>
            <h3 className="text-2xl font-bold text-gray-800">{data?.countries || 0}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
