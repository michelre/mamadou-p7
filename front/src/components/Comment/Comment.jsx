import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { dateParser } from '../../services/Utils';
import "../../Styles/stylesComp/comment.css"


const Comment = ({allCommentaire,post,isAdmin,userId}) => {
    // console.log(allCommentaire.author_id);
    const [isUserOrAdmin,setIsUserOrAdmin]= useState(false);
    const id = allCommentaire.id;

    // http://localhost:4200/images/anonymousUser.svg


    const handleDeleteComment = () => {
        axios({
          method: "DELETE",
          url: `http://localhost:4200/api/comment/${id}`,
          withCredentials: true,
        //   data: {
        //     id: singleComment.id,
        //   },
        })
          .then((res) => {
            // if (res.status === 200) document.location.reload();
          })
          .catch((err) => {
            console.log(`Echec suppression de commentaire : ${err}`);
          });
      };

    useEffect(() => {
        if (userId === allCommentaire.author_id || isAdmin) {
            setIsUserOrAdmin(true);
        } else {
            setIsUserOrAdmin(false);
        }
    }, [allCommentaire.author_id,isAdmin,userId]);



    return (
        <>
        <div className="ContGlobalComment">
          <div className="containerimguserProfil">
            <img src={allCommentaire.user_picture ?allCommentaire.user_picture :"http://localhost:4200/images/anonymousUser.svg"} alt='"'/>
            <h5>{`${allCommentaire.user_firstname}  ${allCommentaire.user_lastname}`}</h5>
          </div>
          <div className="containerPseudoDate">
            <div className="datePubComment">{dateParser( allCommentaire.created_At)}</div>
            {isUserOrAdmin && (
              <span className='deleteComment' onClick={handleDeleteComment}>
                <FontAwesomeIcon icon={faTrashCan} />
              </span>
            )}
          </div>
        </div>
        <h4>Commentaires</h4>
        <div className='commentaireTexte'>{allCommentaire.message}</div>
    </>    
    );
};

export default Comment;