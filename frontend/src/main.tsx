import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Header from './components/header.tsx'
import Footer from './components/footer.tsx'

import {
    BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import BooksPage from './pages/books-page.tsx'
import UploadBookPage from './pages/upload-books.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<BooksPage />}/>
        <Route path="/books" element={<BooksPage />}/>
        <Route path="/batch-upload-books" element={<UploadBookPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
