import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// LAYOUTS //
import LoginLayout from './layouts/LoginLayout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
