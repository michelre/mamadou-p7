import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CardPost from './CardPost';
// import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Posts = ({imageUrl,allPosts}) => {
  const [isAdmin, setIsAdmin] = useState(false);
  // const [allPosts, setAllPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  // const fetchAllPosts  = async () => {
  //   await axios({
  //     method: "GET",
  //     url: `http://localhost:4200/api/post`,
  //     withCredentials: true,
  //     data: {
  //       user_id: userId,
  //     },
  //   })
  //   .then((res) => {
  //     setAllPosts(res.data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  //   fetchAllPosts()
  // };

  // useEffect(()=>{
  //   fetchAllPosts();
  // },[])
  useEffect(() => {
      if (!localStorage.getItem("user_info")) {
        navigate("/login");
        return;
      }
      const storageUserId = JSON.parse(localStorage.getItem("user_info")).user
        .user_id;
      const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;
  
      if (admin === 1) {
        setIsAdmin(true);
      }
      setUserId(storageUserId);
    
  }, [navigate,userId]);
// console.log(allPosts);
  return (
  <div className="key-posts">
    {allPosts ? (
      allPosts.map((post,pos)=>{
        return <CardPost post ={post} key={pos} isAdmin ={isAdmin}/>
      })
    ) : (null)}
  </div>
  );
};

export default Posts;