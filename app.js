
// Part 0 User information App- Webserver//
// - route 1: renders a page that displays all your users//
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const bodyParser = require('body-parser');

// Bodyparser//
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Views//
app.set('view engine', 'ejs');

// functions//
app.get('/', function(req, res){
  fs.readFile('./users.json', function(err, data) {
    if(err) {
      console.log(err);
    }
    let parsedData = JSON.parse(data);
    res.render('index', {parsedData}
      );
  });
});
// Part 1 //
// route 2 create two more routes://
app.get('/search', function(req, res){
  res.render('search')
});
// - route 3: takes in the post request from your form, then displays matching users on a new page.//
/*app.post('/search', function(req, res) {
  fs.readFile('./users.json', function(err, data) {
    if (err) {
      console.log(err)}

    let parsedData = JSON.parse(data);
    res.render('matches', {data: req.body, users:parsedData});
})
});*/
// AJAX UserInformationApp Webserver
// Part 1: Autocomplete
// Modify your form so that every time the user enters a key, it makes an AJAX call that populates the search results.
app.post('/search', (req, res) => {
  let userData = req.body.user;
  console.log(userData)
  fs.readFile('./users.json', (err, data) => {
    if(err) {
      console.log("err");
    }
    let parsedData = JSON.parse(data);
    let result = [];
    for(var i = 0; i < parsedData.length; i++){
      if(parsedData[i].firstname.includes(userData) || parsedData[i].lastname.includes(userData) || parsedData[i].email.includes(userData)){
        result.push(parsedData[i]);
      }
    }
    res.send({usersinfo: result});
  })
});

// Zoeken op de server// x
// Testen van req.body (komt waarschijnlijk een waarde uit)// x 
// for loop voor de if statement// x
// the for loop gaat door de json file// x
// Een if statement maken van de req.body //
// een Array gebruiken //
// array zenden // 

// - route 4: renders a page with three inputs on it//
//(first name, last name, and email) that allows you to add new users to the users.json file.//
app.get('/adduser', function(req, res) {
  res.render('adduser');
});

//- route 5: takes in the post request from the 'create user' form, 
//then adds the user to the users.json file. 
app.post('/adduser', function (req, res) {
  fs.readFile('./users.json', function (err, data) {
    if (err) {throw err}

    const parsedData = JSON.parse(data);
  parsedData.push({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email }); 
    fs.writeFile('users.json', JSON.stringify(parsedData), function(err, data){
      if (err) {throw err}
      console.log('Gathering data was a succes!');
      res.redirect('/');
      });
  });
});

// Header page//
app.get('/header', function(req, res) {
  res.render('header');
});

//Server//
app.listen(port, () => console.log(`Example app listening on port ${port}!`))