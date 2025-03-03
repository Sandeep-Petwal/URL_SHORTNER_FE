
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserUrls, deleteUrl, setCurrentPage } from '../store/slices/urlSlice';
import { Trash2, BarChart2, CopyIcon, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const UrlList = () => {
  const dispatch = useDispatch();
  const { urls, loading, totalPages, currentPage } = useSelector(state => state.url);

  useEffect(() => {
    dispatch(fetchUserUrls({ page: currentPage, limit: 5 }));
  }, [dispatch, currentPage]);

  const handleDelete = async (shortUrl) => {
    try {
      await dispatch(deleteUrl(shortUrl)).unwrap();
      toast.success('URL deleted successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to delete URL');
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!');
  };

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
  };

  if (loading && urls.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-700">No URLs found</h3>
        <p className="text-gray-500 mt-2">Create your first shortened URL above</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Your URLs</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.map((url) => {
              const shortCode = url.shortUrl.split('/').pop();
              const date = new Date(url.createdAt).toLocaleDateString();
              return (
                <tr key={url._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                    <a 
                      href={url.originalUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-blue-600"
                    >
                      {url.originalUrl}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <a 
                        href={url.shortUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {url.shortUrl}
                      </a>
                      <button
                        onClick={() => handleCopy(url.shortUrl)}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                      >
                        <CopyIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/dashboard/analytics/${shortCode}`}
                        className="text-blue-600 hover:text-blue-800"
                        title="View Analytics"
                      >
                        <BarChart2 className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(url.shortUrl)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete URL"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                        title="Open URL"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border border-gray-300 text-sm font-medium ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-3 py-1 border-t border-b border-gray-300 text-sm font-medium ${
                  currentPage === page + 1
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border border-gray-300 text-sm font-medium ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default UrlList;
