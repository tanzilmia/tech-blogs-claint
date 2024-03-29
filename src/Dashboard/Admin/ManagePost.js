import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { mycontext } from '../../contextApi/AuthContext';

const ManagePost = () => {
  const { user,header } = useContext(mycontext);
    const [allPost, setallPost] = useState([])
    const now = moment();
    const date = now.format("MM/DD/YY hh:mm a");
    useEffect(() => {
      axios.get(`https://tech-blog-server-jade.vercel.app/admin/all-posts?email=${user?.email}`,header)
      .then(res =>{
        setallPost(res.data); 
      })
      .catch((e)=> console.log(e))
    }, [user?.email,header])
    
  
   
    const handledelete = (id) => {
      axios
        .delete(
          `https://tech-blog-server-jade.vercel.app/admin/delete-post?email=${user?.email}&id=${id}`,
          header
        )
        .then((res) => {
          
          if (res.data.message === "success") {
            setallPost(res.data.posts);
            toast.success("delete Successfull")
          }
        })
        .catch((e) => console.log(e));
    };

   const makeFeaturepost = (id) =>{
      axios.put(`https://tech-blog-server-jade.vercel.app/admin/make-featured?email=${user?.email}`,{id,date},header )
      .then(res =>{
        if (res.data.message === "success") {
          setallPost(res.data.posts);
          toast.success("Added Successfull")
        }
      })
      .catch((e)=> console.log(e))
   }
   const makenormalPost = (id) =>{
      axios.put(`https://tech-blog-server-jade.vercel.app/admin/make-normalpost?email=${user?.email}`,{id,date},header )
      .then(res =>{
        if (res.data.message === "success") {
          setallPost(res.data.posts);
          toast.success("Added Successfull")
        }
      })
      .catch((e)=> console.log(e))
   }


    return (
        <div>
          <h2 className='md:hidden lg:hidden text-2xl text-center mb-2'> Manage Posts  </h2>
      {/* data table */}
      {
        allPost.length> 0 ?
        <Table className="w-full border-collapse bg-white shadow-md">
        <Thead>
          <Tr className="bg-gray-200 text-gray-700">
            <Th className="py-2 px-4 border text-xs">Serial</Th>
            <Th className="py-2 px-4 border text-xs">date</Th>
            <Th className="py-2 px-4 border text-xs">Title</Th>
            <Th className="py-2 px-4 border text-xs">category</Th>
            <Th className="py-2 px-4 border text-xs">article</Th>
            <Th className="py-2 px-4 border text-xs">Fetred</Th>
            <Th className="py-2 px-4 border text-xs">Delete</Th>
            <Th className="py-2 px-4 border text-xs">Make Fetured</Th>
            <Th className="py-2 px-4 border text-xs">Delete Fetured</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allPost?.map((mypost,index) => (
            <Tr key={mypost._id} className="bg-gray-100 hover:bg-slate-200 cursor-pointer text-gray-800">
              <Td className="py-2 px-4 border text-sm"> {index + 1} </Td>
              <Td className="py-2 px-4 border text-sm"> {mypost.date} </Td>
              <Td className="py-2 px-4 border text-sm"> {mypost.title} </Td>
              <Td className="py-2 px-4 border text-sm"> {mypost.category} </Td>
              
              <Td className="py-2 px-4 border text-sm">
                {mypost.article.split(" ").slice(0, 10).join(" ")} ...
              </Td>
              <Td className="py-2 px-4 border text-sm"> {mypost.featuresPost === true ? "True" : "False"} </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button disabled = {mypost.featuresPost === true} onClick={() => handledelete(mypost._id)}>
                  {" "}
                  <RiDeleteBin5Fill />{" "}
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button disabled = {mypost.featuresPost === true} className='btn btn-xs btn-success' onClick={() => makeFeaturepost(mypost._id)}>
                  {mypost.featuresPost === true ? "Actived" : "Action"}
                </button>{" "}
              </Td>
              <Td className="py-2 px-4 border text-sm">
                {" "}
                <button disabled = {mypost.featuresPost === false} className='btn btn-xs btn-success' onClick={() => makenormalPost(mypost._id)}>
                {mypost.featuresPost === false ? "Active" : "Delete"}
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