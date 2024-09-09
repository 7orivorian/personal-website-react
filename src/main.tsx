import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

import './stylesheets/index.scss'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing/>,
        errorElement: <ErrorPage/>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)