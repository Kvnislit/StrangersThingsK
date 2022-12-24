import React, {useEffect} from 'react'
import Create from './Create';

const Posts = (props)=> {
const token = props.token;
const posts = props.posts;
    return (
      <div>
        
       
        <h2>Posts</h2>
        <Create token={token}/>
        {posts.map((post) => {
          return (
        
            <div key={post._id}
              className={post.isAuthor ? 'singlePost': 'singlePost'}>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <p>Price: {post.price}</p>
              <p>Location: {post.location}</p>
              <p>Will Deliver{post.willDeliver}</p>
              {post.isAuthor ? <button>Edit</button>:null}
            </div>
          );
        })}
       </div>
    );
      }
  export default Posts;