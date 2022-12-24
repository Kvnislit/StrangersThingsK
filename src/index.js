import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './Login';
import Posts from './Posts';
import Register from './Register';
import Create from './Create';



const App = () =>{
  const [posts, setPosts] = useState([]);
  const [login, ] = useState([]);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
 
    const fetchPosts = () => {
      fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts',{
        headers: {
          'Content-Type': 'Application/json',
            Authorization: `Bearer ${token}`,
        },
        }
      )
      .then((response) => response.json())
      .then((result) => {
        setPosts(result.data.posts);
    })
        .catch(console.error);
    };

    const exchangeTokenForUser = () => {
    const token = window.localStorage.getItem('token');
    setToken(token);
    if(token){
     fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/users/me', {
     headers: {
   'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`,
   },
    })
  .then(response => response.json())
  .then(result => {
   const user = result.data;
   setUser(user);
 })
 .catch(err => console.log(err));
 }
  }

 useEffect (() => {
   exchangeTokenForUser();
   fetchPosts();
  },[token])

  
  const logout = () =>{
    window.localStorage.removeItem('token');
    setUser({});
  }

  return (
    <div>
      <div>
        <h1>Strangers Things</h1>
        <nav>
        <Link to='/posts'>Posts ({posts.length})</Link>
        <Link to='/login'>Login  ({login})</Link>
        <Link to='/register'>Register</Link>
        <Link to='/home'>Home</Link>
       </nav>
       <h1>Login</h1>       
      {
        user._id ? <div>Welcome {user.username} <button onClick={logout}>Logout</button></div> : null
      }
      {
        !user._id ? (

      <div>
        <Register />
        <Login exchangeTokenForUser ={exchangeTokenForUser}/>
      </div>) : null
      }

        <Routes>
        <Route path='/register' element={ <div>Register</div>}/>
        <Route path='/home' element={<h1>Home</h1>}/>
        <Route path='/posts' element={
          <Posts posts ={posts} token={token}/>
          
        }/>
          <Route path='/login' element={
          <h3>Login in page</h3>
        }/>
      </Routes> 
      </div>
      
    </div>
  );
}
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
