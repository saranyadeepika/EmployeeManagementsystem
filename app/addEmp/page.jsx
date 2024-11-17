'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import  {  useState } from 'react';
// import { useRouter } from 'next/navigation';

function Add() {
  // Define state for form fields
  const router=useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

 async function handleSave(e){
  e.preventDefault()
try {
  const res=await axios.post('api/add',formData)
  console.log(res.data)
  router.push('/adminFinal')
  
} catch (error) {
  console.log(error)
  
}
   
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
function handleCancel(){
  setFormData({ firstName: '', lastName: '', email: '' })
  router.push('/adminFinal')


}
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-md shadow-md w-[40%] max-w-md border border-gray-200">
        <h2 className="text-center text-2xl font-semibold mb-6">Add Employee</h2>
        
        <form id="employeeForm" className="space-y-4">
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
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
             onClick={handleSave}>Save </button>

  

<button
  type="button"
  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"   onClick={handleCancel}
>
  Cancel
</button>


          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
