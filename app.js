const express = require("express")
const session = require("express-session")
const app = express()

//For the session setting
let sessionOptions = session({
  secret: "JavaScript is sooooooo cool",
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})
app.use(sessionOptions)

const router = require("./router")
//This ask express to add user submited data on to our request object
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//calling the public folder
app.use(express.static("public"))
//Setting the views fpr the app..calling the views folder
app.set("views", "views")
//using the ejs engine
app.set("view engine", "ejs")

app.use("/", router)

module.exports = app
