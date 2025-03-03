
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifySignup, clearAuthError } from '../../store/slices/authSlice';

const VerifyPage = () => {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { verificationEmail, loading, error, needsVerification } = useSelector(state => state.auth);
  
  useEffect(() => {
    if (!needsVerification) {
      navigate('/login');
    }
  }, [needsVerification, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(verifySignup({ email: verificationEmail, otp })).unwrap();
      navigate('/login');
    } catch (err) {
      // Error handling is managed by the auth slice
    }
  };

  const handleChange = (e) => {
    if (error) dispatch(clearAuthError());
    setOtp(e.target.value);
  };

  return (
    <>
      <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
        Verify your email
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        We've sent a verification code to <span className="font-medium">{verificationEmail}</span>
      </p>
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            Verification code
          </label>
          <input
            id="otp"
            name="otp"
            type="text"
            required
            value={otp}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the code"
          />
        </div>
        
        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? (
              <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Verify'
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default VerifyPage;
