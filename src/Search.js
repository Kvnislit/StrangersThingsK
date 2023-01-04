import React, { useState } from 'react';

function Search({ posts, setPosts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  function postMatches(posts, text) {
    // return true if any of the fields you want to check against include the text
    return Object.values(posts).some(value => value.toString().toLowerCase().includes(text));
  }

  const filteredPosts = posts.filter(post => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <div className='search'>
      <label className='label'>
        Search:
        <input
          className='search-input'
          type="text"
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={() => setIsDropdownVisible(false)}
        />
      </label>
      {isDropdownVisible && (
        <div className='search-dropdown'>
          {postsToDisplay.map(post => (
            <div className='search-result' key={post.id}>
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;