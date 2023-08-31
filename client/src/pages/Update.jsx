import axios from 'axios'
import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
//how to send data from react to sql server
//basically, how to allow the user to creat their own data on the frontend and then store it in the backend sql database

const Update = () => {
    //book will become a json object
    const [book, setBook] = useState({
        title : "",
        desc: "",
        price: null,
    });

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2];
    //this function makes it so that the book is updated after every key that the user enters in the input tag
    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    //what happens after the user clicks "submit book"- data is sent to the backend sql server from the frontend
    const handleClick = async e => {
        //when the user clicks "add", the page will be refreshed automatically- this prevents that
        e.preventDefault();
        try {            
            //sending the json object "book"
            //when you do this, it automatically goes to the app.post function in index.js because if you comment that function this doesn't work
            // when you do this, it also updates the sql server, not only localhost
            await axios.put("http://localhost:8800/books/"+bookId, book)
            // console.log(book);
            //go to homepage once done
            navigate("/")
        }catch(err){
            //if there is an error, console.log it
            console.log(err)
        }
    }

    // console.log(book)
    return (
        // the "name" attribute of the input tag and the thing in the useState hook should be the same 
    <div className="form">
        <h1>Update the Book</h1>
        <input type="text" placeholder = "title" onChange={handleChange} name = "title" />
        <input type="text" placeholder = "desc" onChange={handleChange} name = "desc"/>
        <input type="number" placeholder = "price" onChange={handleChange} name = "price"/>
    
        {/* this button will send all the input fields to the backend server */}
        <button className='formButton' onClick = {handleClick}>Update</button>
    </div>
    )
}

export default Update