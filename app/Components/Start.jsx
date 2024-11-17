'use client'

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";





export default function Landing({ dis }) {
  const router = useRouter();

  const { isAdmin } = useParams();
  const adminStatus = isAdmin === 'false';
  
  const [allUsers, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getEmployee = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/getEmp');
      setUsers(res.data?.users || []);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getEmployee();
  }, [getEmployee]); // Only call getEmployee once when component mounts.

  const handleDelete = useCallback(async (userId) => {
    setLoading(true);
    try {
      await axios.delete(`/api/deleteEmp?user=${userId}`);
      getEmployee(); // Re-fetch employees after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setLoading(false);
    }
  }, [getEmployee]);



  const handleAdd = useCallback(() => {
    router.push('/addEmp');
  }, [router]);

  return (
    <>
      

      <div className="flex flex-col mt-[40px] font-geistSans justify-center items-center w-full h-[80%]">
      <h1 className="mb-[10px] text-[2rem] font-bold">Employee List</h1>
        
        {dis !== false && (
          <button
            className="w-[70%] border border-blue-500 text-blue-500 p-[0.3vw] rounded-lg hover:bg-blue-500 hover:text-white transition-colors duration-200"
            onClick={handleAdd}
          >
            Add Employee
          </button>
        )}

        <table className="mt-4 border-collapse border border-gray-300 w-[70%]" style={{ cursor: loading ? 'wait' : 'default' }}>
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">First Name</th>
              <th className="border border-gray-300 p-2">Last Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              {dis !== false && <th className="border border-gray-300 p-2">Action</th>}
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user.firstName}</td>
                <td className="border border-gray-300 p-2">{user.lastName}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                {dis !== false && (
                  <td className="border border-gray-300 p-2">
                    <Link
                      href={{
                        pathname: '/editEmp',
                        query: { id: user._id, first: user.firstName, last: user.lastName, mail: user.email }
                      }}
                    >
                      <button className="p-[0.6vw] mr-[0.3vw] bg-green-600 text-white font-semibold rounded-md hover:bg-green-700" disabled={adminStatus}>Edit</button>
                    </Link>
                    <button className="p-[0.6vw] mr-[0.3vw] bg-red-600 text-white font-semibold rounded-md hover:bg-red-700" onClick={() => handleDelete(user._id)} disabled={adminStatus}>Delete</button>
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
