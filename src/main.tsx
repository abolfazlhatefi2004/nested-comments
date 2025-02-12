import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CommentProvider } from './context/CommentContext.tsx';
import { ModalProvider } from './context/ModalContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CommentProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </CommentProvider>
  </React.StrictMode>,
)
