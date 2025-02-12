import AddCommentIcon from '@mui/icons-material/AddComment';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import { useModal } from '../context/ModalContext';
import { useComments } from '../context/CommentContext';

const febStyle = {
    position: 'fixed',
    bottom: '3rem',
    right: '2rem',
    fontSize: '1.5rem'
}


export default function AddPostBtn() {
    const {handleOpen} = useModal()
    const {handleIDs} = useComments()

   const handleClick = () => {
    handleIDs('reset')
    handleOpen();
   }
    return (
        <Tooltip title="add post" placement="top-end">
            <Fab onClick={handleClick} color="primary" aria-label="adding" size="large" sx={febStyle}>
                <AddCommentIcon fontSize="inherit" />
            </Fab >
        </Tooltip>
    )
}
