const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cors({
origin: ["http://localhost:3000"],
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
const { query } = require('express');
//const { hash } = require('bcryptjs');
//const { hash } = require('bcryptjs');
const saltRounds = 10;

const db = mysql.createConnection({
host:"localhost",
user: "root",
password: "",
database: "projekt",
multipleStatements: true
});

//wyswietlenie wszystkich aktualnosci
 app.get('/aktualnosci', (req, res) =>{
     db.query('select * from news', (err, result, fields) => {
         if (err){
             res.send("Błąd!");
         }   
     res.send(result);
     
     })
 });

//wyswietlenie wszystkich orlikow
app.get("/orliki",(req,res)=>{
    db.query("select * from orlik", (err,result, fields)=>{
        if(err){
            res.send("Błąd!")
        }
        res.send(result);
    })
});

//wyświetlanie orlików z przynajmniej jedna rezerwacja bez przypisanych userow
app.get("/wolneorliki/:orlik_id",(req,res)=>{
    const id = req.params.orlik_id;
    db.query("SELECT * FROM orlik o inner join reservation r on o.orlik_id=r.orlik_id where r.user_id is null and o.orlik_id=?",
    id, (err,result, fields)=>{
        if(err){
            res.send("Błąd!");
            console.log(err);
            res.send(result);
        }
        res.send(result);
    })
});

//wyswietlanie wszystkich rezerwacji poprzez dane orlik_id
app.get("/rezerwacjeorlik/:orlik_id",(req,res)=>{
    const id = req.params.orlik_id;
    db.query("SELECT * FROM reservation where orlik_id=?;",
    id, (err,result, fields)=>{
        if(err){
            res.send("Błąd!");
            console.log(err);
        }
        res.send(result);
    })
});

//wyswietlanie wszystkich rezerwacji z danym user_id
app.get("/rezerwacjeuser/:user_id",(req,res)=>{
    const id = req.params.user_id;
    db.query("SELECT * FROM reservation r inner join orlik o on r.orlik_id=o.orlik_id where r.orlik_id=?;",
    id, (err,result, fields)=>{
        if(err){
            res.send("Błąd!");
            console.log(err);
        }
        res.send(result);
    })
});

//rezerwowanie 
app.put("/rezerwacja/:reservation_id/:user_id", (req,res)=>{
    const resid = req.params.reservation_id;
    const id = req.params.user_id;

    db.query("update reservation set user_id=? where user_id is null and reservation_id=?",
    [id,resid],(err,result)=>{
        console.log(result)
        if(err){
            res.send("Błąd");
            console.log(err);
        }
        res.send(result)
    })
})

//wyswietlenie wszystkich meczy
app.get("/mecze",(req,res)=>{
    db.query("SELECT * FROM game g inner join reservation r on g.reservation_id=r.reservation_id;", 
    (err,result, fields)=>{
        if(err){
            res.send("Błąd!")
        }
        res.send(result);
    })
});

//zapisanie sie na gre
app.put("/zapisanienagre/:user_id/:game_id/:reservation_id", (req,res)=>{
    const userid = req.params.user_id;
    const gameid = req.params.game_id;
    const resid = req.params.reservation_id;

    db.query(`
    update game set reservation_id=?,players=players+1,date=current_date() 
    where game_id=?;
    insert into players
    values (?,?)
    `,
    [resid,gameid,userid,gameid],(err,result)=>{
        if(err){
            console.log(err)
            res.send("Błąd");
            console.log(err);
        }
        res.send(result)
    })
})

//wypisanie sie z gry
app.delete("/wypisaniezgry/:user_id/:game_id/:reservation_id", (req,res)=>{
    const userid = req.params.user_id;
    const gameid = req.params.game_id;
    const resid = req.params.reservation_id;

    db.query(`
    update game set reservation_id=?,players=players-1,date=current_date() 
    where game_id=?;
    delete from players where user_id=? and game_id=?
    `,
    [resid,gameid,userid,gameid],(err,result)=>{
        if(err){
            console.log(err)
            res.send("Błąd");
            console.log(err);
        }
        res.send(result)
    })
})

//wyswietlenie wszystkich uzytkownikow ze wszystkimi rezerwacjami
app.get("/uzytkownicy",(req,res)=>{
    db.query("SELECT * FROM user u inner join reservation r on u.user_id=r.user_id;", 
    (err,result, fields)=>{
        if(err){
            res.send("Błąd!")
        }
        res.send(result);
    })
});

//wyswietlenie konkretnego uzytkownika ze wszystkimi jego rezerwacjami
app.get("/uzytkownicy/:user_id",(req,res)=>{
    const id = req.params.user_id;
    db.query("SELECT * FROM user u inner join reservation r on u.user_id=r.user_id where r.user_id=?;",
    id, (err,result, fields)=>{
        if(err){
            res.send("Błąd!");
            console.log(err);
        }
        res.send(result);
    })
});

//rejestracja użytkownika

app.post("/rejestracja", (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    console.log(req.body)
    bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log(hash);
       if (err) {
         console.log(err);
       }
    const sqlRejestracja = "Insert into user(email,password,name,surname,phone) values (?,?,?,?,?)"
    db.query(sqlRejestracja,[email, hash,name,surname,phone],(err,result)=>{
        if(err){
            console.log(err);
            res.send({message:"Użytkownik błąd"});
        }

        res.send(result);
    }
   )
})
})

app.post('/login', (req,res)=>{
   
    const email =req.body.email;
    const password =req.body.password;
    
     db.query(
         "SELECT * FROM user WHERE email =?",
         [email],
         (err,result)=> {
             if(err)
            {
               res.send({ err: err});
             } 
             

             if(result.length >0){
                bcrypt.compare(password, result[0].password, (error, response) => {

                if (response) {
                    req.session.user= result;
                    console.log(req.session.user);
                    res.send(result);
                  } else {
                    res.send({ message: "Zły login lub hasło" });
                  }
                });
              } else {
                
                res.send({ message: "Użytkownik nie istnieje" });
              }
            }
          );
        });



            
            
app.post('/zmianahasla', (req,res)=>{
   
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body)
     bcrypt.hash(password, saltRounds, (err, hash) => {
        console.log(hash);
      if (err) {
        console.log(err);
      }
     db.query(
      "UPDATE user SET password =? WHERE email =?",[hash,email],
         (err,result)=> {
          if(err)
          {res.send(result);
              
          }else{
            res.send({ message: "Hasło zostało zapisane!" });
            console.log(result);
          }
   }
   );
  });
});        

//zmiana numeru telefonu
app.put("/zmiananumeru",(req,res)=>{
    const email = req.body.email;
    const phone = req.body.phone;
    db.query(
        "update user set phone=? where email=?",[phone,email],(err,result)=>{
            if(err){
                res.send(result);
            }
            else {
                res.send({message:"Numer telefonu został zmieniony!"})
            }
        }
    )
})
    


app.get("/zalogowanie",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.user})
    }
    else {
        res.send({loggedIn: false})
    }
});

app.get("/wylogowanie",(req,res)=>{
    res.send({loggedIn: false});
    req.session.destroy();
});

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
});

app.get("/informacjeorlik/:idOrlik",(req,res)=>{
    const id = req.params.idOrlik;
    db.query("select * from orlik where idOrlik like ?",[id], (err,result, fields)=>{
        if(err){
            res.send({err:err})
        }
        res.send(result);
    })
});
//do przemyślenia jeszcze jak to rozwiązać
app.get("/rezerwacja",(req,res)=>{
    const id = req.params.idOrlik;
    db.query("select * from orlik where idOrlik like ?",[id], (err,result, fields)=>{
        if(err){
            res.send({err:err})
        }
        res.send(result);
    })
});

app.listen(3001,() => {
    console.log("jestem na porcie 3001");
});