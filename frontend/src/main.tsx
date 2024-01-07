import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import Header from './components/header.tsx'
import Footer from './components/footer.tsx'

import {
    BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from 'react-router-dom';

import App from './App.tsx'
import BooksPage from './pages/books-page.tsx'

// This type of router with "createBrowserRouter", does not allow to use the common "Header" and "Footer",
// Since it would need to be added to each element, wether in the definition of the router below or in each react component / page
// And is necesary to have every component that uses react-router-dom components (NavLink in Header for this case), because it needs
// the context passed only through a BrowserRouter component.
// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <div>
//         <Header />
//         <App />
//         <Footer />
//       </div>
//     )
//   },
//   {
//     path: "/books",
//     element: (
//       <div>
//         <Header />
//         <BooksPage />
//         <Footer />
//       </div>)
//   }
// ])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/books" element={<BooksPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>,
)
