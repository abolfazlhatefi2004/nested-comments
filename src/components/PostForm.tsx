import { useReducer } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import ImgUploader from './ImgUploader';
import { Content, useComments } from '../context/CommentContext';
import defaultImage from '../assets/defaultImage.jfif';
import { useModal } from '../context/ModalContext';

// style
const formStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem"

};


// types
interface StateType {
    username: string;
    imgUrl: string;
    comment: string;
}

type ActionType = { type: 'UPDATE_FIELD'; field: string; value: string } | { type: 'RESET_FORM' };


// set reducer
const initialState: StateType = {
    username: '',
    imgUrl: '',
    comment: ''
}

function formReducer(state: StateType, action: ActionType) {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return {
                ...state,
                [action.field]: action.value,
            };
        case 'RESET_FORM':
            return initialState;
        default:
            return state;
    }
}

export default function PostForm() {
    const { handleClose } = useModal();
    const { addPostAndComment, IDs } = useComments();
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, files } = e.target;

        const newValue = type === 'file' && files?.length ? URL.createObjectURL(files[0]) : value;

        dispatch({ type: 'UPDATE_FIELD', field: name, value: newValue });
    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newContent: Content = {
            username: state.username,
            text: state.comment,
            imgUrl: state.imgUrl || defaultImage
        };

        addPostAndComment(newContent, IDs.postId, IDs.parentId);
        dispatch({ type: 'RESET_FORM' });
        handleClose();
    };

    return (
        <Box
            component='form'
            sx={formStyle}
            onSubmit={handleSubmit}
        >
            <Typography variant="h6" gutterBottom>
                leave a {IDs.postId ? 'comment' : 'post'}
            </Typography>
            <ImgUploader imgUrl={state.imgUrl} getImageUrl={handleInputChange} />
            <TextField sx={{ width: "100%" }} label="username" variant="outlined" name='username' onChange={handleInputChange} value={state.username} required />
            <TextField sx={{ width: "100%" }} label="comment" variant="outlined" name='comment' onChange={handleInputChange} value={state.comment} required />
            <Button variant="contained" type='submit'> create </Button>
        </Box>
    )
}