
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UrlShortener from '../components/UrlShortener';
import { Link as LinkIcon, BarChart2, Users, Globe, Lock } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto pt-8 pb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Shorten, Share, and <span className="text-blue-600">Track</span> Your Links
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Create memorable, trackable short links in seconds. Perfect for social media, marketing campaigns, or any place you need a clean, professional link.
        </p>
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-200"
            >
              Get Started - It's Free
            </Link>
            <Link
              to="/login"
              className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-6 rounded-md transition duration-200"
            >
              Log In
            </Link>
          </div>
        )}
      </section>

      {/* URL Shortener Section */}
      <section className="max-w-4xl mx-auto">
        <UrlShortener isAuthenticated={isAuthenticated} />
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need in a URL Shortener
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-blue-100 p-3 inline-block rounded-lg mb-4">
                <LinkIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Short Links</h3>
              <p className="text-gray-600">
                Create branded, memorable links that reflect your content and improve click-through rates.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-purple-100 p-3 inline-block rounded-lg mb-4">
                <BarChart2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-gray-600">
                Track clicks, analyze traffic sources, and understand audience behavior for each link.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="bg-green-100 p-3 inline-block rounded-lg mb-4">
                <Lock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your links are always available with our reliable infrastructure and secure platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="bg-blue-600 text-white py-16 rounded-lg">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Create an account and unlock all features, including custom URLs, detailed analytics, and more.
            </p>
            <Link
              to="/signup"
              className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition duration-200"
            >
              Sign Up for Free
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
