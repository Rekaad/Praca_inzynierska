const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(cors({
origin: ["http://localhost:3000"],
methods: ["GET", "POST","DELETE","UPDATE","PUT"],
credentials: true,
}));
app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
      key: "user_id",
      secret: "subscribe",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24 * 1000,
      },
    })
  );


  
const bcrypt = require("bcrypt");
const { query } = require('express');
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
     db.query('select * from news order by news_id desc limit 2', (err, result, fields) => {
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
    db.query(`
    SELECT r.reservation_id, r.day,r.start_hour,r.end_hour,r.user_id,r.orlik_id,o.adress,o.school
		,o.phone,o.email,o.en_terms,o.pl_terms
    FROM reservation r 
    inner join orlik o on r.orlik_id=o.orlik_id 
    left join game g on g.reservation_id=r.reservation_id
    where r.user_id=? and g.game_id is null;
    `,
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




//tworzenie meczu
app.post("/mecze/:reservation_id/:players/:tournament",(req,res)=>{
    const id = req.params.reservation_id;
    const players = req.params.players;
    const tournament = req.params.tournament;
    db.query(`
        insert into game
        values (default,12-?,current_date(),?,?);       
    `,[players,tournament,id],(err,result)=>{
        if(err){
            res.send("Błąd!")
        }
        res.send(result);
    })
})

//wyswietlanie wszystkich gier
const getGamesData = async () => {
  //uzupełnij SQL bo ja nie umiem
      const myQuery = `SELECT g.game_id,g.reservation_id,g.players,g.tournament,u.user_id,
      u.name,u.surname,o.adress,o.school,o.phone,o.email,o.en_terms,o.pl_terms,r.day,
      r.start_hour,r.end_hour
      FROM user u left join reservation r on u.user_id=r.user_id
      inner join orlik o on o.orlik_id=r.orlik_id 
      inner join game g on r.reservation_id=g.reservation_id
    `;
    
      // getting the result of the query
      let results = await new Promise((resolve, reject) =>
        db.query(myQuery , (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
      );
    
      // return resolved promise
      return results;
    };
  // wyświetlanie graczy przypidanych do gry o danym id
    const getGamesPlayers = async (id) => {
  //uzupełnij SQL bo ja nie umiem
      const myQuery =
        `select p.user_id
        from game g
        inner join players p on p.game_id=g.game_id
        where p.game_id=?`;
    
      // getting the result of the query
      let results = await new Promise((resolve, reject) =>
        db.query(myQuery, id, async (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        })
      );
    console.log('LOG',results)
      // return resolved promise
      return{  playersList:results} ;
    };
    
    //wyswietlenie konkretnego uzytkownika ze wszystkimi jego rezerwacjami
app.get("/mecze", async (req, res) => {
      const result = await getGamesData();


for (let [index, item] of result.entries()) {
  const players= await getGamesPlayers(item.game_id)
  result[index] = {...result[index], ...players}
  console.log('resIN',result)
}
  
  console.log('res',result);
// console.log(result);    

      if(result=== undefined){res.send("Error")}
      else
     { res.send(result);}
    });


//zapisanie sie na gre
app.put("/zapisanienagre/:user_id/:game_id", (req,res)=>{
    const userid = req.params.user_id;
    const gameid = req.params.game_id;

    db.query(`
    update game set players=players+1 
    where game_id=?;
    insert into players
    values (?,?)
    `,
    [gameid,userid,gameid],(err,result)=>{
        if(err){
            console.log(err)
            res.send("Błąd");
            console.log(err);
        }
        res.send(result)
    })
})

//wypisanie sie z gry
app.delete("/wypisaniezgry/:user_id/:game_id", (req,res)=>{
    const userid = req.params.user_id;
    const gameid = req.params.game_id;

    db.query(`
    update game set players=players-1
    where game_id=?;
    delete from players where user_id=? and game_id=?
    `,
    [gameid,userid,gameid],(err,result)=>{
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
    db.query(`SELECT u.user_id,u.email,u.name,u.surname,u.phone
    FROM user u;`, 
    (err,result, fields)=>{
        if(err){
            res.send("Błąd!")
        }
        res.send(result);
    })
});


//wyswietlanie konkretnego uzytkownika wraz z jego rezerwacjami - poprawione
const getUserData = async (id) => {
    const myQuery = `SELECT u.email,u.name,u.surname,u.phone 
                    FROM user u where user_id=?;`;
  
    // getting the result of the query
    let results = await new Promise((resolve, reject) =>
      db.query(myQuery, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    );
  
    // return resolved promise
    return results;
  };
  const getUserReservations = async (id) => {
    const myQuery =
      `SELECT r.reservation_id, r.day,r.start_hour,r.end_hour,o.adress,o.school
      FROM user u left join reservation r on u.user_id=r.user_id
      inner join orlik o on o.orlik_id=r.orlik_id 
      where r.user_id=?;`;
  
    // getting the result of the query
    let results = await new Promise((resolve, reject) =>
      db.query(myQuery, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    );
  
    // return resolved promise
    return { reservation: results };
  };

  const getUserGames = async (id) => {
    const myQuery =
      `SELECT g.game_id,g.reservation_id,g.players,g.date
      FROM user u left join reservation r on u.user_id=r.user_id
      inner join orlik o on o.orlik_id=r.orlik_id 
      inner join game g on r.reservation_id=g.reservation_id
      where r.user_id=?;`;
  
    // getting the result of the query
    let results = await new Promise((resolve, reject) =>
      db.query(myQuery, id, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      })
    );
  
    // return resolved promise
    return { game: results };
  };

 
  
  //wyswietlenie konkretnego uzytkownika ze wszystkimi jego rezerwacjami
  app.get("/uzytkownicy/:user_id", async (req, res) => {
    const id = req.params.user_id;
    const result = await getUserData(id);
    const result2 = await getUserReservations(id);
    const result3 = await getUserGames(id);

    
    if(result[0]=== undefined){res.send("Error")}
    else
   { res.send({ user: result[0], ...result2, ...result3});}
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
            res.send({message:"Użytkownik już istnieje"});
        }

        res.send(result);
    }
   )
}) 
})
//logowanie
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


   

//poprawiona zmiana hasła
app.put('/zmianahasla/:user_id', (req,res)=>{
   
    const id = req.params.user_id;
    const oldpassword = req.body.oldpassword;
    const newpassword = req.body.newpassword;

    console.log(req.body)
     bcrypt.hash(oldpassword, saltRounds, (err, hash) => {
        console.log(hash);
      if (err) {
        console.log(err);
      }
     bcrypt.compare(oldpassword, hash, (error, response) => {
         if(response){
            bcrypt.hash(newpassword,saltRounds,(err,hash)=>{
                db.query(
                    "UPDATE user SET password =? WHERE user_id =?",[hash,id],
                       (err,result)=> {
                        if(err)
                        {res.send(result);
                            
                        }else{
                          res.send({ message: "Hasło zostało zapisane!" });
                          console.log(result);
                        }
                 }
                 )
            })
    }
        else{
            res.send({message:"Wprowadzone hasło jest niepoprawne"})
        }
   ;}
  );
})
});      

//zmiana numeru telefonu
app.put("/zmiananumeru/:user_id",(req,res)=>{
    const id = req.params.user_id;
    const phone = req.body.phone;
    db.query(
        "update user set phone=? where user_id=?",[phone,id],(err,result)=>{
            if(err){
                res.send(result);
            }
            else {
                res.send({message:"Numer telefonu został zmieniony!"})
            }
        }
    )
})
    

//sesja zalogowanego użytkownika
app.get("/zalogowanie",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user:req.session.user})
    }
    else {
        res.send({loggedIn:false})
    }
});

//wylogowanie użytkownika
app.get("/wylogowanie",(req,res)=>{
    res.send({loggedIn: false});
    req.session.destroy();
});

//sprawdzenie czy istnieje mecz o podanym reservation_id
app.get("/czyistnieje/:reservation_id",(req,res)=>{
  const id = req.params.reservation_id;
  db.query(`SELECT *
  FROM game
  where reservation_id=?;`,id, 
  (err,result,row,fields)=>{
      if(err){
          res.send("Błąd!")
      }
      console.log(result[0])
      if(result[0]===undefined){
        res.send(false)
      } else {
        res.send(true)
      }
  })
});

  

app.listen(3001,() => {
    console.log("jestem na porcie 3001");
});



