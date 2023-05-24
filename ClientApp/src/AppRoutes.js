import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { AddMeal } from "./components/AddMeal";
import { Home } from "./components/Home";


const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
    {
        path: '/add-meal',
        element: <AddMeal />
    }
];

export default AppRoutes;
