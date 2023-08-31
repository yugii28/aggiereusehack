import express from "express"
import mysql2 from "mysql2"
import cors from 'cors'
const app = express()


//learn  nodemon is


//connecting to mysql
const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "matsukaze1",
    database: "test"
})

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
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/checkin", (req, res) => {
    const q = "SELECT * FROM checkin"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/checkout", (req, res) => {
    const q = "SELECT * FROM checkout"
    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
})

//creating new data using node- you can only test this using postman, which allows you to make api requests
//in other words, writing the data to the database
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
    ]
    //you pass the query and the values, and it returns either an err or data
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        // if the book is created successfully, sql returns that back
        return res.json("Book has been created successfully");
    })
})


app.post("/foottraffic", (req, res) => {
    const currentDate = new Date();
    const day = currentDate.getDay()
    const hour = currentDate.getHours();

    const date = currentDate.getDate(); //20,21 etc
    const month = currentDate.getMonth() + 1; //starts from 0 so add 1
    const year = currentDate.getFullYear();
    const fullDate = `${year}-${month}-${date}`;

    const q = "INSERT INTO foottraffic (`day`, `hour`, `date`) VALUES (?)";
    const values = [
        day,
        hour,
        fullDate
    ]
    //you pass the query and the values, and it returns either an err or data
    db.query(q, [values], (err, data) => {
        if (err){
            console.log(err)
            res.json(err)
        }
        // if the book is created successfully, sql returns that back
        return res.json("foot traffic has been created successfully");
    })
})

app.get("/foottraffic/getalldays", (req, res) => {
    const q = "SELECT COUNT(day),day FROM foottraffic GROUP BY day"
    db.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/foottraffic/getallhours", (req, res) => {
    const q = "SELECT COUNT(hour),hour FROM foottraffic GROUP BY hour"
    db.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/foottraffic/getallweeks", (req, res) => {
    const q = "SELECT COUNT(hour),hour FROM foottraffic GROUP BY hour"
    db.query(q, (err, data) => {
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

    const date = currentDate.getDate(); //20,21 etc
    const month = currentDate.getMonth() + 1; //starts from 0 so add 1
    const year = currentDate.getFullYear();
    const fullDate = `${year}-${month}-${date}`;

    const q = "INSERT INTO checkin (`day`, `hour`, `category`, `date`) VALUES (?)";
    const values = [
        day,
        hour,
        req.body.t,
        fullDate
    ]
    //you pass the query and the values, and it returns either an err or data
    db.query(q, [values], (err, data) => {
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

    const date = currentDate.getDate(); //20,21 etc
    const month = currentDate.getMonth() + 1; //starts from 0 so add 1
    const year = currentDate.getFullYear();
    const fullDate = `${year}-${month}-${date}`;

    const q = "INSERT INTO checkout (`day`, `hour`, `category`, `date`) VALUES (?)";
    const values = [
        day,
        hour,
        req.body.t,
        fullDate
    ]
    //you pass the query and the values, and it returns either an err or data
    db.query(q, [values], (err, data) => {
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
    db.query("DELETE FROM checkin WHERE id = ?", itemId, (err, result) => {
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
    db.query(q, [...values, bookId], (err, data) => {
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
    db.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})

app.get("/checkin/getallcategories", (req, res) => {
    const q = "SELECT COUNT(category),category FROM checkin GROUP BY category"
    db.query(q, (err, data) => {
        if(err){
            console.log(err)
            return res.json(err)
        }
        return res.json(data)
    })
})