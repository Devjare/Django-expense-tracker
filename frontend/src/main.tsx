import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import './index.css'
import { CssBaseline } from '@mui/material';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/",
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
