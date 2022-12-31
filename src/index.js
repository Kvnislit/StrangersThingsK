import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link} from 'react-router-dom';
import Login from './Login';
import Posts from './Posts';
import Register from './Register';
import Update from './Update';



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
};

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
        <h1>Strangers Things</h1>
        <nav>
        <Link to='/posts'>Posts ({posts.length})</Link>
        <Link to='/login'>Login  ({login})</Link>
        <Link to='/register'>Register</Link>
        <Link to='/home'>Home</Link>
       </nav>     
        {user._id ? ( 
          <div>
          Welcome {user.username} <button onClick={logout}>Logout</button>
          </div> ) : null }
        {!user._id ? ( 
          <div>
          <Register />
          <Login exchangeTokenForUser ={exchangeTokenForUser}/> 
          </div>) : null
        }
       <Posts posts ={posts} token={token} setPosts={setPosts} />
       
      </div>
  );
};
const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);