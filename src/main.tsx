import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Landing from "./pages/Landing.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Test from "./pages/Test/Test.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing/>,
        errorElement: <ErrorPage/>,
    },
    {
        path: "/test",
        element: <Test/>,
        errorElement: <ErrorPage/>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
)