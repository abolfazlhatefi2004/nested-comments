import { ReactElement, useState } from 'react';
import CardMui from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Stack } from '@mui/material';
import { Comment, useComments } from '../context/CommentContext';
import { useModal } from '../context/ModalContext';
import EditForm from './EditForm';

interface PropsTyps {
  comment: Comment,
  width: number
}

export default function card({ comment, width }: PropsTyps) {
  const { handleOpen } = useModal()
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { handleIDs, deleteComment } = useComments();


  const handleReply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const btn = e.currentTarget as HTMLButtonElement;
    handleOpen();
    const postId = btn.dataset.postid || '';
    const parentId = btn.dataset.parentid || btn.id;
    handleIDs('postId', postId);
    handleIDs('parentId', parentId);
  };

  const CardBody: ReactElement =  isEditing ? <EditForm isEditing={isEditing} setIsEditing={setIsEditing} comment={comment} />
    : <>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{comment.content.text}</Typography>
      <Stack direction={'row'} gap="1rem" sx={{ marginTop: '1rem', textTransform: 'capitalize' }}>
        <Button
          variant="contained"
          id={comment.id}
          data-postid={comment.postId ? comment.postId : comment.id}
          data-parentid={comment.id}
          size="small"
          color="secondary"
          onClick={handleReply}
        >
          reply
        </Button>
        {comment.postId &&
          <>
            <Button variant='contained' size='small' color='info' onClick={() => setIsEditing(true)}>edit</Button>
            <Button variant='contained' size='small' color='error' onClick={() => deleteComment(comment.id)}>delete</Button>
          </>
        }

      </Stack>
    </>

  return (
    <CardMui sx={{ width: `${width}%`, boxShadow: 3, bgcolor: `${comment.postId ? 'white' : "#fdf4ff"}` }}>
      <CardContent sx={{ display: 'flex', gap: '1rem' }}>
        <Avatar
          src={comment.content.imgUrl}
          alt="profile image"
        />
        <Box
          component='div'
          sx={{ width: '100%' }}
        >
          <Typography gutterBottom variant="h5" component="h5">
            {comment.content.username}
          </Typography>
          {CardBody}
        </Box>
      </CardContent>
    </CardMui>
  );
}
