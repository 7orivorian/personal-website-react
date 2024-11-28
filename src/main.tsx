import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./app/App.tsx";
import "./stylesheets/index.scss";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";

const router = createBrowserRouter([
    {
        path: '/*',
        element: <App/>,
        errorElement: <ErrorPage/>
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>
);