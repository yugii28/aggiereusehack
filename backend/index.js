import express from "express"
import mysql2 from "mysql2"
import cors from 'cors'
import dotenv from 'dotenv';
import {DateTime} from 'luxon'

const app = express()
dotenv.config()
const connection = mysql2.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')
connection.connect()

//allows you to send any json file using a client
app.use(express.json())

//normally, the backend server prevents other applications from using the backend api. cors prevents this- npm install cors in backend folder
app.use(cors())


//how to reach the backend server- if u do node index.js and go to localhost:8800, u will see hello this is the backend printed
app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

//fetching data using node from sql- node fetches information from sql and puts it in localhost:8800/books for react to use later
// if u do node index.js and go to localhost:8800/books you will see all the books from the sql database

app.get("/foottraffic", (req, res) => {
    const q = "SELECT * FROM foottraffic"
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/checkin", (req, res) => {
    const q = "SELECT * FROM checkin"
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/checkout", (req, res) => {
    const q = "SELECT * FROM checkout"
    connection.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//creating new data using node- you can only test this using postman, which allows you to make api requests
//in other words, writing the data to the database
app.post("/foottraffic", (req, res) => {
    const currentDate = DateTime.now();
    const date = currentDate.day;
    const hour = currentDate.hour;
    const minutes = currentDate.minute;
    const day = currentDate.weekday;
    // const day = currentDate.day
    // const hour = currentDate.hour;
    // const minutes = currentDate.getMinutes();

    // const date = currentDate.getDate(); //20,21 etc
    const month = currentDate.month; //starts from 0 so add 1
    const year = currentDate.year;
    const fullDate = `${year}-${month}-${date}`;

    const q = "INSERT INTO foottraffic (`day`, `hour`, `date`, `minutes`) VALUES (?)";
    const values = [
        day,
        hour,
        fullDate,
        minutes
    ]
    //you pass the query and the values, and it returns either an err or data
    connection.query(q, [values], (err, data) => {
        if (err){
            console.log("bruh", err)
            res.json(err)
            res.status(500).json({ error: "Internal server error" }); // Respond with a 500 status and an error message
        }
        // if the book is created successfully, sql returns that back
        return res.json("foot traffic has been created successfully");
    })
})

app.get("/foottraffic/getalldays", (req, res) => {
    const q = "SELECT COUNT(day),day FROM foottraffic GROUP BY day"
    connection.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/foottraffic/getallhours", (req, res) => {
    const q = "SELECT COUNT(hour),hour FROM foottraffic GROUP BY hour"
    connection.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/foottraffic/getallweeks", (req, res) => {
    const q = "SELECT COUNT(hour),hour FROM foottraffic GROUP BY hour"
    connection.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        console.log(res.json(data))
        // return res.json(data)
    })
})

app.post("/checkin", (req, res) => {
    const currentDate = new Date();
    const day = currentDate.getDay()
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const date = currentDate.getDate(); //20,21 etc
    const month = currentDate.getMonth() + 1; //starts from 0 so add 1
    const year = currentDate.getFullYear();
    const fullDate = `${year}-${month}-${date}`;
    console.log(minutes)
    const q = "INSERT INTO checkin (`day`, `hour`, `category`, `date`, `minutes`) VALUES (?)";
    const values = [
        day,
        hour,
        req.body.t,
        fullDate,
        minutes
    ]
    //you pass the query and the values, and it returns either an err or data
    connection.query(q, [values], (err, data) => {
        if (err){
            // console.log(err)
            return res.json(err)
        }
        // if the book is created successfully, sql returns that back
        return res.json("check in has been created successfully");
    })
})

app.post("/checkout", (req, res) => {
    const currentDate = new Date();
    const day = currentDate.getDay()
    const hour = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const date = currentDate.getDate(); //20,21 etc
    const month = currentDate.getMonth() + 1; //starts from 0 so add 1
    const year = currentDate.getFullYear();
    const fullDate = `${year}-${month}-${date}`;
    console.log(minutes)
    const q = "INSERT INTO checkout (`day`, `hour`, `category`, `date`, `minutes`) VALUES (?)";
    const values = [
        day,
        hour,
        req.body.t,
        fullDate,
        minutes
    ]
    //you pass the query and the values, and it returns either an err or data
    connection.query(q, [values], (err, data) => {
        if (err){
            console.log(err)
            return res.json(err)
        }
        // if the book is created successfully, sql returns that back
        return res.json("check out has been created successfully");
    })
})


app.delete("/deletecheckin/:id", (req, res) => {
    const itemId = req.params.id;
    // connection.query("DELETE FROM checkin WHERE id = ?", itemId, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    // })
})

app.delete("/deletecheckout/:id", (req, res) => {
    const itemId = req.params.id;
    connection.query("DELETE FROM checkout WHERE id = ?", itemId, (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//delete the last record from the checkin table aka the last item that was added
app.delete("/undo/checkin", (req, res) => {
    connection.query("DELETE FROM checkin ORDER BY id DESC LIMIT 1", (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

//delete the last record from the checkout table aka the last item that was added
app.delete("/undo/checkout", (req, res) => {
    connection.query("DELETE FROM checkout ORDER BY id DESC LIMIT 1", (err, result) => {
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    console.log(bookId);
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price, 
    ]
    connection.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        // if the book is created successfully, sql returns that back
        return res.json("Book has been updated successfully");
    })
})

//idk
app.listen(8800, ()=> {
    console.log("Connected to backend")
})

app.get("/checkout/getallcategories", (req, res) => {
    const q = "SELECT COUNT(category),category FROM checkout GROUP BY category"
    connection.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/checkin/getallcategories", (req, res) => {
    const q = "SELECT COUNT(category),category FROM checkin GROUP BY category"
    connection.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})