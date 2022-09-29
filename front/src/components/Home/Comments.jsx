import React from 'react';
import Comment from '../Comment/Comment';


const Comments = ({userId,post,isAdmin, allcomments, fetchAllComments}) => {

    return (
        <div className="comments">
        {allcomments ? allcomments.map((allCommentaire) => (
          <Comment
          allCommentaire={allCommentaire}
          key={allCommentaire.id}
          post={post}
          isAdmin={isAdmin}
          userId={userId}
          fetchAllComments={fetchAllComments}
           />
        )) : ''}
      </div>
    );
};

export default Comments;
