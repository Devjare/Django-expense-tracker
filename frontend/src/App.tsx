import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Header from './components/header.tsx'
import Footer from './components/footer.tsx'

import BooksPage from './pages/books-page'
import { Container, CssBaseline } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return ( 
    <Container sx={{ width: 1, height: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <Header sx={{ display: "flex", justifySelf: "flex-start" }}/>
      <BooksPage />
      <Footer />
    </Container>
  )
}

export default App
