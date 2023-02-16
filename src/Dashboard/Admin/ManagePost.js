import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { mycontext } from '../../contextApi/AuthContext';

const ManagePost = () => {
  const { user,header } = useContext(mycontext);
    const [allPost, setallPost] = useState([])
    useEffect(() => {
      axios.get(`http://localhost:5000/admin/all-posts?email=${user?.email}`,header)
      .then(res =>{
        setallPost(res.data); 
      })
      .catch((e)=> console.log(e))
    }, [user?.email,header])
    
  
   const handledelete = (id) =>{

   }
   const makeFeaturepost = (id) =>{

   }

    return (
        <div>
      {/* data table */}
      {
        allPost.length> 0 ?
        <Table className="w-full border-collapse bg-white shadow-md">
        <Thead>
          <Tr className="bg-gray-200 text-gray-700">
            <Th className="py-2 px-4 border">date</Th>
            <Th className="py-2 px-4 border">Title</Th>
            <Th className="py-2 px-4 border">category</Th>
            <Th className="py-2 px-4 border">article</Th>
            <Th className="py-2 px-4 border">Action</Th>
            <Th className="py-2 px-4 border">Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allPost?.map((mypost) => (
            <Tr key={mypost._id} className="bg-gray-100 hover:bg-slate-200 cursor-pointer text-gray-800">
              <Td className="py-2 px-4 border text-sm"> {mypost.date} </Td>
              <Td className="py-2 px-4 border text-sm"> {mypost.title} </Td>
              <Td className="py-2 px-4 border text-sm"> {mypost.category} </Td>
              <Td className="py-2 px-4 border text-sm">
                {mypost.article.split(" ").slice(0, 10).join(" ")} ...
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button onClick={() => handledelete(mypost._id)}>
                  {" "}
                  <RiDeleteBin5Fill />{" "}
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button className='btn btn-sm' onClick={() => makeFeaturepost(mypost._id)}>
                  {" "}
                  make fetured{" "}
                </button>{" "}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      :
      <>
      <h2> No Post Available Here  </h2>
      </>
      }
    </div>
    );
};

export default ManagePost;