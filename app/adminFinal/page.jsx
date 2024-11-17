'use client';

import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Nav from "../Components/Up";



export default function FinalPage() {
  const router = useRouter();

  // Extract the isAdmin parameter from the URL
  const params = useParams();
  const isAdmin = params.isAdmin === 'true'; // Convert isAdmin to boolean
  const [allUsers, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false); // State to control refreshes

  // Function to handle user deletion
  async function handleDelete(userId) {
    try {
      const res = await axios.delete(`/api/deleteEmp?user=${userId}`);
      console.log(res.data);
      setRefresh(!refresh); // Toggle refresh state to trigger getEmployee
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  // Fetch employees when the component mounts or when refresh changes
  useEffect(() => {
    async function getEmployee() {
      try {
        const res = await axios.get('/api/getEmp');
        setUsers(res.data?.users || []); 
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    }
    getEmployee();
  }, [refresh]); // Depend on refresh to re-fetch data

  function handleAdd() {
    router.push('/addEmp');
  }

  return (
    <>
    <Nav/>
      <div className="flex flex-col mt-[40px] justify-center items-center w-full h-[80%]">
        <h1 className="mb-[10px] text-lg font-bold">Employee List</h1>
        
        {!isAdmin && (
          <button
            className="w-[70%] border border-blue-500 text-blue-500 p-[0.3vw] rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
            onClick={handleAdd}
          >
            Add Employee
          </button>
        )}

        <table className="mt-4 border-collapse border border-gray-300 w-[70%]">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              {!isAdmin && <th className="border border-gray-300 p-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user.firstName}</td>
                <td className="border border-gray-300 p-2">{user.lastName}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                {!isAdmin && (
                  <td className="border border-gray-300 p-2">
                    <Link
                      href={{
                        pathname: '/editEmp',
                        query: { id: user._id, first: user.firstName, last: user.lastName, mail: user.email }
                      }}
                    >
                      <button className="p-[0.6vw] mr-[0.3vw] bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="p-[0.6vw] mr-[0.3vw] bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
