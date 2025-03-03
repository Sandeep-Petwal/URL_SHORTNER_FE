
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'lucide-react';

const RedirectPage = () => {
  const { shortCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  
  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/get/${shortCode}`);
        
        if (response.data.success) {
          setOriginalUrl(response.data.data.originalUrl);
          // Redirect to the original URL
          window.location.href = response.data.data.originalUrl;
        } else {
          setError(response.data.message || 'Could not find the URL');
          setLoading(false);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
        setLoading(false);
      }
    };

    if (shortCode) {
      fetchOriginalUrl();
    }
  }, [shortCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="mb-4 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting you</h1>
          <p className="text-gray-600">Please wait while we redirect you to your destination.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <Link className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Link not found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-4 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Redirecting you</h1>
        <p className="text-gray-600">
          {originalUrl && (
            <>
              Redirecting to: <span className="text-blue-600">{originalUrl}</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default RedirectPage;
