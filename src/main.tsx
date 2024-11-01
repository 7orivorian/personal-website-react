import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Landing from "./pages/Landing/Landing.tsx";
import "./stylesheets/index.scss";
import {Playground} from "./pages/Playground/Playground.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/playground",
        element: <Playground/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/test",
        element: <Landing/>,
        errorElement: <ErrorPage/>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);