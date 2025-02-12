import { Box } from '@mui/material';
import Header from './components/Header';
import Modal from './components/Modal';
import PostForm from './components/PostForm';
import AddPostBtn from './components/AddPostBtn';
import Container from './components/Container';

function App() {
  return (
    <Box sx={{ bgcolor: "#F3F4F6", minHeight: "100vh" }} position="relative">
      <Header />
      <Container />
      <Modal>
        <PostForm />
      </Modal>
      <AddPostBtn />
    </Box>
  )
}

export default App
