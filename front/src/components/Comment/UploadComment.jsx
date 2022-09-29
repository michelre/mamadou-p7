import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import "../../Styles/stylesComp/uploadComment.css"


const UploadComment = ({post_id,userId}) => {

    const [commentMsg,setCommentMsg]= useState("");
    const [longEmptyComt,setLongEmptyComt] = useState(true)
    const handleChange = (e)=>{
        setCommentMsg(e.target.value)
    }
    useEffect(() => {
       function fetchAllComments () {
          axios({
              method: "GET",
              url: `http://localhost:4200/api/comment/${post_id}/allcomments`,
              withCredentials: true,
              params: {
                id: post_id,
                user_id: userId,
              },
            })
              .then((res) => {
                  // console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
      }
      fetchAllComments ();
    }, [post_id,userId]);


    const handleSubmit = (e)=>{
        e.preventDefault();
        if (longEmptyComt) {
          axios({
            method: "POST",
            url: `http://localhost:4200/api/comment/${post_id}`,
            withCredentials: true,
            data: {
              post_id,
              author_id: userId,
              message: commentMsg,
            },
          })
            .then((res) => {
              setCommentMsg("")
            })
            .catch((err) => {
              console.log(`Echec post commentaire : ${err}`);
            });
        }
    }

    useEffect(()=>{
        if (commentMsg.length >= 200 || commentMsg.length <= 0) {
            setLongEmptyComt(false);
          } else {
            setLongEmptyComt(true);
          }    
    },[commentMsg.length])
    


    return (
        <>
        <hr/>
        <form onSubmit={handleSubmit} className="formcomment">
          <input
            type="text"
            placeholder="Votre commentaire..."
            onChange={handleChange}
            value={commentMsg}
            id="input-comment"
          />
            <button type="submit" className="submitComment">
                <FontAwesomeIcon icon={faPaperPlane} />
            </button>
        </form>
      </>
    );
};

export default UploadComment;