import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


// LAYOUTS //
import LoginLayout from './layouts/LoginLayout'
import ZiekenhuisLayout from './layouts/ZiekenhuisLayout'
import AmbulanceLayout from './layouts/AmbulanceLayout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
  },
  {
    path: "/ziekenhuis",
    element: <ZiekenhuisLayout />,
  },
  {
    path: "/ambulance",
    element: <AmbulanceLayout />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
