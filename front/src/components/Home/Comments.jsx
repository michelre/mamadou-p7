import React, { useEffect } from 'react';
import axios from "axios"
import Comment from '../Comment/Comment';
import { useState } from 'react';


const Comments = ({post_id,userId,post,isAdmin}) => {

    const [allcomments,setAllcomments]= useState([]);

        async function fetchAllComments () {
           await axios({
                method: "GET",
                url: `http://localhost:4200/api/comment/${post_id}/allcomments`,
                withCredentials: true,
                params: {
                  id: post_id,
                  user_id: userId,
                },
              })
                .then((res) => {
                    setAllcomments(res.data);
                    // console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
        }
        useEffect(()=>{
          fetchAllComments()
        })

    return (
        <div className="comments">
        {allcomments.map((allCommentaire) => (
          <Comment 
          allCommentaire={allCommentaire} 
          key={allCommentaire.id}
          post={post}
          isAdmin={isAdmin}
          userId={userId}
           />
        ))}
      </div>
    );
};

export default Comments;