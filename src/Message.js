import React, {useState} from 'react'

const Message =({token, posts, setPosts, postId, setPostId}) => {

    const [content, setContent] =useState([]);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
       
        console.log('postId:', postId);
        const response = await fetch
        (`https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts/${postId}`,
         {
            method: 'PATCH',
            headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`     
            },
            body: JSON.stringify({
                message : {
                    content: content
                } 
            })
            });
                const data = await response.json();
                console.log('data:' , data);
            
        }
    return <>
        
    </>
 }
 export default Message;