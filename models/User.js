const bcrypt = require("bcryptjs")
const usersCollection = require("..//db").collection("users")
const validator = require("validator")
let User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = ""
  }
  if (typeof this.data.email != "string") {
    this.data.email = ""
  }
  if (typeof this.data.password != "string") {
    this.data.password = ""
  }

  //get rid of any bogous properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}

User.prototype.validate = function () {
  if (this.data.username == "") {
    this.errors.push("You must provide a username.")
  }
  if (this.data.username !== "" && !validator.isAlphanumeric(this.data.username)) {
    this.errors.push("Username can only contains letters and numbers.")
  }
  if (!validator.isEmail(this.data.email)) {
    this.errors.push("You must provide a valid email address.")
  }
  if (this.data.password == "") {
    this.errors.push("You must provide a password.")
  }
  if (this.data.password.length > 0 && this.data.password.length < 12) {
    this.errors.push("Password must be at least 12 character long.")
  }
  if (this.data.password.length > 50) {
    this.errors.push("Password cannot exceeds 50 characters.")
  }
  if (this.data.username.length > 0 && this.data.username.length < 3) {
    this.errors.push("Username must be at least 3 character long.")
  }
  if (this.data.username.length > 30) {
    this.errors.push("Username cannot exceeds 30 characters.")
  }
}
//Adding the login method that is called in the userController.js file
User.prototype.login = function () {
  return new Promise(async (resolve, reject) => {
    //Making sure the user entered values are clean text bu callint the cleanUp() method
    this.cleanUp()
    //userCollection is an object that represents our database collection and we can perform our CRUD operation here
    const attemptedUser = await usersCollection.findOne({ username: this.data.username })
    if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
      resolve("Congrats!!")
    } else {
      reject("Invalid Username and Password.")
    }
  })
}

//Adding the register method that is called the userController.js file
User.prototype.register = function () {
  //Step #1: Validate user data
  this.cleanUp()
  this.validate() //calling the validate function
  //Step #2: Only if there are no validation errors then save the user data into a database
  if (!this.errors.length) {
    //hash user password
    let salt = bcrypt.genSaltSync(10)
    this.data.password = bcrypt.hashSync(this.data.password, salt)
    usersCollection.insertOne(this.data)
  }
}

module.exports = User
