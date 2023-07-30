const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

mongoose.connect("mongodb+srv://saif07:saifmongodb@cluster0.6yypqo8.mongodb.net/?retryWrites=true&w=majority")
  .then(() => console.log("Db connected"))
  .catch(err => console.log(err.message));

  app.use(express.json());
  app.set('views', path.join(__dirname + '/views'));

  app.set("view engine", "ejs")
  app.use(express.static(path.join(__dirname + '/public')));


  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userEmail: String,
    userPassword: String,
    userName: String,
   
  });

  
  // const todouser = mongoose.model("Users Todo", userSchema);
  const todoregister = mongoose.model("todoregister", userSchema);

  app.use(express.urlencoded({extended:true}));

  app.get('/', (req,res)=> {
    console.log("Hello")
    res.render("login.ejs");
   
})

app.get('/register', (req,res)=> {
  // console.log(req.session);
  res.render("register.ejs");
})
app.post('/register', async (req,res)=> {
  const {firstName, lastName, userName, userEmail, userPassword} = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(userPassword, salt);
  await todoregister.create ({
      firstName, 
      lastName,
      userName,
      userEmail,
      userPassword : hashedPassword,
      // userBirth: req.body.userBirth,
  });
  res.render("login");
  
})

app.get("/login", (req, res) => {
  res.render("login");
});


app.post('/login', async (req,res)=> {
  const {  userEmail, userName, userPassword} = req.body;
  // const message = "Invalid Password";
  
  //1. Check if username exist

  const userFound = await todoregister.findOne({ userEmail });
  
  if (!userFound) { 
    res.render("login")     
    }
  // const userr = userFound.userName;
  // const userId = userFound._id;
  else{
    const userr = userFound.userName;
    const userPassFound = await bcrypt.compare(userPassword, userFound.userPassword);
    if (!userFound || !userPassFound) { 
      res.render("login")     
      }

    else{
  
      res.render("profile.ejs", {userr});
    // , {userr}
}
}
 
})


app.listen(3000, ()=> {
    console.log("Server is running on", port);
})