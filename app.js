const express=require('express');
const mysql=require('mysql');
const bodyParser=require('body-parser');
const connection=require('./database');


connection.connect(function (err) {
    if (err) {
        throw err.stack;
    }else {
        console.log('connect database successfully')
    }
});

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.set('view engine','ejs');
app.set('views','./views')

app.get('/create', (req, res) => {
    res.render('create')
})

app.post('/create',(req, res)=>{
    const {name,price,status,author}=req.body;
    console.log(req.body);

    const sql='insert into books(name,price,status,author) values ?';
    const value=[
        [name,price,status,author]
    ];
    connection.query(sql,[value],(err,result)=>{
        if(err)throw err;
        res.status(301).redirect('/books')

    })
})

app.get("/books", (req, res) => {
    const sql = "SELECT * FROM books";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        res.render("read", {books: result});
    });
})

app.get('/books/:id/delete',(req, res)=>{
    const idBook=req.params.id;
    const sql='delete from books where id='+idBook;
    connection.query(sql,(err,result)=>{
        if(err)throw err;
        res.status(301).redirect('/books')
    })
})

app.get("/books/:id/update", (req, res) => {
    const idBook = req.params.id;
    const sql = "SELECT * FROM books WHERE id = " + idBook;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.render('update', {book: results[0]});
    });
})
app.post("/books/:id/update", (req, res) => {
    const idBook = req.params.id;
    const sql = `UPDATE books SET name = ?, price = ?, author = ?, status = ? WHERE id = ?`;
    const { name, price, status, author } = req.body;
    const value = [name, price, author, status, idBook];
    connection.query(sql, value, (err, results) => {
        if (err) throw err;
        res.redirect('/books');
    });
})

app.listen(port,()=>{
    console.log('Server is running at localhost'+port)
})
