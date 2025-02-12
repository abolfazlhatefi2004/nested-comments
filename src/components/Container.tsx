import { Container as ContainerMui } from '@mui/material';
import Cart from './Card';
import { useComments, Comment } from '../context/CommentContext';
import React, { ReactElement } from 'react';

const style = {
  p: '1.5rem',
  display: 'flex',
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  gap: '1rem'
}


export default function Container() {
  const { comments } = useComments();

  const generateCards = (commentList: Comment[]): ReactElement => {
    const cartWidth: number = 100;

    return PrintCard(commentList, cartWidth)

  }

  function PrintCard (commentList: Comment[], cartWidth: number): ReactElement {
    return (<>
      {commentList.map(comment => {
        return (
          <React.Fragment key={comment.id}>
            <Cart
              comment={comment}
              width={cartWidth}
            />
            {(comment.replies && comment.replies.length > 0) && PrintCard(comment.replies, Math.max(cartWidth - 3, 40))}
          </React.Fragment>
        )
      })}
    </>
    )
  }


  return (
    <ContainerMui sx={style} maxWidth="md">
      {generateCards(comments)}
    </ContainerMui>
  )
}
