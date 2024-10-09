
import "./App.css";
import { BrowserRouter, createBrowserRouter, RouterProvider} from 'react-router-dom'
import Nav from "./components/Nav";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Hotels from "./components/Hotels";
import About from "./components/About";
import Account from "./components/Account";

function App() {
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:<div>
                     <Nav/>
                     <Home/>
                </div>
      },
      {
        path:'/hotels',
        element:<div>
                     <Nav/>
                     <Hotels/>
                </div>
      },
      {
        path:'/about',
        element:<div>
                     <Nav/>
                     <About/>
                </div>
      },
      {
        path:'/account',
        element:<div>
                     <Nav/>
                     <Account/>
                </div>
      },
      {
        path:'*',
        element:<div>
                     <Nav/>
                     <NotFound/>
                </div>
      }

    ]
  )
  
  return (
    <>
    <div className="pt-3 ">
      <RouterProvider router ={router}></RouterProvider>
    
    </div>
    </>
  );
}

export default App;
