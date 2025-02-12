import { useState } from 'react';
import { Comment, useComments } from '../context/CommentContext';
import Button from '@mui/material/Button';
import { Box, Stack, TextField } from '@mui/material';

interface PropsType {
    isEditing: boolean , 
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    comment: Comment,
}

export default function EditForm({isEditing, setIsEditing ,comment}: PropsType) {
      const [editedText, setEditedText] = useState<string>(comment.content.text);
      const {editComment} = useComments()

      const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setEditedText(value)
      }

      const handleSave = () => {
        editComment(comment.id, editedText);
        setIsEditing(false);
      }
    

    return (
        <Box component={'form'} onSubmit={handleSave}>
            <TextField sx={{ width: '100%' }} variant="outlined" onChange={handleTextChange} autoFocus={isEditing} value={editedText} required />
            <Stack direction={'row'} gap="1rem" sx={{ marginTop: '1rem', textTransform: 'capitalize' }}>
                <Button variant='contained' size="small" color="error" onClick={() => setIsEditing(false)}>cancel</Button>
                <Button variant='contained' size='small' color="success" type="submit">save</Button>
            </Stack>
        </Box>
    )
}
