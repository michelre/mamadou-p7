import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import UploadComment from "../Comment/UploadComment";
import Comments from "./Comments";
import "../../Styles/stylesComp/cardPost.css";
import { dateParser } from "../../services/Utils";

const CardPost = ({ post, isAdmin }) => {
  const [isPostUser, setIsPostUser] = useState(false);
  const { post_id, post_user_id } = post;
  const [countLikes, setCountLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const userId = JSON.parse(localStorage.getItem("user_info")).user.user_id;

  const navigate = useNavigate();

  //********************************************** LES FN *********************************/

  const handleProfilPage = () => {
    navigate(`/profil`);
  };

  const fetchLikes = () => {
    axios({
      method: "POST",
      url: `http://localhost:4200/api/post/${post_id}/postLikedByUser`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        if (res.data[0]) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLikeCount = () => {
    axios({
      method: "POST",
      url: `http://localhost:4200/api/post/${post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        setCountLikes(res.data[0].total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLike = () => {
    axios({
      method: "PATCH",
      url: `http://localhost:4200/api/post/${post_id}/likeunlike`,
      withCredentials: true,
      data: {
        postId: post_id,
        userId,
      },
    })
      .then((res) => {
        handleLikeCount();
      })
      .catch((err) => {
        console.log(`Echec like post : ${err}`);
      });
  };
  

  const handleDelete = () => {
    axios({
      method: "DELETE",
      url: `http://localhost:4200/api/post/${post_id}`,
      withCredentials: true,
      data: {
        post_id,
        post_user_id: userId,
      },
    })
      .then((res) => {
        // fetchAllPosts();
      })
      .catch((err) => {
        console.log(`Echec suppression de post : ${err}`);
      });
  };

  useEffect(() => {
    if (post.post_user_id === userId || isAdmin) {
      setIsPostUser(true);
    } else {
      setIsPostUser(false);
    }
  }, [post, isAdmin, userId]);

  useEffect(() => {
    handleLikeCount();
    fetchLikes();
  });


  // console.log(post.post_imageUrl);
  return (
    <>
      <div className="containercard">
        <div className="containerImgPseudoDate">
          <div
            className="containerImgPseudo"
            onClick={(e) => navigate(`/profil/${post_user_id}`)}
          >
            <img
              className="imgPic"
              src={
                post.user_picture
                  ? post.user_picture
                  : "http://localhost:4200/images/anonymousUser.svg"
              }
              alt="imgeProfil"
            />
            <div className="containerNomContent">
              <h3
                key={`${post.post_user_id}${post.date_creation}`}
                onClick={handleProfilPage}
              >
                {post.user_firstname} {post.user_lastname}
              </h3>
            </div>
          </div>
          <div className="date">{dateParser(post.date_creation)}</div>
        </div>
        <div className="containerMsgImgPost" key={`${post.post_user_id}`}>
          <div className="containerPost">{post.content}</div>

          <div className="containerimgPost">
            {post.post_imageUrl === "null" ? "":<img src = {post.post_imageUrl} alt=""/>}
          </div>
        </div>

        <div className="containerCountlikes">
          {countLikes === 0 ? (
            <FontAwesomeIcon icon={faHeart} className="heartNonLiked" />
          ) : (
            <FontAwesomeIcon icon={faHeart} className="heartLiked" />
          )}{" "}
          {countLikes}
        </div>
        <div className="postContainerBtnEnd">
          {isLiked && (
            <button onClick={handleLike} className="postLiked">
              <FontAwesomeIcon icon={faThumbsUp} /> J'aime
            </button>
          )}
          {!isLiked && (
            <button onClick={handleLike} className="postLiked">
              <FontAwesomeIcon icon={faThumbsUp} /> J'aime
            </button>
          )}
          {}
          {isPostUser && (
            <button
              className="supprimer"
              onClick={() => {
                handleDelete(post.post_id);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> Supp Msg
            </button>
          )}
        </div>
        <div>
          <Comments
            post_id={post_id}
            post={post}
            userId={userId}
            isAdmin={isAdmin}
          />
          <UploadComment 
          post_id={post_id} 
          userId={userId} 

          />
        </div>
      </div>
    </>
  );
};

export default CardPost;
