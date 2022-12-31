import React, {useState} from 'react'


 const Create = (props) => {
    const token = props.token;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
   
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        // console.log('title, description:', title, description)
        const response = await fetch('https://strangers-things.herokuapp.com/api/2209-ftb-et-web-am/posts', {
            method: "POST",
            headers: {
            'Content-Type': 'Application/json',
            'Authorization': `Bearer ${token}`     
            },
            body: JSON.stringify({
                post : {
                    title: title,
                    description: description,
                    price: price,
                    willDeliver: true,
                } 
            })
            });
                const data= await response.json();
                console.log('data:' , data)
            }
        
            return <>
               
                <h2>
                    Create a Post 
                </h2>  
                
                <form onSubmit={handleSubmit}>
                    <input 
                    type ="text" 
                    placeholder ="title" 
                    value = {title} 
                    onChange = {(ev) => setTitle(ev.target.value)}>
                    </input>
                    <input 
                    type="text" 
                    placeholder ="description" 
                    value={description} 
                    onChange={(ev) => setDescription(ev.target.value)}>
                    </input>
                    <input 
                    type ="text" 
                    placeholder ="price" 
                    value = {price} 
                    onChange = {(ev) => setPrice(ev.target.value)}>
                    </input>
                    <button 
                    type ="submit" 
                    className="btn btn-outline-primary">Submit</button>
                   
                </form>
             
                
        
            </>
        }
         
        export default Create;