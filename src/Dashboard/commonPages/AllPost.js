import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { mycontext } from "../../contextApi/AuthContext";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { BsFillPenFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const AllPost = () => {
  const { user, header, setdynamicPath } = useContext(mycontext);
  const [myposts, setMyposts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/author/my-posts?email=${user?.email}`, header)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setMyposts(res.data.posts);
        }
      })
      .catch((e) => console.log(e));
  }, [user?.email, header]);

  const handleEdite = (id) => {
    setdynamicPath(id);
    console.log(id);
  };
  const handledelete = (id) => {
    axios
      .delete(
        `http://localhost:5000/author/delete-post?email=${user?.email}&id=${id}`,
        header
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "success") {
          setMyposts(res.data.posts);
          toast.success("delete Successfull")
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <h2>All Post {myposts.length} </h2>
      {/* data table */}
      {myposts.length > 0 ? (
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
            {myposts?.map((mypost) => (
              <Tr key={mypost._id} className="bg-gray-100 text-gray-800">
                <Td className="py-2 px-4 border text-sm"> {mypost.date} </Td>
                <Td className="py-2 px-4 border text-sm"> {mypost.title} </Td>
                <Td className="py-2 px-4 border text-sm">
                  {" "}
                  {mypost.category}{" "}
                </Td>
                <Td className="py-2 px-4 border text-sm">
                  {mypost.article.split(" ").slice(0, 10).join(" ")} ...
                </Td>
                <Td className="py-2 px-4 border text-sm">
                  {" "}
                  <Link
                    to={
                      user.role === "admin"
                        ? `/dashboard/edete-post/${mypost._id}`
                        : `/authorPannel/edete-post/${mypost._id}`
                    }
                    onClick={() => handleEdite(mypost._id)}
                  >
                    <BsFillPenFill />
                  </Link>{" "}
                </Td>
                <Td className="py-2 px-4 border text-sm">
                  {" "}
                  <button onClick={() => handledelete(mypost._id)}>
                    {" "}
                    <RiDeleteBin5Fill />{" "}
                  </button>{" "}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <>
          <h2> No Post Available Here </h2>
          <button>
            {" "}
            <Link
              to={
                user.role === "admin"
                  ? "/dashboard/create-post"
                  : "/authorPannel/create-post"
              }
              className="flex items-center"
            >
              {" "}
              Create Post
            </Link>{" "}
          </button>
        </>
      )}
    </div>
  );
};

export default AllPost;
