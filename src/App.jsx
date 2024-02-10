import LeftBar from './components/leftbar/LeftBar';
import NavBar from './components/navbar/NavBar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import Profile from './pages/profile/Profile';
import Home from './pages/home/Home';
import RightBar from './components/rightbar/RightBar';
import './styles.scss';
import { useContext } from 'react';
import {DarkModeContext} from './context/darkModeContext'
import { AuthContext } from './context/authContext';



function App() {

  const {currentUser} = useContext(AuthContext)

  const {darkMode} = useContext(DarkModeContext)
  console.log(darkMode)

  const Layout = ()=>{
    return(
      <div className={`theme-${darkMode? "dark" : "light"}`}>
        <NavBar />
        <div style={{display: "flex"}}>
          <LeftBar />
          <div style={{flex: 6}}>
          <Outlet />
          </div>
          <RightBar/>
        </div>

      </div>
    )
  }

  const ProtectedRoute = ({children})=>{
    if (!currentUser){
      return <Navigate to="/login" />
      
    }
    else{
      return children
    }
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element:(
        <ProtectedRoute children={<Layout />}/>
        ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
