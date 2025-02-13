import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Thread from '../pages/Thread';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>
  },
  {
    path:`/:name`,
    element:<Thread/>
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
