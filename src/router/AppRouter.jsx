import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "../routes/Error";
import Home from "../routes/Home";
import NotFound from "../routes/NotFound";
import SelectedCityRoute from "../routes/SelectedCityRoute";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <Error/>,
        children: [
            {index: true, element: <Home/>},
            {path: 'city', element: <SelectedCityRoute/>}
        ]
    },
    {path: '*', element: <NotFound/>}
])

export default function AppRouter() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}