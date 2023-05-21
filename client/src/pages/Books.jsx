import React, { useEffect } from 'react'
import axios from 'axios'
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

{/* how to fetch data from sql server in react */}

const Books = () => {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])

    // so basically node fetches all information from sql and puts it in localhost:8800/books,
    // and then react takes all the information from localhost:8800/books and puts it on the homepage
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/books")
                // console.log(res);
                setBooks(res.data)
            }
            catch(err){
                // console.log(err)
            }
        }
    fetchAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }

    const [book, setBook] = useState({
        title : "charles",
        desc: "darwin",
        price: 2,
    });

    const addFootTraffic = async e => {
        try{
            await axios.post("http://localhost:8800/foottraffic", book)
        }catch(err){
           console.log(err);
        }
    }
  return (
    <div>
        <h1>Here is a list of all books you have added!</h1>
        <div className='books'>
            {/* when using map, you should give each book a unique id */}
            {books.map(book => (
                <div className = 'book text' key = {book.id}>
                    <h2 className = "text">Title: {book.title}</h2>
                    <h2 className = "text">Description: {book.desc}</h2>
                    <h2 className = "text">Price: {book.price}</h2>
                    <button className="delete" onClick = {() => handleDelete(book.id)}>Delete</button>
                    {/* <button className="update"><Link to = {`/update/${book.id}`}>Update</Link></button> */}

                </div>
            ))}
        </div>
        <br></br>
        <br></br>
        <button className='add'>
            <Link to = "/add">
                <h3>Add new book</h3>
            </Link>
        </button>
        <button onClick = {() => addFootTraffic()}>Foot traffic</button>
        <button>
            <Link to = "/checkin">
                <h3>Check in</h3>
            </Link>        
        </button>
        <button>Check Out</button>
    </div>
  )
}

export default Books