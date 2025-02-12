import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useComments } from '../context/CommentContext';

const style = {
    appBar: {
        bgcolor: '#62748e',
    },
    toolbar: {
        display: "flex",
        justifyContent: 'space-between',
    },
    typografy: {
        color: "black",
        textTransform: "capitalize",
    },
}

export default function Header() {
    const { resetComments, comments } = useComments()

    return (
        <AppBar position="sticky" sx={style.appBar}>
            <Toolbar sx={style.toolbar}>
                <Typography variant="h6" component="div" sx={style.typografy}>
                    comment nested
                </Typography>
                <Button variant="contained" color='error' startIcon={<DeleteIcon />} onClick={resetComments} disabled={comments.length > 0 ? false : true}>
                    reset app
                </Button>
            </Toolbar>
        </AppBar>
    );
}