import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { Login } from './login/login';
import { InistitutionHome } from './institution/institute-home/inistituteHome';
import { Home } from './home/home';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="about">About Us</Link>


        <Link to="login">login</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
  {
    path:"login",
    element:<Login />,
    
  }, 
  {
    path:"home",
    element:<Home />,
    
  },
  {
    path:"institute/Home",
    element:<InistitutionHome />,
  }
]);

function App() {
  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;
