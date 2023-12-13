// *** set up express(server)
const express = require('express')
const app = express();

// *** set up mongo db

// //https://quickmongo.js.org/#/
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://lh2369:980401@cluster0.a0zou9i.mongodb.net/?retryWrites=true&w=majority")
db.on("ready", () => {
    console.log("Connected to the database");
});
db.connect();

// *** set up root route using pubic folder
app.use('/', express.static('public'));

// *** json parser
app.use(express.json());

const DOC_NAME = 'info';

app.get('/info', async (req, res) => {
  const data = await db.get(DOC_NAME);
  res.json(data);
});

app.post('/info', async (req, res) => {
    await db.push(DOC_NAME, req.body);
    res.json({ result: 'success' });
});

app.get('/remove-all-info', async (req, res) => {
  await db.set(DOC_NAME, null);
  res.json({ result: "success" });
});

// *** listen to the server at 3000 
app.listen(3000, () => {
    console.log('listening at localhost:3000')
});





// //To save the health, location, and description inputs as properties of an object in your index.js file
// let obj = {};

// // Function to retrieve and save user input into the object
// function saveUserInput() {
//     obj.catDescription = document.getElementById('cat-description-input').value;
//     obj.catHealth = document.getElementById('cat-health-input').value;
//     obj.catLocation = document.getElementById('cat-location-input').value;

//     // Now the inputs are saved in the object 'obj'
//     console.log("Saved Object:", obj);
// }

// // Attaching the function to the 'Submit Information' button
// var submitButton = document.getElementById('submit-cat-info');
// if (submitButton) {
//     submitButton.addEventListener('click', function () {
//         saveUserInput();
//     });
// } else {
//     console.error("Submit button not found");
// }

// //db-2- add value to the database
// db.push('catData', obj);

// //db - 3 - fetch from the DB





// //let app = express(); 
// let bodyParser = require('body-parser')
// app.use(bodyParser.json());

// let coffeeTracker=[];

// app.get('/',(req,res) => {
//  res.send('this is the main page');
// })

// //2. add a route on server that is listening for a post request
// app.post('/noCups',(req,res) => {
//  console.log(req.body);
//  let currentDate = Date();
//  let obj = {
//       Date:currentDate,
//       coffee:req.body.number

//  }
 
//  coffeeTracker.push(obj);
//  console.log(coffeeTracker);
//  res.json({task:"success"});
// }) 
// app.use('/',express.static('public'));

// app.listen(3000,()=>{
//  console.log('listening at localhost:3000');
// } )

// //add a route to get all coffee track informtion
// app.get('/getCups',(req,res) => {
//     let obj={data: coffeeTracker};
//     res.json(obj);


// })