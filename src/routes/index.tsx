import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../modules/MainLayout";
import NewsItem from "../pages/NewsItem";
import NewsList from "../pages/NewsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <NewsList />
      },
      {
        path: ':id',
        element: <NewsItem />
      }
    ]
  }
]);

export default router