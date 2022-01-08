const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST","DELETE","UPDATE"],
    credentials: true,
  }));
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "userId",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24,
      },
    })
  );


  
const bcrypt = require("bcrypt");
const saltRounds = 10;

const db = mysql.createConnection({
host:"localhost",
user: "root",
password: "admin",
database: "projekt",
});

 app.get('/aktualnosci', (req, res) =>{
     db.query('select * from aktualności', (err, result, fields) => {
         if (err){
             res.send("Błąd!");
         }   
     res.send(result);
     
     })
 });


// app.get("/", (req, res)=>{
// const sqlInsert = "INSERT INTO aktualności(idAktualności,Treść) VALUES (?,?)"
//  db.query(sqlInsert,['5', 'tresc jakas nowa'], (err, res)=>{
//         if(err){
//              return console.log(err);
//          }
//          return console.log(err);
//      })
    
//  })

//  app.post("/rejestracjatest",(req,res)=>{
//      db.query("Insert into użytkownik(Login,Hash_haslo) values (?,?)",['login3','haslo1'],(err,res)=>{
//          if(err){
//              return console.log(err);
//          }
//          return console.log(err);
//      })
//  })

app.get("/orliki",(req,res)=>{
    db.query("select * from orlik", (err,result, fields)=>{
        if(err){
            res.send("Błąd!")
        }
        res.send(result);
    })
})

app.get("/szukajpoadresie/:Adres",(req,res)=>{
    const adres = req.params.Adres;
    db.query("select * from orlik where Adres like ?",['%'+adres+'%'], (err,result, fields)=>{
        if(err){
            res.send({err:err})
        }
        res.send(result);
    })
})

 app.post("/rejestracja", (req,res)=>{
     const login = req.body.Login;
     const haslo = req.body.Hash_haslo;

     bcrypt.hash(haslo, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }
    

     const sqlRejestracja = "Insert into użytkownik(Login, Hash_haslo) values (?,?)"
     db.query(sqlRejestracja,[login, hash],(err,result)=>{
         if(err){
             res.send({message:"Taki użytkownik już istnieje"})
         }
         res.send(result);
     }
    )
})
 })

app.post("/login",(req,res)=>{
    const login = req.body.Login;
    const haslo = req.body.Hash_haslo;

    db.query(
        "select * from użytkownik where Login=?",[login,haslo],(err,result)=>{
            if(err){
                res.send({err:err});
            }

            if(result.length > 0){
                bcrypt.compare(haslo, result[0].haslo,(error,response)=>{
                    if(response){
                        res.send(result)
                    }
                    else{
                        res.send({message: "Zły login lub hasło"})
                    }
                })
            }
            else {
                res.send({message: "Dany użytkownik nie istnieje"})
            }
        }
    )

})

app.get("/zalogowanie",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user:req.session.user})
    }
    else {
        res.send({loggedIn:false})
    }
})

app.get("/wylogowanie",(req,res)=>{
    res.send({loggedIn: false});
    req.session.destroy();
})

app.put("/uzupelnienieprofilu/:Login",(req,res)=>{
    const login = req.params.Login;
    const imie = req.body.Imie;
    const nazwisko = req.body.Nazwisko;
    const zdjecie = req.body.Zdjecie;
    const opis = req.body.Opis;
    const reputacja = req.body.Reputacja;
    const email = req.body.Email;
    const telefon = req.body.Telefon;
    
    //const uzupelnienieprofilu = "Insert into użytkownik(Imie, Nazwisko, Zdjecie, Opis, Reputacja, Email, Telefon) values ($1,$2,$3,$4,$5,$6,$7) where Login=$8"
    const uzupelnienieprofilu = "update użytkownik set Imie=? and Nazwisko=? and Zdjecie=? and Opis=? and Reputacja=? and Email=? and Telefon=? where Login=?"
    db.query(uzupelnienieprofilu,[imie,nazwisko,zdjecie,opis,reputacja,email,telefon,login],(err,result)=>{
        if(err){
            res.send({err:err})
        }
        res.send(result);
    })
})

app.listen(3001,() => {
    console.log("jestem na porcie 3001");
});