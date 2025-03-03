
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFreeUrl, createUrl, clearUrlState } from '../store/slices/urlSlice';
import { CopyIcon, CheckIcon, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const UrlShortener = ({ isAuthenticated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customUrlText, setCustomUrlText] = useState('');
  const [copied, setCopied] = useState(false);
  
  const dispatch = useDispatch();
  const { currentUrl, loading, error, success } = useSelector(state => state.url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!originalUrl) {
      toast.error('Please enter a URL');
      return;
    }
    
    try {
      const urlData = { originalUrl };
      if (customUrlText) {
        urlData.customUrlText = customUrlText;
      }
      
      if (isAuthenticated) {
        await dispatch(createUrl(urlData)).unwrap();
      } else {
        await dispatch(createFreeUrl(urlData)).unwrap();
      }
      
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to shorten URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl?.shortUrl);
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    dispatch(clearUrlState());
    setOriginalUrl('');
    setCustomUrlText('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <div className="flex items-center mb-6">
        <LinkIcon className="h-6 w-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold">URL Shortener</h2>
      </div>
      
      {!success ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Long URL
            </label>
            <input
              type="url"
              id="originalUrl"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/long-url-to-shorten"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="customUrlText" className="block text-sm font-medium text-gray-700 mb-1">
              Custom URL (optional)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 rounded-l-md border border-r-0 border-gray-300">
                /
              </span>
              <input
                type="text"
                id="customUrlText"
                value={customUrlText}
                onChange={(e) => setCustomUrlText(e.target.value)}
                placeholder="custom-text"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex justify-center items-center"
          >
            {loading ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : (
              <LinkIcon className="h-5 w-5 mr-2" />
            )}
            Shorten URL
          </button>
          
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-500 mb-1">Original URL</p>
            <p className="text-gray-800 break-all">{currentUrl?.originalUrl}</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-500 mb-1">Shortened URL</p>
            <div className="flex items-center justify-between">
              <a 
                href={currentUrl?.shortUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 font-medium break-all hover:underline"
              >
                {currentUrl?.shortUrl}
              </a>
              <button
                onClick={handleCopy}
                className="ml-2 p-2 text-gray-500 hover:text-blue-600 focus:outline-none"
              >
                {copied ? (
                  <CheckIcon className="h-5 w-5 text-green-500" />
                ) : (
                  <CopyIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleClear}
            className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200"
          >
            Create Another
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlShortener;
