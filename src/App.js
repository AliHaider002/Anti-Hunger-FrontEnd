import { createContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import FoodList from "./Pages/FoodList";
import Login from "./Components/Login/Login";
import Protected from "./Components/Protected";
import { SignUp } from "./Components/SignUp/SignUp";
import SocioHome from "./Components/Social_Components/SocioHome/SocioHome";
import AddProduct from "./Pages/AddProduct";
import Collection from "./Pages/Collection";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Cart from "./Pages/Cart";

export const contextCart = createContext();

function App() {
  const isAuth = localStorage.getItem('token');
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isAuth ? <Home /> : <Login />} />
        <Route path="/register" element={
          <>
            <SignUp />
          </>
        } />
        <Route path="/home" element={
          isAuth ? <Protected Component={Home} /> : <Login />} />
        <Route path="/collection" element={
          isAuth ? <Protected Component={Collection} /> : <Login />
        }
        />
        <Route path="/society" element={
          <>
            <SocioHome />
          </>
        }
        />
        <Route path="/addpost" element={isAuth ? <Protected Component={AddProduct} /> : <Login />} />
        <Route path="/humanFood/:id" element={isAuth ? <Protected Component={FoodList} /> : <Login />} />
        <Route path="/animalFood/:id" element={isAuth ? <Protected Component={FoodList} /> : <Login />} />
        <Route path="/compositeFood/:id" element={isAuth ? <Protected Component={FoodList} /> : <Login />} />
        <Route path="/profile" element={isAuth ? <Protected Component={Profile} /> : <Login />
        } />


        <Route path="/cart" element={isAuth ? <Protected Component={Cart} /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
