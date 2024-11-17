'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Nav from '../Components/Up';

function AdminSignUp() {
  const ref = useRef(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // Set loading to true when form submission starts

    try {
      await axios.post('/api/addAdmin', formData);
      ref.current.innerHTML = "Account creation is pending admin approval. Please check your email for further updates."; // Corrected innerHTML capitalization
    } catch (error) {
      console.log(error);
      setErr('Email already exists');
    } finally {
      setLoading(false); // Reset loading state after submission completes
    }
  }

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-md shadow-md w-full max-w-lg border border-gray-200">
          <h2 className="text-center text-2xl font-semibold mb-6">Admin Sign Up</h2>
          <p ref={ref} className="text-center font-bold text-red-500 mb-4">
            {err ? err : ''}
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">
                Email:
              </label>
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
              className={`w-full py-2 bg-blue-500 text-white font-semibold rounded-md transition-colors duration-200 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminSignUp;
