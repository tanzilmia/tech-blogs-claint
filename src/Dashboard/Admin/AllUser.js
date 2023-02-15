import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { BsFillPenFill } from 'react-icons/bs';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { mycontext } from '../../contextApi/AuthContext';

const AllUser = () => {
    const {user,header} = useContext(mycontext)
    const [users, setusers] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:5000/admin/all-user?email=${user.email}`,header)
      .then(res => {
        setusers(res.data)
      })
      .catch((e)=> console.log(e))
    }, [user?.email,header])
    
    const handleEdite = (id) =>{
        console.log(id)
    }
    const handledelete = (id) =>{
        console.log(id)
    }

    return (
        <div>
            <h2>All User {users?.length} </h2>
            <Table className="w-full border-collapse bg-white shadow-md">
        <Thead>
          <Tr className="bg-gray-200 text-gray-700">
            <Th className="py-2 px-4 border">Name</Th>
            <Th className="py-2 px-4 border">Emaii</Th>
            <Th className="py-2 px-4 border">Roll</Th>
            <Th className="py-2 px-4 border">Action</Th>
            <Th className="py-2 px-4 border">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((user) => (
            <Tr key={user._id} className="bg-gray-100 text-gray-800">
              <Td className="py-2 px-4 border text-sm"> {user.name} </Td>
              <Td className="py-2 px-4 border text-sm"> {user.email} </Td>
              <Td className="py-2 px-4 border text-sm"> {user.role} </Td>
              
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button className='btn btn-sm btn-success' onClick={() => handleEdite(user._id)} disabled = {user.role === "admin"}>
                  Make Author
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button onClick={() => handledelete(user._id)} disabled = {user.role === "admin"}>
                  {" "}
                  <RiDeleteBin5Fill />{" "}
                </button>{" "}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
        </div>
    );
};

export default AllUser;