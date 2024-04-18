import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import App from './App.jsx'
import ErrorPage from './templates/ErrorPage.jsx'
import Lab1 from './templates/labs/Lab1'
import Lab2 from './templates/labs/Lab2'
import Lab4 from './templates/labs/Lab4'
import Lab5 from './templates/labs/Lab5'
import Lab6 from './templates/labs/Lab6'
import Lab8 from './templates/labs/Lab8'
import Main from './templates/pages/MainPage.jsx'
import AboutMe from './templates/pages/AboutMe.jsx'
import store from './store.js'
import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "about-me",
        element: <AboutMe />
      },
      {
        path: "lab/1",
        element: <Lab1 />,
      },
      {
        path: "lab/2",
        element: <Lab2 />,
      },
      {
        path: "lab/4",
        element: <Lab4 />,
      },
      {
        path: "lab/5",
        element: <Lab5 />,
      },
      {
        path: "lab/6",
        element: <Lab6 />,
      },
      {
        path: "lab/8",
        element: <Lab8 />,
      },
    ],
  },
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
)
