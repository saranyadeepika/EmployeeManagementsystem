'use client';

import { Suspense } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const EditEmp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: ''
  });

  useEffect(() => {
    const userId = searchParams.get('id');
    const firstName = searchParams.get('first');
    const lastName = searchParams.get('last');
    const email = searchParams.get('mail');

    if (userId && firstName && lastName && email) {
      setFormData({
        id: userId,
        firstName,
        lastName,
        email
      });
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the updated form data to the server
      await axios.put('/api/update', formData);
      
      // After successful update, navigate to the /adminFinal page
      router.push('/adminFinal');
    } catch (error) {
      console.error("Error updating employee data", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-[40%] max-w-md border border-gray-200">
        <h2 className="text-center text-2xl font-semibold mb-6">Edit Employee</h2>
        
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName" className="block mb-1 text-gray-700">First Name:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-1 text-gray-700">Last Name:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-gray-700">Email:</label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
            >
              Save
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
              onClick={() => {
                router.push('/adminFinal');
                setFormData({ id: '', firstName: '', lastName: '', email: '' });
              }} 
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Wrap with Suspense boundary for client-side hooks
export default function EditEmpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditEmp />
    </Suspense>
  );
}
