
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Link to="/" className="font-bold text-3xl text-blue-600">URLify</Link>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              <Outlet context="title" />
            </h2>
          </div>
          <div className="mt-8">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
          <div className="p-12 text-center text-white">
            <h1 className="text-5xl font-bold mb-6">URLify</h1>
            <p className="text-xl mb-8">Create short, memorable links in seconds</p>
            <div className="max-w-md mx-auto p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
              <p className="text-lg mb-4">Track your links, analyze performance, and optimize your online presence.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
