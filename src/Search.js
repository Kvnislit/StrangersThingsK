import React, {useState , useEffect} from 'react';


const Search = (props) => {
  const fetchPosts = props.fetchPosts;
 // const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetchPosts()
  }, []);

  return <form id="search" onSubmit={async (event) => {
    // write code here
  }}>
   <fieldset className='fieldset'>
        <label htmlFor="keywords">Search Posts</label>
        <input 
          id="keywords" 
          type="text" 
          placeholder="enter keywords..."
          value = {posts} 
           onChange = {(ev) => setPosts(ev.target.value)}></input>
      </fieldset>
      <button>SEARCH</button>
    </form>
  }
// const filteredPosts = posts.filter(post => search(post, searchTerm));
// const postsToDisplay = searchTerm.length ? filteredPosts : posts;

// then, in our jsx below... map over postsToDisplay instead of posts
 export default Search;