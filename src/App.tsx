import React, { Fragment, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { RouterProvider } from "react-router-dom";
import { fetchNews } from './store/reducers/NewsSlice';
import router from './routes';

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
      dispatch(fetchNews())
  }, [dispatch])

  return (
      <Fragment>
        <RouterProvider router={router}/>
      </Fragment>
  );
}

export default App;