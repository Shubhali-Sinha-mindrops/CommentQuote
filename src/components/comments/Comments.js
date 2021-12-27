import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from '../comments/CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { quoteId } = params;
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])     //Since, this method is sent to the NewCommentForm through a prop.It is a callback fx.n so, it will not recreated every time when the component re-evaluated.And, it is important.

  let comments;

  if (status === 'pending') {
    comments =
      <div className='centered'>
        <LoadingSpinner />
      </div>
  }

  if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
    comments =
      <CommentsList comments={loadedComments} />
  }

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments =
      <p className='centered'>No comments were added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm 
        quoteId={quoteId} 
        onAddedComment={addedCommentHandler}  //this should be a callback fx.n because everytime it will be recreated when it is called.
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
