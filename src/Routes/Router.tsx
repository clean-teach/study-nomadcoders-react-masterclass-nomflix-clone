import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Tv from '../pages/Tv';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/movie/:movieId',
          element: <Home />,
        },
        {
          path: '/tv',
          element: <Tv />,
        },
        {
          path: '/tv/:tvId',
          element: <Tv />,
        },
        {
          path: '/search',
          element: <Search />,
        },
        {
          path: '/search/:searchId',
          element: <Search />,
        },
      ],
      errorElement: <div>에러발생</div>,
    },
  ],
  {
    basename: '/study-nomadcoders-react-masterclass-nomflix-clone',
  },
);

export default router;
