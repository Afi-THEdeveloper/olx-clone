import React, {useContext, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import {AuthContext, FirebaseContext} from './store/Contexts'
import Post from './store/postContext'
import {onAuthStateChanged} from 'firebase/auth'
const Login = React.lazy(() => import('./Pages/Login'));

function App() {
  const {auth} =useContext(FirebaseContext)
  const {user,setUser}  = useContext(AuthContext)
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
        setUser(user)
    })
  })
  return (
    <div>
      <Router>
        <Post>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/login" element={<Suspense fallback={<div>Loading...</div>}><Login/></Suspense>} />
          <Route exact path="/create" Component={Create}/>
          <Route exact path="/Details" Component={ViewPost}/>
        </Routes>
        </Post>
      </Router>
    </div>
  );
}

export default App;
