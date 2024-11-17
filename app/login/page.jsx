'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Nav from '../Components/Up';

function Adminlogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  async function handlePass() {
    setLoading(true);
    setErr(''); // Clear previous errors
    try {
      const response = await axios.get(`/api/getAdmin?email=${formData.email}&password=${formData.password}`);
      if (response.data.success) {
        router.push('/adminFinal');
      }
    } catch (error) {
      console.error(error);
      setErr('Incorrect Password');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr('');
    try {
      const res = await axios.get(`/api/validation?email=${formData.email}`);
      if (res.data.success) {
        setIsSent(true);
      }
    } catch (error) {
      console.error(error);
      setErr('Provided email does not exist. Please signup.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-lg border border-gray-200">
          <h2 className="text-center text-2xl font-semibold mb-6">Admin Login</h2>
          <p className="text-center text-red-500 mb-4">
            {isSent ? 'Email sent' : err}
          </p>

          <form onSubmit={handleSubmit}>
            {!isSent ? (
              <>
                <div>
                  <label htmlFor="email" className="block mb-2 text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-md transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Login'}
                </button>
              </>
            ) : null}
          </form>

          {isSent && (
            <div>
              <label htmlFor="password" className="block mb-2 text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                required
              />

              <button
                onClick={handlePass}
                className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-md transition-colors duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Enter'}
              </button>
              <p className="mt-4 text-red-500 text-center">{err}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Adminlogin;
