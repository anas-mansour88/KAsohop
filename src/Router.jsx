
import { createBrowserRouter } from 'react-router-dom';
import Mainlayout from './layout/Mainlayout';
import Home from './Page/Home';
import Caret from "./Page/Caret";

import Login from './Page/Login';
import Register from './Page/Register';
import Productsbycategoryid from './Page/Products/Productsbycategoryid';
import Productsditale from './Page/Products/Productsditale';
import Catigorespages from './Page/Catigorespages/Catigorespages';
import ProtectedRoute from './protectedrouter'
import Checkout from './Page/Checkout/Checkout'
import Profile from './Page/profile/Profile'
import Profileordar from './Page/profile/Profileordar';

import Profileinfo from './Page/profile/Profileinfo';

export default function router(toggleMode, currentMode) {

  return createBrowserRouter([
    {
      path: '/',
      element: <Mainlayout toggleMode={toggleMode} currentMode={currentMode} />,
      children: [

        { index: true, element: <Home /> },

        { 
          path: '/caret', 
          element: (
            <ProtectedRoute>
              <Caret />
            </ProtectedRoute>
          )
        },
        { path: '/category/:id', element: <Productsbycategoryid /> },

        { path: '/Product/:id', element: <Productsditale /> },

        { 
          path: '/Checkout', 
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          )
        },

        { path: '/login', element: <Login /> },

        { path: '/Catigores', element: <Catigorespages /> },

        {
          path: '/profile',
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Profileinfo />
            },
            {
              path: 'order',
              element: <Profileordar />
            }
          ]
        },

        { path: '/register', element: <Register /> },

      ],
    },
  ]);

}

